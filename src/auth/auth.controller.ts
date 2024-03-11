import { Body, Controller, InternalServerErrorException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async registerUser(@Body() user: AuthDto) {
        try {
            const registeredUser = await this.authService.registerUser(user);
            return {
                success: true,
                message: 'Account registered successfully.',
                data: registeredUser
            }
        } catch (error) {
            console.log({ error })
            throw new InternalServerErrorException({
                success: false,
                message: 'An internal server error occured',
                data: null
            })
        }
    }
}
