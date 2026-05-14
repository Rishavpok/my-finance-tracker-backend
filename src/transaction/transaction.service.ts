import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionService {

    constructor(private prisma: PrismaService) {
    }

    async getAllTransaction(userId: string) {

        try {

            const transactions = await this.prisma.transaction.findMany({
                where: { userId }
            })

            return {
                data: transactions
            }

        } catch (e) {
            throw new HttpException(
                'Failed to load transactions',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

    }


    async createTransaction(userId: number, transaction: CreateTransactionDTO) {
        try {
            const transac = await this.prisma.transaction.create({
                data: {
                    ...transaction,
                    user: {
                        connect: { id: String(userId) },
                    },
                },
            });

            return {
                message: "Transaction added successfully",
                transac
            };
        } catch (e) {
            console.log(e);
            throw new HttpException(
                'Failed to add transaction',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async updateTransaction(transactionId: string, transaction: UpdateTransactionDto) {

        const exist = await this.prisma.transaction.findUnique({
            where: { id: transactionId }
        })

        if (!exist) {
            throw new HttpException(
                'Transaction not found',
                HttpStatus.BAD_REQUEST
            )
        }

        try {
            const updatedTransaction = await this.prisma.transaction.update({
                where: { id: transactionId },
                data: transaction
            })

            return {
                message: "Transaction updated successfully",
                updatedTransaction
            }

        } catch (e) {
            throw new HttpException(
                'Failed to update transaction',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

    }

    async deleteTransaction(transactionId: string) {
        const exist = await this.prisma.transaction.findUnique({
            where: { id: transactionId }
        })

        if (!exist) {
            throw new HttpException(
                'Transaction not found',
                HttpStatus.BAD_REQUEST
            )
        }

        try {

            await this.prisma.transaction.delete({
                where: { id: transactionId }
            })

            return {
                message: "Transaction deleted successfully"
            }

        } catch (e) {
            throw new HttpException(
                'Something went wrong',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }




}
