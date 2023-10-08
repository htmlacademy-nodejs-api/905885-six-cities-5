import { DocumentType } from '@typegoose/typegoose';
import { CreateUserTypeDto } from './dto/create-user-type.dto.js';
import { UserTypeEntity } from './user-type.entity.js';

export interface UserTypeService {
  create(dto: CreateUserTypeDto): Promise<DocumentType<UserTypeEntity>>;
  findByUserTypeId(userTypeId: string): Promise<DocumentType<UserTypeEntity> | null>;
  findByUserTypeName(userTypeName: string): Promise<DocumentType<UserTypeEntity> | null>;
  findByUserTypeNameOrCreate(userTypeName: string, dto: CreateUserTypeDto): Promise<DocumentType<UserTypeEntity>>;
}
