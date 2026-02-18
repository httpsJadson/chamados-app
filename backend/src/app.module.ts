import { Module } from '@nestjs/common';
import { TicketsModule } from './tickets/tickets.module';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [TicketsModule, UsersModule, MessagesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
