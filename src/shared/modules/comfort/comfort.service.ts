import { ComfortService } from './comfort-service.interface.js';
import { inject } from 'inversify';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { ComfortEntity } from './comfort.entity.js';
import { CreateComfortDto } from './dto/create-comfort.dto.js';

export class DefaultComfortService implements ComfortService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.ComfortModel) private readonly comfortModel: types.ModelType<ComfortEntity>
  ) {}

  public async create(dto: CreateComfortDto): Promise<DocumentType<ComfortEntity>> {
    const result = await this.comfortModel.create(dto);
    this.logger.info(`New comfort created: ${dto.name}`);
    return result;
  }

  public async findByComfortId(comfortId: string): Promise<DocumentType<ComfortEntity> | null> {
    return this.comfortModel.findById(comfortId).exec();
  }

  public async findByComfortName(comfortName: string): Promise<DocumentType<ComfortEntity> | null> {
    return this.comfortModel.findOne({name: comfortName}).exec();
  }

  public async findByComfortNameOrCreate(comfortName: string, dto: CreateComfortDto): Promise<DocumentType<ComfortEntity>> {
    const existedComfort = await this.findByComfortName(comfortName);

    if (existedComfort) {
      return existedComfort;
    }

    return this.create(dto);
  }
}
