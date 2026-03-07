import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketStatusDto } from './dto/update-ticket-status.dto';
import { UpdateTicketPriorityDto } from './dto/update-ticket-priority';
import { UpdateTicketAssignedDto } from './dto/update-ticket-assingned';
import { ApiBearerAuth } from '@nestjs/swagger/dist/decorators/api-bearer.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/users/users.enum';
import { AuthTokenGuard } from 'src/common/guards/authToken.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import type Request  from 'express';
import { REQUEST_TOKEN_PAYLOAD_KEY } from 'src/auth/auth.constants';

@UseGuards(AuthTokenGuard, RolesGuard)
@ApiBearerAuth()
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  create(@Body() createTicketDto: CreateTicketDto, @Req() req: Request) {

    return this.ticketsService.create(createTicketDto, req[REQUEST_TOKEN_PAYLOAD_KEY]);
  }

  @Roles(Role.TECH)
  @Get()
  findAll() {
    return this.ticketsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(id);
  }

  
  @Roles(Role.TECH)
  @Patch(':id/priority')
  updatePriority(@Param('id') id: string, @Body() updateTicketPriorityDto: UpdateTicketPriorityDto) {
    return this.ticketsService.updatePriority(id, updateTicketPriorityDto);
  }

  
  @Roles(Role.TECH)
  @Patch(':id/assigned')
  updateAssigned(@Param('id') id: string, @Req() req: Request) {
    return this.ticketsService.updateAssigned(id, req[REQUEST_TOKEN_PAYLOAD_KEY]);
  }

  
  @Roles(Role.TECH)
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() updateTicketStatusDto: UpdateTicketStatusDto) {
    return this.ticketsService.updateStatus(id, updateTicketStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(id);
  }
}
