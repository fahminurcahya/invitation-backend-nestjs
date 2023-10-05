import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('register')
    @UseGuards(AuthGuard)
    async register(@Body() data: RegisterDto, @Request() req) {
        return await this.authService.register(data)
    }

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    async signin(@Body() data: LoginDto) {
        const user = await this.authService.signin(data);
        const token = this.authService.generateToken(user);
        return {
            statusCode: HttpStatus.OK,
            message: 'Login berhasil',
            token: token,
            ...user
        }
    }
}
