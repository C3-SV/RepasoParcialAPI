import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor (private authService: AuthService) { }

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        
        const user = await this.authService.validateUser(body.email, body.password);
        
        if (!user) throw new UnauthorizedException();
        
        return this.authService.login(user);
    
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth() { }

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req: Request & { user?: any }) {
        if (!req.user) throw new UnauthorizedException();

        return this.authService.googleLogin(req.user);
    }

}
