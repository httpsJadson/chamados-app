import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min, Max, IsString } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(50)
  @Type(() => Number)
  limit: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  offset: number;

  @IsString()
  @IsOptional()
  order: String;
}
