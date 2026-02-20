import { IsOptional, IsUUID } from 'class-validator';

export class UpdateTicketAssignedDto {
  @IsUUID()
  assignedToId?: string;
}
