import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Request } from 'express';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class MessagesService {

  constructor(
    private prisma: PrismaService,
  ){}

  async create(createMessageDto: CreateMessageDto, req: Request) {
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

  async findAll(id: string, req: Request) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id },
      select: {
        createdBy: {
          select: {
            id: true,
          }
        },
        assignedTo: {
          select: {
            id: true,
          }
        },
      }
    });
    
    if(!ticket){
      throw new BadRequestException('Ticket not found')
    };

    if(
      req['role'] === 'ADMIN' || 
      ticket.createdBy && ticket.createdBy.id === req['sub'] || 
      ticket.assignedTo && ticket.assignedTo.id === req['sub']
    ){
      return this.prisma.message.findMany({
        where: { ticketId: id },
        select: {
          id: true,
          content: true,
          createdAt: true,
          ticket: {
            select:{
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
    } else {
      throw new BadRequestException('You are not allowed to view this chat')
    }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} message`;
  // }

  // update(id: number, updateMessageDto: UpdateMessageDto) {
  //   return `This action updates a #${id} message`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} message`;
  // }
}
