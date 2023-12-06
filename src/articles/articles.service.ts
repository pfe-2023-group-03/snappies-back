import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {

    constructor(
        @InjectRepository(Article)
        private articleRepository : Repository<Article>
    ) {}

    // findAll
    findAll() {
        return this.articleRepository.find();
    }

    // findOne by id
    findOne(id: number) {
        return this.articleRepository.findOne({
            where: { id },
        });
    }

    // findOne by label
    findOneByLabel(label: string) {
        return this.articleRepository.findOne({
            where: { label },
        });
    }

    // create one
    create(createArticleDto: CreateArticleDto) {
        return this.articleRepository.save(createArticleDto);
        
    }

    // update one by id
    update(id: number, updateArticleDto: UpdateArticleDto) {
        return this.articleRepository.update(id, updateArticleDto);
    }

    // delete one by id
    remove(id: number) {
        return this.articleRepository.delete(id);
    }
}
