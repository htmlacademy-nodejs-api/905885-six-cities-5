import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { Comfort } from '../../types/offer/comfort.type.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface ComfortEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'categories'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class ComfortEntity extends defaultClasses.TimeStamps implements Comfort {
  @prop({ required: true, trim: true })
  public name!: string;
}

export const ComfortModel = getModelForClass(ComfortEntity);
