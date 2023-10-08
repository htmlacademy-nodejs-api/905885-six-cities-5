import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component } from '../../types/index.js';
import { PremiumService } from './premium-service.interface.js';
import { DefaultPremiumService } from './premium.service.js';
import { PremiumEntity, PremiumModel } from './premium.entity.js';

export function createPremiumContainer() {
  const premiumContainer = new Container();

  premiumContainer.bind<PremiumService>(Component.PremiumService).to(DefaultPremiumService);
  premiumContainer.bind<types.ModelType<PremiumEntity>>(Component.PremiumModel).toConstantValue(PremiumModel);

  return premiumContainer;
}
