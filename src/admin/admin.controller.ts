import { Controller, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { AdminGuard } from './guards/admin.guard';

@ApiTags('admin')
@Controller('admin')
@UseGuards(AdminGuard)
export class UserController {
  constructor(private readonly adminService: AdminService) {}

  // Admin
  @Get('addAminRole/:email')
  addAminRole(@Param('id') id: string) {
    return this.adminService.addAminRole(id);
  }

  @Get('getUserIdByEmail/:email')
  getUserID(@Param('email') email: string) {
    return this.adminService.getUserIdByEmail(email);
  }

  @Get('getUserById/:id')
  findUserById(@Param('id') id: string) {
    return this.adminService.findOneById(id);
  }

  @Get('getUserByUuid/:uuid')
  findUserByUuid(@Param('uuid') uuid: string) {
    return this.adminService.findOneByUuid(uuid);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }
}
