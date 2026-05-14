import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@UseGuards(JwtAuthGuard)
@Controller('transaction')
export class TransactionController {
    constructor(private service : TransactionService) {

    }

    @Get('all') 
    async getTransactions(@Req() req: any  ) {
       return this.service.getAllTransaction(req.user.userId)
    }

    @Post('create')
    async create(@Body() transaction : CreateTransactionDTO, @Req() req: any ) {
         return this.service.createTransaction(req.user.userId,transaction)
    }

    @Patch('update/:id')
    async update(@Body() transaction : UpdateTransactionDto , @Param("id") id : string  ) {
        return this.service.updateTransaction(id , transaction)
    }

    @Delete(':id')
    async delete(@Param('id')  id : string  ) {
       return this.service.deleteTransaction(id)
    }
}
