import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(private usersService : UsersService, private jwtService : JwtService) {}

    async signIn(email: string, password: string) {
        const user = await this.usersService.findOneByEmail(email);

        if (!user) {
            throw new UnauthorizedException();
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new UnauthorizedException();
        }

        const payload = { email: user.email, sub: user.id };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
