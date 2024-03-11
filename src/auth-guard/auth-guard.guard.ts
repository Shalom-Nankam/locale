import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable, retry } from 'rxjs';
import { Request } from 'express';
import * as crypto from 'node:crypto';
import * as path from 'node:path';
import * as fs from 'node:fs'

@Injectable()
export class AuthGuardGuard implements CanActivate {
  private readonly keyPath = path.join(__dirname, '..', '..', 'locale-private.pem')
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = this.extractKey(request);

    if (!apiKey) {
      throw new UnauthorizedException({
        success: false,
        message: 'Please pass in your API key.',
        data: null
      })
    }
    try {
      const keyIsValid = this.validateKey(apiKey);
      if (keyIsValid) {

        return keyIsValid
      } else {
        throw new ForbiddenException({
          success: false,
          message: 'Invalid API key provided',
          data: null
        })
      }
    } catch (error) {
      throw new UnauthorizedException({
        success: false,
        message: 'Invalid API key.',
        data: null
      })
    }
  }

  private extractKey(request: Request): string | undefined {
    const [type, key] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? key : undefined
  }

  private validateKey(key: string): boolean {
    const [dataHash, dataSignature] = key.split('.')
    const keyFile = fs.readFileSync(this.keyPath, 'utf-8')
    const verifier = crypto.createVerify('RSA-SHA256')
    verifier.update(dataHash)
    const isValid = verifier.verify(keyFile, dataSignature, 'base64')
    return isValid;
  }
}
