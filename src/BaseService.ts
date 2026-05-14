import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BaseDTO } from './BaseDTO';

export class BaseService {
    modal! : string
    constructor(public prisma: PrismaService, modal : string) {
        this.modal = modal
    }

    async getAll(model:string ,userId: string) {
        try {

            const data = await this.prisma[this.modal].findMany({
                where: { userId }
            })

            return {
                data: data
            }

        } catch (e) {
            throw e
            throw new HttpException(
                'Failed to load transactions',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

    }


    async create(model:string, userId: number, dto: BaseDTO) {
        try {
            const transac = await this.prisma[model].create({
                data: {
                    ...dto,
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

}
