import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import bcrypt from 'bcryptjs'; 
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { HashingServiceProtocol } from 'src/auth/hashing/hashing.service';
import { Request } from 'express';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashingService: HashingServiceProtocol
   ){}

  async create(createUserDto: CreateUserDto) {

    try {
      const password = createUserDto.password;
      const hashPassword = await this.hashingService.hash(password);
      const userCreated = await this.prisma.user.create({
        data: {
          email: createUserDto.email,
          name: createUserDto.name,
          password: hashPassword,
          role: createUserDto.role,
        },
        select: {
          id: true,
          name: true,
          email: true,
          perfilUrl: true,
          role: true,
          // Exclude password from response
        },
      });
      return userCreated;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Email already exists');
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.prisma.user.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        perfilUrl: true,  
        // Exclude password
      },
    });
  }

  async findOne(id: string) {

    console.log(id)
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        perfilUrl: true,
        // Exclude password
      },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const data: any = {};

      if (updateUserDto.name !== undefined) {
        data.name = updateUserDto.name;
      }

      if (updateUserDto.email !== undefined) {
        const existingUser = await this.prisma.user.findUnique({
          where: { email: updateUserDto.email },
        });
        if (existingUser && existingUser.id !== id) {
          throw new BadRequestException('Email already exists');
        }
        data.email = updateUserDto.email;
      }

      if (updateUserDto.password !== undefined) {
        data.password = await bcrypt.hash(updateUserDto.password, 10);
      }

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          perfilUrl: true
          // Exclude password from response
        },
      });
      return updatedUser;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.user.delete({
        where: { id },
      });
      return { message: `User with ID ${id} deleted successfully` };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      if (error.code === 'P2002') {
        throw new BadRequestException('Email already exists');
      }
      throw new InternalServerErrorException('Failed to delete user');
    }
  }
}
