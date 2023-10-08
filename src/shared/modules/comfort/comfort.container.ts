import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component } from '../../types/index.js';
import { ComfortService } from './comfort-service.interface.js';
import { DefaultComfortService } from './comfort.service.js';
import { ComfortEntity, ComfortModel } from './comfort.entity.js';

export function createComfortContainer() {
  const comfortContainer = new Container();

  comfortContainer.bind<ComfortService>(Component.ComfortService).to(DefaultComfortService);
  comfortContainer.bind<types.ModelType<ComfortEntity>>(Component.ComfortModel).toConstantValue(ComfortModel);

  return comfortContainer;
}
