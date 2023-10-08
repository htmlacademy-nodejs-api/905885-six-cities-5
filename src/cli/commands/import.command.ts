import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { createOffer, getErrorMessage, getMongoURI } from '../../shared/helpers/index.js';
import { UserService } from '../../shared/modules/user/user-service.interface.js';
import { DefaultOfferService, OfferModel, OfferService } from '../../shared/modules/offer/index.js';
import { DatabaseClient, MongoDatabaseClient } from '../../shared/libs/database-client/index.js';
import { Logger } from '../../shared/libs/logger/index.js';
import { ConsoleLogger } from '../../shared/libs/logger/console.logger.js';
import { DefaultUserService, UserModel } from '../../shared/modules/user/index.js';
import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from './command.constant.js';
import { Offer } from '../../shared/types/index.js';
import { CommentService } from '../../shared/modules/comment/comment-service.interface.js';
import { UserTypeService } from '../../shared/modules/user-type/user-type-service.interface.js';
import { PremiumService } from '../../shared/modules/premium/premium-service.interface.js';
import { ComfortService } from '../../shared/modules/comfort/comfort-service.interface.js';
import { CityService } from '../../shared/modules/city/city-service.interface.js';
import { ApartmentService } from '../../shared/modules/apartment/apartment-service.interface.js';
import { DefaultUserTypeService } from '../../shared/modules/user-type/user-type.service.js';
import { UserTypeModel } from '../../shared/modules/user-type/user-type.entity.js';
import { DefaultPremiumService } from '../../shared/modules/premium/premium.service.js';
import { PremiumModel } from '../../shared/modules/premium/premium.entity.js';
import { DefaultComfortService } from '../../shared/modules/comfort/comfort.service.js';
import { ComfortModel } from '../../shared/modules/comfort/comfort.entity.js';
import { DefaultCityService } from '../../shared/modules/city/city.service.js';
import { CityModel } from '../../shared/modules/city/city.entity.js';
import { DefaultApartmentService } from '../../shared/modules/apartment/apartment.service.js';
import { ApartmentModel } from '../../shared/modules/apartment/apartment.entity.js';
import { DefaultCommentService } from '../../shared/modules/comment/comment.service.js';
import { CommentModel } from '../../shared/modules/comment/comment.entity.js';

export class ImportCommand implements Command {
  private userService: UserService;
  private userTypeService: UserTypeService;

  private offerService: OfferService;
  private premiumService: PremiumService;
  private comfortService: ComfortService;
  private cityService: CityService;
  private apartmentService: ApartmentService;

  private commentService: CommentService;

  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();

    this.userService = new DefaultUserService(this.logger, UserModel);
    this.userTypeService = new DefaultUserTypeService(this.logger, UserTypeModel);

    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.premiumService = new DefaultPremiumService(this.logger, PremiumModel);
    this.comfortService = new DefaultComfortService(this.logger, ComfortModel);
    this.cityService = new DefaultCityService(this.logger, CityModel);
    this.apartmentService = new DefaultApartmentService(this.logger, ApartmentModel);

    this.commentService = new DefaultCommentService(this.logger, CommentModel);

    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  private async saveOffer(offer: Offer) {
    const comforts: string[] = [];

    const user = await this.userService.findOrCreate({
      ...offer.author,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    const userType = await this.userTypeService.findByUserTypeNameOrCreate(offer.author.userType, { name: offer.author.userType });

    for (const name of offer.comfort) {
      const existComfort = await this.comfortService.findByComfortNameOrCreate(name, { name });
      comforts.push(existComfort.id);
    }

    const city = await this.cityService.findByCityNameOrCreate(offer.city, { name: offer.city });
    const premium = await this.premiumService.findByPremiumNameOrCreate(offer.premium, { name: offer.premium });
    const apartment = await this.apartmentService.findByApartmentNameOrCreate(offer.apartmentType, { name: offer.apartmentType });

    await this.offerService.create({
      title: offer.title,
      description: offer.description,
      postDate: new Date,
      city: city.id,
      imagePreview: offer.imagePreview,
      images: offer.images,
      premium: premium.id,
      favourite: offer.favourite,
      rating: offer.rating,
      apartmentType: apartment.id,
      roomCount: offer.roomCount,
      guestsCount: offer.guestsCount,
      cost: offer.cost,
      comfort: comforts,
      userId: user.id,
      commentsCount: offer.commentsCount,
      coords: offer.coords,
    });

  }

  public getName(): string {
    return '--import';
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(error));
    }
  }
}
