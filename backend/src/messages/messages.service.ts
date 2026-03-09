import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Request } from 'express';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class MessagesService {

  constructor(
    private prisma: PrismaService,
  ){}

  async create(createMessageDto: CreateMessageDto, req: Request) {
    /** 
      {
        content: 'Você pode vir a minha mesa?',
        ticketId: 'a1cf9a3b-1c54-4731-a59a-3d00ee87b18f'        
      }
      {
        sub: 'bd928c91-d540-4c44-b5dd-7ccbc07eff20',
        email: 'funcionario.teste2@empresa.com',
        role: 'EMPLOYEE',
        iat: 1772910126,
        exp: 1773514926,
        aud: 'http://localhost:3000',
        iss: 'http://localhost:3000'
      }
     */
    const {...data } = createMessageDto;
    const createdBy = req['sub'];
    return this.prisma.message.create({
      data: {
        ...data,
        authorId: createdBy,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        ticket: {
          select:{
            id: true,
            title: true,
            priority: true,
            status: true,
            assignedTo:{
              select: {
                id: true,
                email: true,
                name: true,
                role: true,
              },
            }
          }
        },
        author: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
      },
    });
  }

  async findAll(id: string) {
    return this.prisma.message.findMany({
      where: { ticketId: id },
      select: {
        id: true,
        content: true,
        createdAt: true,
        ticket: {
          select:{
            id: true,
            title: true,
            priority: true,
            status: true,
            assignedTo:{
              select: {
                id: true,
                email: true,
                name: true,    
                role: true,
              },
            }
          }
        },
        author: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
      },
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
