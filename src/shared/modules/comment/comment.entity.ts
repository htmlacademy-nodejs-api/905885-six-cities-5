import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { Comment } from '../../types/comment/comment.type.js';
import { User } from '../../types/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CommentEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'categories'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CommentEntity extends defaultClasses.TimeStamps implements Comment {
  text: string;
  postDate: Date;
  rating: number;
  author: User;
  @prop({ required: true, trim: true })
  public name!: string;
}

export const CommentModel = getModelForClass(CommentEntity);
