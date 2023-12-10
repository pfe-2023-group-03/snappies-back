import { BadRequestException, Body, ConflictException, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/decorators/role.decorator';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('articles')
export class ArticlesController {

    constructor(private readonly articlesService: ArticlesService) {}

    /**
     * Get all articles
     * 
     * @returns all articles and [] if no article
     * - 200: OK
     * - 401: Unauthorized
     * - 403: Forbidden 
     */
    @Roles(Role.Admin)
    @Get()
    async findAll() {
        return await this.articlesService.findAll();
    }

    /**
     * Get one article by id
     * 
     * @param id the article id 
     * @returns the article
     * - 401: Unauthorized
     * - 403: Forbidden
     * - 404: Not Found
     * - 200: OK
     */
    @Roles(Role.Admin)
    @Get(':id')
    async findOne(@Param('id') id: string) {
        const article = await this.articlesService.findOne(+id);

        if(!article) throw new NotFoundException();

        return article;
    }

    /**
     * Create a new article
     * 
     * @param createArticleDto the article to create 
     * @returns the created article
     * - 400: Bad Request
     * - 401: Unauthorized
     * - 403: Forbidden
     * - 201: Created
     */
    @Roles(Role.Admin)
    @Post()
    async create(@Body() createArticleDto: CreateArticleDto) {
        if(!createArticleDto) throw new BadRequestException();

        const article = await this.articlesService.findOneByLabel(createArticleDto.label);
        if(article) throw new ConflictException();

        return await this.articlesService.create(createArticleDto);
    }

    /**
     * Update an article
     * 
     * @param id the article id
     * @param updateArticleDto the article to update
     * @returns the updated article
     * - 400: Bad Request
     * - 401: Unauthorized
     * - 403: Forbidden
     * - 404: Not Found
     * - 409: Conflict
     * - 200: OK
     */
    @Roles(Role.Admin)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
        if(!updateArticleDto) throw new BadRequestException('Article required');

        const article = await this.articlesService.findOne(+id);
        if(!article) throw new NotFoundException();

        const articleWithLabel = await this.articlesService.findOneByLabel(updateArticleDto.label);
        if(articleWithLabel && articleWithLabel.id != article.id) throw new ConflictException();

        return await this.articlesService.update(+id, updateArticleDto);
    }

    /**
     * Delete an article
     * 
     * @param id the article id
     * @returns the deleted article
     * - 401: Unauthorized
     * - 403: Forbidden
     * - 404: Not Found
     * - 200: OK
     */
    @Roles(Role.Admin)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        const article = await this.articlesService.findOne(+id);
        if(!article) throw new NotFoundException();

        return this.articlesService.remove(+id);
    }
}
