import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService, private jwt: JwtService) {

    }
    async register(createUser: RegisterDto) {
        const existingUser = await this.prisma.user.findFirst({
            where: { email: createUser.email }
        })
        if (existingUser) {
            throw new HttpException(
                "Email already registered",
                HttpStatus.BAD_GATEWAY
            )
        }
        try {

            const hashedPassword = await bcrypt.hash(createUser.password, 10)

            const data = {
                ...createUser, password: hashedPassword
            }
            return await this.prisma.user.create({ data })


        } catch (e) {
            console.log(e)
            throw new HttpException(
                'Failed to register new user',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async login(login: LoginDto) {
        const { email, password } = login;
        const user = await this.prisma.user.findFirst({
            where: { email: login.email }
        })

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException("Invalid email or password")
        }

        const token = await this.jwt.signAsync({
            sub: user.id,
            email: user.email,
        });

        return {
            message: 'Login successful',
            access_token: token,
            user: {
                id: user.id,
                email: user.email,
                name: user.first_name + ' ' + user.last_name,
            },
        };
    }

}
