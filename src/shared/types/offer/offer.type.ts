import { User } from '../user/user.type.js';
import { Apartment } from './apartment.enum.js';
import { City } from './city.enum.js';
import { Comfort } from './comfort.enum.js';
import { Image } from './image.type.js';
import { Premium } from './premium.enum.js';
// import { Favourite } from './favourite.type.js';
// import { Premium } from './premium.type.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  imagePreview: string;
  images: Image[];
  premium: Premium;
  favourite: boolean;
  rating: number;
  apartmentType: Apartment;
  roomCount: number;
  guestsCount: number;
  cost: number;
  comfort: Comfort[];
  author: User;
  commentsCount: number;
  coords: string;
}
