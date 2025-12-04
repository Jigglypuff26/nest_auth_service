import {
  Injectable,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { UuidService } from 'src/common/services/uuid.service';
import { User } from 'src/shared/entity/user.entity';
import { UserRole } from 'src/shared/constants/users.roles';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly uuidService: UuidService,
  ) {}

  async isAdminUser(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    return user?.role === UserRole.ADMIN;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Пользователь с таким адресом электронной почты уже существует');
    }

    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
      const uuId = this.uuidService.generateUuid();

      const user = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
        userUuid: uuId,
      });

      const savedUser = await this.userRepository.save(user);
      return savedUser;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Не удалось создать пользователя');
    }
  }

  async addAminRole(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('Пользователь не нейден');
    }

    user.role = UserRole.ADMIN;

    await this.userRepository.update(user.id, user);

    return user;
  }

  async getUserIdByEmail(email: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('Пользователь не нейден');
    }

    return user.id;
  }

  async findOneByUuid(userUuid: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { userUuid } });
    if (!user) {
      throw new NotFoundException('Пользователь не нейден');
    }

    return user;
  }

  async findOneById(id: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Пользователь не нейден');
    }

    return user;
  }

  async remove(id: string): Promise<void | object> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Пользователь не нейден');
    }

    return {
      statusCode: 200,
      message: 'Пользователь удалён',
    };
  }
}
