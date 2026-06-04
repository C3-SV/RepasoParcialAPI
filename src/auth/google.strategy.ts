import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private authService: AuthService) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID ?? 'missing-google-client-id',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? 'missing-google-client-secret',
            callbackURL:
                process.env.GOOGLE_CALLBACK_URL ??
                'http://localhost:3000/auth/google/redirect',
            scope: ['email', 'profile'],
        });
    }

    async validate(
        _accessToken: string,
        _refreshToken: string,
        profile: any,
    ) {
        const email = profile.emails?.[0]?.value;

        if (!email) {
            throw new UnauthorizedException('Google no devolvio un email valido');
        }

        return this.authService.validateGoogleUser({
            googleId: profile.id,
            email,
            name: profile.displayName || email.split('@')[0],
        });
    }
}
