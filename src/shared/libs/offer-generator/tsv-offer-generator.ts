import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';

const MIN_RATING = 1;
const MAX_RATING = 5;

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const MIN_ROOMS = 1;
const MAX_ROOMS = 8;

const MIN_GUESTS = 1;
const MAX_GUESTS = 10;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) { }

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const city = getRandomItem<string>(this.mockData.citys);
    const imagePreview = getRandomItem<string>(this.mockData.imagesPreview);
    const images = getRandomItems<string>(this.mockData.images).join(';');
    const premium = generateRandomValue(0, 1) === 1;
    const favourite = generateRandomValue(0, 1) === 1;
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, 1);
    const apartmentType = getRandomItem<string>(this.mockData.apartmentTypes);
    const roomCount = generateRandomValue(MIN_ROOMS, MAX_ROOMS);
    const guestsCount = generateRandomValue(MIN_GUESTS, MAX_GUESTS);
    const cost = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const comfort = getRandomItems<string>(this.mockData.comfort).join(';');
    const authorName = getRandomItem<string>(this.mockData.users);
    const authorEmail = getRandomItem<string>(this.mockData.emails);
    const authorAvatar = getRandomItem<string>(this.mockData.avatars);
    const authorPassword = getRandomItem<string>(this.mockData.passwords);
    const authorType = generateRandomValue(0, 1) === 1;
    const commentsCount = generateRandomValue(0, 10);

    const coords = `${generateRandomValue(48, 54, 6)},${generateRandomValue(2, 10, 6)}`;
    const postDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    return [
      title, description, postDate,
      city, imagePreview, images,
      premium, favourite, rating,
      apartmentType, roomCount, guestsCount,
      cost, comfort, authorName,
      authorEmail, authorAvatar, authorPassword,
      authorType, commentsCount, coords
    ].join('\t');
  }
}
