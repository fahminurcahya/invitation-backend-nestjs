import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/createrole.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateRoleDto } from './dto/updaterole.dto';

@Injectable()
export class RolesService {

    constructor(private prisma: PrismaService) { }

    async getRole() {
        const data = await this.prisma.role.findMany()
        return {
            statusCode: 200,
            data: data,
        };
    }

    async createRole(data: CreateRoleDto) {
        const createData = await this.prisma.role.create({
            data: data
        })
        return {
            statusCode: 200,
            data: createData,
        };
    }

    async updateRole(id: number, data: UpdateRoleDto) {
        const updateData = await this.prisma.role.update({
            where: { id: id },
            data: data
        })
        return {
            statusCode: 200,
            data: updateData,
        };
    }
}
