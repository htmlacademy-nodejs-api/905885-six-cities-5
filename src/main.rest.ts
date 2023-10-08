import 'reflect-metadata';
import { Container } from 'inversify';
import { RestApplication } from './rest/index.js';
import { Component } from './shared/types/index.js';
import { createRestApplicationContainer } from './rest/rest.container.js';
import { createUserContainer } from './shared/modules/user/index.js';
import { createOfferContainer } from './shared/modules/offer/offer.container.js';
import { createUserTypeContainer } from './shared/modules/user-type/user-type.container.js';
import { createApartmentContainer } from './shared/modules/apartment/apartment.container.js';
import { createCityContainer } from './shared/modules/city/city.container.js';
import { createComfortContainer } from './shared/modules/comfort/comfort.container.js';
import { createCommentContainer } from './shared/modules/comment/comment.container.js';
import { createPremiumContainer } from './shared/modules/premium/premium.container.js';


async function bootstrap() {
  const appContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createUserTypeContainer(),
    createOfferContainer(),
    createApartmentContainer(),
    createCityContainer(),
    createComfortContainer(),
    createCommentContainer(),
    createPremiumContainer(),
  );

  const application = appContainer.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
