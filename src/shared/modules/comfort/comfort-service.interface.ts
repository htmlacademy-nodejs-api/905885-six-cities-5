import { DocumentType } from '@typegoose/typegoose';
import { CreateComfortDto } from './dto/create-comfort.dto.js';
import { ComfortEntity } from './comfort.entity.js';

export interface ComfortService {
  create(dto: CreateComfortDto): Promise<DocumentType<ComfortEntity>>;
  findByComfortId(comfortId: string): Promise<DocumentType<ComfortEntity> | null>;
  findByComfortName(comfortName: string): Promise<DocumentType<ComfortEntity> | null>;
  findByComfortNameOrCreate(comfortName: string, dto: CreateComfortDto): Promise<DocumentType<ComfortEntity>>;
}
