import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as crypto from 'node:crypto';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import { UserDto } from 'src/user/dto/create-user.dto';
import * as fs from 'node:fs'
import * as path from 'node:path';
@Injectable()
export class AuthService {
    private readonly keyPath = path.join(__dirname, '..', '..', 'locale-private.pem')
    constructor(private userService: UserService) { }

    async registerUser(user: AuthDto): Promise<any> {
        const alreadyRegisteredUser = await this.userService.findUser(user.email);
        if (alreadyRegisteredUser) {
            const { password, apiKey, ...others } = alreadyRegisteredUser
            throw new UnauthorizedException({
                success: false,
                message: 'User already exists',
                data: others
            })
        }
        const generatedKey = await this.generateApikey(`${user.fullname} ${user.email}`);
        const newUserDto = UserDto.fromInput({
            fullname: user.fullname,
            email: user.email,
            password: user.password,
            apiKey: generatedKey[1]
        });
        const newUser = await this.userService.createUser(newUserDto);
        const { fullname, email } = newUser;
        return { apiKey: generatedKey[0], fullname, email };
    }

    private async generateApikey(data: string): Promise<string[]> {
        try {
            const keyFile = fs.readFileSync(this.keyPath, 'utf-8')
            const dataHash = await bcrypt.hash(data, 8);
            const signer = crypto.createSign('RSA-SHA256')
            signer.update(dataHash);
            const dataSignature = signer.sign(keyFile, 'base64')
            const userKey = `${dataHash}.${dataSignature}`
            const finalHash = await bcrypt.hash(userKey, 8);
            return [userKey, finalHash]
        } catch (error) {
            console.log({ error })
        }

    }
}
