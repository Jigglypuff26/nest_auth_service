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

  @Get('getByEmail/:email')
  findUserByEmain(@Param('email') email: string) {
    return this.userService.findOneByEmail(email);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
}
