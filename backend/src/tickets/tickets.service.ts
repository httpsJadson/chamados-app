import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { UpdateTicketStatusDto } from './dto/update-ticket-status.dto';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  async create(createTicketDto: CreateTicketDto) {
    const { createdById, ...data } = createTicketDto;
    return this.prisma.ticket.create({
      data: {
        ...data,
        createdById,
      },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        priority: true,
      
        closedAt: true,
        createdAt: true,
        updatedAt: true,
        diagnosis: true,
        createdBy: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
        assignedTo: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
        messages: {
          include: {
            author: {
              select: {
                id: true,
                email: true,
                name: true,
                role: true,
                
              },
            },
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.ticket.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        priority: true,
        closedAt: true,
        createdAt: true,
        updatedAt: true,
        diagnosis: true,
        createdBy: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            
          },
        },
        assignedTo: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
           
          },
        },
        messages: {
          include: {
            author: {
              select: {
                id: true,
                email: true,
                name: true,
                role: true,
               
              },
            },
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.ticket.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        priority: true,
        closedAt: true,
        createdAt: true,
        updatedAt: true,
        diagnosis: true,
        createdBy: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
        assignedTo: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
        messages: {
          include: {
            author: {
              select: {
                id: true,
                email: true,
                name: true,
                role: true,
              },
            },
          },
        },
      },
    });
  }

  async update(id: string, updateTicketDto: UpdateTicketDto) {
    const { status, ...data } = updateTicketDto;
    const updateData: any = { ...data };
    if (status) {
      updateData.status = status;
      if (status === 'CLOSED') {
        updateData.closedAt = new Date();
      }
    }
    return this.prisma.ticket.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        priority: true,
        closedAt: true,
        createdAt: true,
        updatedAt: true,
        diagnosis: true,
        createdBy: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,

          },
        },
        assignedTo: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,

          },
        },
        messages: {
          include: {
            author: {
              select: {
                id: true,
                email: true,
                name: true,
                role: true,

              },
            },
          },
        },
      },
    });
  }

  async updateStatus(id: string, updateTicketStatusDto: UpdateTicketStatusDto) {
    const updateData: any = { status: updateTicketStatusDto.status };
    if (updateTicketStatusDto.status === 'CLOSED') {
      updateData.closedAt = new Date();
    }
    return this.prisma.ticket.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        priority: true,
        closedAt: true,
        createdAt: true,
        updatedAt: true,
        diagnosis: true,
        createdBy: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
        assignedTo: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
        messages: {
          include: {
            author: {
              select: {
                id: true,
                email: true,
                name: true,
                role: true,
  
              },
            },
          },
        },
      },
    });
  }

  async remove(id: string) {
    return this.prisma.ticket.delete({
      where: { id },
    });
  }
}
