import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
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
    // @Roles(Role.Admin)
    @Public()
    @Get()
    findAll() {
        return this.articlesService.findAll();
    }

    // find one article by id
    // @Roles(Role.Admin)
    @Public()
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.articlesService.findOne(+id);
    }

    // find one article by label
    // @Roles(Role.Admin)
    @Public()
    @Get(':label')
    findOneByLabel(@Param('label') label: string) {
        return this.articlesService.findOneByLabel(label);
    }

    // create an article
    // @Roles(Role.Admin)
    @Public()
    @Post()
    create(@Body() createArticleDto: CreateArticleDto) {
        return this.articlesService.create(createArticleDto);
    }

    // update an article
    // @Roles(Role.Admin)
    @Public()
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
        return this.articlesService.update(+id, updateArticleDto);
    }

    // delete an article
    // @Roles(Role.Admin)
    @Public()
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.articlesService.remove(+id);
    }
}
