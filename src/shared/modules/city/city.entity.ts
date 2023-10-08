import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { City } from '../../types/offer/city.type.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CityEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'categories'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CityEntity extends defaultClasses.TimeStamps implements City {
  @prop({ required: true, trim: true })
  public name!: string;
}

export const CityModel = getModelForClass(CityEntity);
