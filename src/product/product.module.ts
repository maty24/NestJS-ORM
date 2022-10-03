import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { BrandModule } from '../brand/brand.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [BrandModule, TypeOrmModule.forFeature([Product])],
})
export class ProductModule {}
