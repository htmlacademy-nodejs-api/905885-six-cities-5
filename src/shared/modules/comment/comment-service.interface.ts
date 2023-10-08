import { DocumentType } from '@typegoose/typegoose';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { CommentEntity } from './comment.entity.js';

export interface CommentService {
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  findByCommentId(commentId: string): Promise<DocumentType<CommentEntity> | null>;
  findByCommentName(commentName: string): Promise<DocumentType<CommentEntity> | null>;
  findByCommentNameOrCreate(commentName: string, dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
}
