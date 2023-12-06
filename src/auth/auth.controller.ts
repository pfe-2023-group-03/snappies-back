import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { AuthService } from './auth.service';
import { Public } from '../decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    async signIn(@Body() authSignInDto: AuthSignInDto) {
        return this.authService.signIn(authSignInDto.email, authSignInDto.password);
    }
}
