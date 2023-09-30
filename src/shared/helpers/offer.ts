import { Offer } from '../types/index.js';

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
    userType: { pro: authorType === 'true' },
  };

  return {
    title,
    description,
    postDate: new Date(postDate),
    city: { name: city },
    imagePreview,
    images: images.split(';')
      .map((name) => ({ link: name })),
    premium: premium === 'true',
    favourite: favourite === 'true',
    rating: +rating,
    apartmentType: { name: apartmentType },
    roomCount: +roomCount,
    guestsCount: +guestsCount,
    cost: +cost,
    comfort: comfort.split(';')
      .map((name) => ({ name })),
    author: user,
    commentsCount: +commentsCount,
    coords
  };
}
