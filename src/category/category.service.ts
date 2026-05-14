import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {

    constructor(private prisma: PrismaService) {

    }


    async createCategory(userId: string, category: CreateCategoryDto) {

        try {

            const categor = await this.prisma.category.create({
                data: {
                    userId,
                    name: category.name,
                    icon: category.icon ?? '',
                    budget: category.budget
                }
            })

            return {
                message: "category created successfully",
                categor
            }

        } catch (e) {
            throw new HttpException(
                'Failed to add category',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

    }

    async delete(cateId: string) {
        const exist = await this.prisma.category.findFirst({
            where: { id: cateId }
        })

        if (!exist) {
            throw new HttpException(
                'Category not found',
                HttpStatus.BAD_REQUEST
            )
        }

        try {

            await this.prisma.category.delete({
                where: { id: cateId }
            })

            return {
                message: "Deleted"
            }

        } catch (e) {
            throw new HttpException(
                'Something went wrong',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

}
