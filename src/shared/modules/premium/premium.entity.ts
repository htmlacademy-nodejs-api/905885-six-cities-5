import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { Premium } from '../../types/offer/premium.type.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface PremiumEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'categories'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class PremiumEntity extends defaultClasses.TimeStamps implements Premium {
  @prop({ required: true, trim: true })
  public name!: string;
}

export const PremiumModel = getModelForClass(PremiumEntity);
