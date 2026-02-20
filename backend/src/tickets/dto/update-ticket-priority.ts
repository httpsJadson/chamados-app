import { TicketPriority} from '@prisma/client';
import { IsEnum, IsOptional} from 'class-validator';

export class UpdateTicketPriorityDto {
  @IsEnum(TicketPriority)
  priority?: TicketPriority;
}