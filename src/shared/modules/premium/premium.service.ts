import { PremiumService } from './premium-service.interface.js';
import { inject } from 'inversify';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { PremiumEntity } from './premium.entity.js';
import { CreatePremiumDto } from './dto/create-premium.dto.js';

export class DefaultPremiumService implements PremiumService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.PremiumModel) private readonly premiumModel: types.ModelType<PremiumEntity>
  ) {}

  public async create(dto: CreatePremiumDto): Promise<DocumentType<PremiumEntity>> {
    const result = await this.premiumModel.create(dto);
    this.logger.info(`New premium created: ${dto.name}`);
    return result;
  }

  public async findByPremiumId(premiumId: string): Promise<DocumentType<PremiumEntity> | null> {
    return this.premiumModel.findById(premiumId).exec();
  }

  public async findByPremiumName(premiumName: string): Promise<DocumentType<PremiumEntity> | null> {
    return this.premiumModel.findOne({name: premiumName}).exec();
  }

  public async findByPremiumNameOrCreate(premiumName: string, dto: CreatePremiumDto): Promise<DocumentType<PremiumEntity>> {
    const existedPremium = await this.findByPremiumName(premiumName);

    if (existedPremium) {
      return existedPremium;
    }

    return this.create(dto);
  }
}
