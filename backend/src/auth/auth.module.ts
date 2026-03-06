import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HashingServiceProtocol } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { PrismaService } from 'src/database/prisma.service';

@Global()
@Module({
  
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: HashingServiceProtocol,
      useClass: BcryptService,
    }
  ],
  exports: [HashingServiceProtocol]
})
export class AuthModule {}
