import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('transaction')
export class TransactionController {
    constructor(private service : TransactionService) {

    }

    @Post('create')
    async create(@Body() transaction : CreateTransactionDTO, @Req() req: any ) {
         return this.service.createTransaction(req.user.userId,transaction)
    }
}
