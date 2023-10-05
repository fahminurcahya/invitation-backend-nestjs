import { BadRequestException, Body, Controller, Get, Param, Post, Put, Request, UseGuards, UsePipes } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/createrole.dto';
import { NumberValidationPipe } from 'src/utils/number-validation/number-validation.pipe';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('role')
export class RolesController {

    constructor(private rolesService: RolesService) { }

    @Get()
    @UseGuards(AuthGuard)
    async getRole(@Request() req) {
        return await this.rolesService.getRole()
    }

    @Post()
    @UseGuards(AuthGuard)
    async createRole(@Body() body: CreateRoleDto) {
        return await this.rolesService.createRole(body)
    }

    @Put(':role_id')
    @UseGuards(AuthGuard)
    async updateRole(@Param('role_id', NumberValidationPipe) role_id: number, @Body() body: CreateRoleDto) {
        return await this.rolesService.updateRole(role_id, body)
    }

}
