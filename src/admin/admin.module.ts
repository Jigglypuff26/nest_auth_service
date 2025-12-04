import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './admin.controller';
import { AuthModule } from '../auth/auth.module';
import { AdminService } from './admin.service';
import { UuidService } from 'src/common/services/uuid.service';
import { User } from 'src/shared/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [AdminService, UuidService],
  exports: [AdminService],
})
export class AdminModule {}
