import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { UserType } from '../../types/user/user-type.type.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserTypeEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'categories'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserTypeEntity extends defaultClasses.TimeStamps implements UserType {
  @prop({ required: true, trim: true })
  public name!: string;
}

export const UserTypeModel = getModelForClass(UserTypeEntity);
