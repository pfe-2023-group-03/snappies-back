import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Public } from 'src/decorators/public.decorator';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/decorators/role.decorator';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
export class ArticlesController {

    constructor(private readonly articlesService: ArticlesService) {}

    // find all articles
    @Roles(Role.Admin)
    @Get()
    findAll() {
        return this.articlesService.findAll();
    }

    // find one article by id
    @Roles(Role.Admin)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.articlesService.findOne(+id);
    }

    // create an article
    @Roles(Role.Admin)
    @Post()
    create(@Body() createArticleDto: CreateArticleDto) {
        if(!createArticleDto) throw new BadRequestException('Article required');
        return this.articlesService.create(createArticleDto);
    }

    // update an article
    @Roles(Role.Admin)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
        if(!updateArticleDto) throw new BadRequestException('Article required');
        return this.articlesService.update(+id, updateArticleDto);
    }

    // delete an article
    @Roles(Role.Admin)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.articlesService.remove(+id);
    }
}
