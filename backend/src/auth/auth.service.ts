import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/database/prisma.service';
import { HashingServiceProtocol } from './hashing/hashing.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashingService: HashingServiceProtocol,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: loginDto.email,
      },
    });

    if (user) {
      const passwordIsValid = await this.hashingService.compare(
        loginDto.password,
        user.password,
      );
      passwordIsValid ? true : this.unauthorized();

    } else {
      this.unauthorized();
    }

    return {
      message: "Login successful",
    };
  }

  unauthorized() {
    throw new UnauthorizedException("Invalid email or password");
  }
}
