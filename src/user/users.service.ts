import {
  Injectable,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../shared/entity/user.entity';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';
import { UuidService } from 'src/common/services/uuid.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly uuidService: UuidService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
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

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users.map((user) => {
      return user;
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

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

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Пользователь не нейден');
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 12);
    }

    await this.userRepository.update(id, updateUserDto);

    return user;
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findOneByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    return null;
  }
}
