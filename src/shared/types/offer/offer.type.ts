import { Apartment } from './apartment.type.js';
import { City } from './city.type.js';
import { Comfort } from './comfort.type.js';
import { Favourite } from './favourite.type.js';
import { Image } from './image.type.js';
import { Premium } from './premium.type.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  imagePreview: string;
  images: Image[];
  premium: Premium;
  favourite: Favourite;
  rating: number;
  apartmentType: Apartment;
  roomCount: number;
  guestsCount: number;
  cost: number;
  comfort: Comfort[];
  author: string;
  commentsCount: number;
  coords: string;
}
