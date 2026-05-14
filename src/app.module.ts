import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { TransactionModule } from './transaction/transaction.module';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, TransactionModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService , JwtStrategy],
})
export class AppModule {}
