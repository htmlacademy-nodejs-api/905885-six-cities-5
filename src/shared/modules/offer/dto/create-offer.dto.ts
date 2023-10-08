import { Image } from '../../../types/index.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public postDate: Date;
  public city: string;
  public imagePreview: string;
  public images: Image[];
  public premium: string;
  public favourite: boolean;
  public rating: number;
  public apartmentType: string;
  public roomCount: number;
  public guestsCount: number;
  public cost: number;
  public comfort: string[];
  public userId: string;
  public commentsCount: number;
  public coords: string;
}
