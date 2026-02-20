import { IsEnum, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { TicketPriority } from '@prisma/client';

export class CreateTicketDto {
  @IsString()
  @MaxLength(100)
  title: string;

  @IsString()
  description: string;

  @IsUUID()
  createdById: string;
}

