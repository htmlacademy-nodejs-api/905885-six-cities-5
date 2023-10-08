import { DocumentType } from '@typegoose/typegoose';
import { CreatePremiumDto } from './dto/create-premium.dto.js';
import { PremiumEntity } from './premium.entity.js';

export interface PremiumService {
  create(dto: CreatePremiumDto): Promise<DocumentType<PremiumEntity>>;
  findByPremiumId(premiumId: string): Promise<DocumentType<PremiumEntity> | null>;
  findByPremiumName(premiumName: string): Promise<DocumentType<PremiumEntity> | null>;
  findByPremiumNameOrCreate(premiumName: string, dto: CreatePremiumDto): Promise<DocumentType<PremiumEntity>>;
}
