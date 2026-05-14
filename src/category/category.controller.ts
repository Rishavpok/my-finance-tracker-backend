import { Body, Controller, Delete, Param, Post, Res } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {

    constructor(private service : CategoryService) {

    }

    @Post() 
    async create(@Body() category : CreateCategoryDto, @Res() req : any ) {
        return this.service.createCategory(req.user.userId, category)
    }

    @Delete(':id')
    async delete(@Param('id') id : string ) {
        return this.service.delete(id)
    }

}
