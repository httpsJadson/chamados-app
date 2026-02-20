import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketStatusDto } from './dto/update-ticket-status.dto';
import { UpdateTicketPriorityDto } from './dto/update-ticket-priority';
import { UpdateTicketAssignedDto } from './dto/update-ticket-assingned';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  @Get()
  findAll() {
    return this.ticketsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(id);
  }

  @Patch(':id/priority')
  updatePriority(@Param('id') id: string, @Body() updateTicketPriorityDto: UpdateTicketPriorityDto) {
    return this.ticketsService.updatePriority(id, updateTicketPriorityDto);
  }

  @Patch(':id/assigned')
  updateAssigned(@Param('id') id: string, @Body() updateTicketAssignedDto: UpdateTicketAssignedDto) {
    return this.ticketsService.updateAssigned(id, updateTicketAssignedDto);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() updateTicketStatusDto: UpdateTicketStatusDto) {
    return this.ticketsService.updateStatus(id, updateTicketStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(id);
  }
}
