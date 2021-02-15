import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PizzaController } from './pizza.controller';
import { PizzaService } from './pizza.service';
import { PizzaRepository } from './pizza.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([PizzaRepository])
  ],
  controllers: [PizzaController],
  providers: [PizzaService]
})
export class PizzaModule {}
