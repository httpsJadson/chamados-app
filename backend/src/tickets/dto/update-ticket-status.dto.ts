import { IsEnum, IsOptional } from 'class-validator';
import { TicketStatus } from '@prisma/client';

export class UpdateTicketStatusDto {

  @IsEnum(TicketStatus)
  status?: TicketStatus;
}
