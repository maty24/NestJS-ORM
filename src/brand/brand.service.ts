import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(@InjectRepository(Brand) private brandsRepo: Repository<Brand>) {}

  findAll() {
    return this.brandsRepo.find();
  }

  findOne(id: number) {
    const product = this.brandsRepo.findOne({
      relations: ['products'],
      where: {
        //esto es para que buscque por el id
        id,
      },
    });
    if (!product) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return product;
  }

  create(data: CreateBrandDto) {
    const newBrand = this.brandsRepo.create(data);
    return this.brandsRepo.save(newBrand);
  }

  async update(id: number, changes: UpdateBrandDto) {
    const brand = await this.findOne(id);
    this.brandsRepo.merge(brand, changes);
    return this.brandsRepo.save(brand);
  }

  remove(id: number) {
    return this.brandsRepo.delete(id);
  }
}
