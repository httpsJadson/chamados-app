import { Role } from "@prisma/client/wasm";
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from "class-validator";
export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @IsOptional()
  perfilUrl?: string;
}
