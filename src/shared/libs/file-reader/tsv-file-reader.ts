import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { Offer } from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([title, description, postDate, city, imagePreview, images, premium, favourite, rating, apartmentType, roomCount, guestsCount, cost, comfort, author, commentsCount, coords]) => ({
        title,
        description,
        postDate: new Date(postDate),
        city: { name: city },
        imagePreview,
        images: images.split(';')
          .map((name) => ({ link: name })),
        premium: { premium: premium === 'true' },
        favourite: { favourite: favourite === 'true' },
        rating: +rating,
        apartmentType: { name: apartmentType },
        roomCount: +roomCount,
        guestsCount: +guestsCount,
        cost: +cost,
        comfort: comfort.split(';')
          .map((name) => ({ name })),
        author,
        commentsCount: +commentsCount,
        coords
      }));
  }
}
