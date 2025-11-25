import { Controller, Get, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from './users.service';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('allUsers')
  findAll() {
    return this.userService.findAll();
  }

  @Get('getUserById/:id')
  findUserById(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Get('getUserByUuid/:uuid')
  findUserByUuid(@Param('uuid') uuid: string) {
    return this.userService.findOneByUuid(uuid);
  }

  @Get('getByEmail/:email')
  findUserByEmain(@Param('email') email: string) {
    return this.userService.findOneByEmail(email);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  // Admin
  @Get('getUserId/:email')
  findUserId(@Param('email') email: string) {
    return this.userService.findUserId(email);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
