import { Body, Controller, Delete, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('category')
export class CategoryController {

    constructor(private service: CategoryService) {

    }

    @Get()
    async getAll(@Req() req: any) {
        console.log(req.user.userId)
        return this.service.getCategories(req.user.userId)
    }

    @Post()
    async create(@Body() category: CreateCategoryDto, @Req() req: any) {
        return this.service.createCategory(req.user.userId, category)
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.service.delete(id)
    }

}
