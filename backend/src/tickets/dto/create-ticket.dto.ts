import { IsEnum, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { TicketPriority } from '@prisma/client';

export class CreateTicketDto {
  @IsString()
  @MaxLength(100)
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsEnum(TicketPriority)
  priority?: TicketPriority;

  @IsString()
  @IsOptional()
  diagnosis?: string;

  @IsUUID()
  createdById: string;

  @IsOptional()
  @IsUUID()
  assignedToId?: string;
}

