import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { Apartment } from '../../types/offer/apartment.type.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface ApartmentEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'categories'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class ApartmentEntity extends defaultClasses.TimeStamps implements Apartment {
  @prop({ required: true, trim: true })
  public name!: string;
}

export const ApartmentModel = getModelForClass(ApartmentEntity);
