import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { UserRole } from 'src/shared/constants/users.roles';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @IsUUID()
  @Column()
  userUuid: string;

  @Column({ unique: true })
  @Index()
  email: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
