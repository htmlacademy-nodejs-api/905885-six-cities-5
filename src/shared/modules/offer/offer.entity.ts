import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { UserEntity } from '../user/index.js';
import { Favourite, Image } from '../../types/index.js';
import { CityEntity } from '../city/city.entity.js';
import { PremiumEntity } from '../premium/premium.entity.js';
import { ApartmentEntity } from '../apartment/apartment.entity.js';
import { ComfortEntity } from '../comfort/comfort.entity.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public title!: string;

  @prop({ trim: true, required: true })
  public description!: string;

  @prop()
  public postDate!: Date;

  @prop({
    ref: CityEntity,
    required: true,
    default: '',
    _id: true
  })
  public city!: Ref<CityEntity>;

  @prop()
  public imagePreview!: string;

  @prop()
  public images!: Image[];

  @prop({
    ref: PremiumEntity,
    required: true,
    default: '',
    _id: true
  })
  public premium!: Ref<PremiumEntity>;

  @prop()
  public favourite!: Favourite;

  @prop()
  public rating!: number;

  @prop({
    ref: ApartmentEntity,
    required: true,
    default: '',
    _id: true
  })
  public apartmentType!: Ref<ApartmentEntity>;

  @prop({ default: 0 })
  public roomCount!: number;

  @prop({ default: 0 })
  public guestsCount!: number;

  @prop({ default: 0 })
  public cost!: number;

  @prop({
    ref: ComfortEntity,
    required: true,
    default: '',
    _id: true
  })
  public comfort!: Ref<ComfortEntity>[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;

  @prop({ default: 0 })
  public commentCount!: number;

  @prop({ default: '' })
  public coords!: string;
}

export const OfferModel = getModelForClass(OfferEntity);
