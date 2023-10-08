import { CommentService } from './comment-service.interface.js';
import { inject } from 'inversify';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';

export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const result = await this.commentModel.create(dto);
    this.logger.info(`New comment created: ${dto.name}`);
    return result;
  }

  public async findByCommentId(commentId: string): Promise<DocumentType<CommentEntity> | null> {
    return this.commentModel.findById(commentId).exec();
  }

  public async findByCommentName(commentName: string): Promise<DocumentType<CommentEntity> | null> {
    return this.commentModel.findOne({name: commentName}).exec();
  }

  public async findByCommentNameOrCreate(commentName: string, dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const existedComment = await this.findByCommentName(commentName);

    if (existedComment) {
      return existedComment;
    }

    return this.create(dto);
  }
}
