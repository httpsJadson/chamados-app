import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketStatusDto } from './dto/update-ticket-status.dto';
import { UpdateTicketPriorityDto } from './dto/update-ticket-priority';
import { UpdateTicketDiagnosisDto } from './dto/update-ticket-diagosis.dto';
import { Request } from 'express';


@Injectable()
export class TicketsService {
  constructor(
    private prisma: PrismaService,
  ){}

  async create(createTicketDto: CreateTicketDto, req: Request) {
    const {...data } = createTicketDto;
    const createdBy = req['sub'];

    return this.prisma.ticket.create({
      data: {
        ...data,
        createdById: createdBy,
      },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        priority: true,
        createdAt: true,
        updatedAt: true,
        createdBy: {
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
  /**
    async update(id: string, updateTicketDto: UpdateTicketDto) {
      const { ...data } = updateTicketDto;
      const updateData: any = { ...data };
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
  */
  async updatePriority(id: string, updateTicketPriorityDto: UpdateTicketPriorityDto) {
    const updateData: any = { priority: updateTicketPriorityDto.priority };
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

  async updateAssigned(id: string, req: Request) {

    const assignedId = req['sub'];

    if (req['role'] !== 'TECHNICIAN') {
      throw new BadRequestException('Assigned user must have TECHNICIAN role');
    }

    const updateData: any = { assignedToId: assignedId };

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

  async updateDiagnosis(id: string, updateTicketDiagnosisDto: UpdateTicketDiagnosisDto) {
    const updateData: any = { diagnosis: updateTicketDiagnosisDto.diagnosis };
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
