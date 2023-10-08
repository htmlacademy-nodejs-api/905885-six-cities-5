import { ApartmentService } from './apartment-service.interface.js';
import { inject } from 'inversify';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { ApartmentEntity } from './apartment.entity.js';
import { CreateApartmentDto } from './dto/create-apartment.dto.js';

export class DefaultApartmentService implements ApartmentService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.ApartmentModel) private readonly apartmentModel: types.ModelType<ApartmentEntity>
  ) {}

  public async create(dto: CreateApartmentDto): Promise<DocumentType<ApartmentEntity>> {
    const result = await this.apartmentModel.create(dto);
    this.logger.info(`New apartment created: ${dto.name}`);
    return result;
  }

  public async findByApartmentId(apartmentId: string): Promise<DocumentType<ApartmentEntity> | null> {
    return this.apartmentModel.findById(apartmentId).exec();
  }

  public async findByApartmentName(apartmentName: string): Promise<DocumentType<ApartmentEntity> | null> {
    return this.apartmentModel.findOne({name: apartmentName}).exec();
  }

  public async findByApartmentNameOrCreate(apartmentName: string, dto: CreateApartmentDto): Promise<DocumentType<ApartmentEntity>> {
    const existedApartment = await this.findByApartmentName(apartmentName);

    if (existedApartment) {
      return existedApartment;
    }

    return this.create(dto);
  }
}
