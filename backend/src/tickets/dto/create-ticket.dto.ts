import {IsString, MaxLength } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @MaxLength(100)
  title: string;

  @IsString()
  description: string;

}

