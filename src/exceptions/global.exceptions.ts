import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdptHost: HttpAdapterHost) { }

    catch(exception: any, host: ArgumentsHost) {
        const { httpAdapter } = this.httpAdptHost;

        const ctx = host.switchToHttp()

        const httpStat = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

        const response = {
            success: false,
            message: exception.getResponse().message,
            data: null
        }

        httpAdapter.reply(ctx.getResponse(), response, httpStat)
    }
}