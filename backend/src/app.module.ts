import { Module } from '@nestjs/common';
import { TicketsModule } from './tickets/tickets.module';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TicketsModule, UsersModule, MessagesModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
