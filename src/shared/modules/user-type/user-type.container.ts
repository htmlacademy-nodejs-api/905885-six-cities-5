import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component } from '../../types/index.js';
import { UserTypeService } from './user-type-service.interface.js';
import { DefaultUserTypeService } from './user-type.service.js';
import { UserTypeEntity, UserTypeModel } from './user-type.entity.js';

export function createUserTypeContainer() {
  const userTypeContainer = new Container();

  userTypeContainer.bind<UserTypeService>(Component.UserTypeService).to(DefaultUserTypeService);
  userTypeContainer.bind<types.ModelType<UserTypeEntity>>(Component.UserTypeModel).toConstantValue(UserTypeModel);

  return userTypeContainer;
}
