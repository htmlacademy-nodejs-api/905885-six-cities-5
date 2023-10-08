import { UserTypeService } from './user-type-service.interface.js';
import { inject } from 'inversify';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { UserTypeEntity } from './user-type.entity.js';
import { CreateUserTypeDto } from './dto/create-user-type.dto.js';

export class DefaultUserTypeService implements UserTypeService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.UserTypeModel) private readonly userTypeModel: types.ModelType<UserTypeEntity>
  ) {}

  public async create(dto: CreateUserTypeDto): Promise<DocumentType<UserTypeEntity>> {
    const result = await this.userTypeModel.create(dto);
    this.logger.info(`New userType created: ${dto.name}`);
    return result;
  }

  public async findByUserTypeId(userTypeId: string): Promise<DocumentType<UserTypeEntity> | null> {
    return this.userTypeModel.findById(userTypeId).exec();
  }

  public async findByUserTypeName(userTypeName: string): Promise<DocumentType<UserTypeEntity> | null> {
    return this.userTypeModel.findOne({name: userTypeName}).exec();
  }

  public async findByUserTypeNameOrCreate(userTypeName: string, dto: CreateUserTypeDto): Promise<DocumentType<UserTypeEntity>> {
    const existedUserType = await this.findByUserTypeName(userTypeName);

    if (existedUserType) {
      return existedUserType;
    }

    return this.create(dto);
  }
}
