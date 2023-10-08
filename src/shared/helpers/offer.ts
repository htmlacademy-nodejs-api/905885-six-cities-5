import { Apartment, City, Comfort, Offer, Premium, UserType } from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    postDate,
    city,
    imagePreview,
    images,
    premium,
    favourite,
    rating,
    apartmentType,
    roomCount,
    guestsCount,
    cost,
    comfort,
    authorName,
    authorEmail,
    authorAvatar,
    authorPassword,
    authorType,
    commentsCount,
    coords
  ] = offerData.replace('\n', '').split('\t');

  const user = {
    name: authorName,
    mail: authorEmail,
    avatar: authorAvatar,
    password: authorPassword,
    userType: UserType[authorType as 'pro' | 'default'],
  };

  return {
    title,
    description,
    postDate: new Date(postDate),
    city: City[city as 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf'],
    imagePreview,
    images: images.split(';')
      .map((name) => name),
    premium: Premium[premium as 'premium' | 'default'],
    favourite: favourite === 'true',
    rating: +rating,
    apartmentType: Apartment[apartmentType as 'apartment' | 'house' | 'room' | 'hotel'],
    roomCount: +roomCount,
    guestsCount: +guestsCount,
    cost: +cost,
    comfort: comfort.split(';')
      .map((name) => Comfort[name as 'Breakfast' | 'AirConditioning' | 'LaptopFriendlyWorkspace' | 'BabySeat' | 'Washer' | 'Towels' | 'Fridge']),
    author: user,
    commentsCount: +commentsCount,
    coords
  };
}
