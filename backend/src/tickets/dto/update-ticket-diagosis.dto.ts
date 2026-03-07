import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTicketDiagnosisDto {

  @IsString()
  @IsNotEmpty()
  diagnosis: string;
}
