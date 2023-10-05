import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { compare, hash } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) {
    }

    async register(data: RegisterDto) {
        const checkUser = await this.prisma.users.findFirst({
            where: {
                email: data.email
            }
        })
        if (checkUser) {
            throw new HttpException('User telah terdaftar', HttpStatus.FOUND);
        }
        data.password = await hash(data.password, 10);
        const createUser = await this.prisma.users.create({
            data: data,
        })

        if (createUser) {
            delete createUser.password
            return {
                statusCode: HttpStatus.CREATED,
                message: "Successfully Registered",
                data: createUser
            }
        }
    }

    async signin(data: LoginDto) {
        const checkUser = await this.prisma.users.findFirst({
            where: {
                email: data.email
            }
        })
        if (!checkUser) {
            throw new UnauthorizedException();
        }
        const isMatch = await compare(data.password, checkUser.password);

        if (isMatch) {
            delete checkUser.password
            return {
                data: checkUser
            };
        } else {
            throw new UnauthorizedException(
            );
        }
    }

    generateToken(payload: any): string {
        return this.jwtService.sign(payload);
    }

    verifyToken(token: string): any {
        return this.jwtService.verify(token);
    }

}

