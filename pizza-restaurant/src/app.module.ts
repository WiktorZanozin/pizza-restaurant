import { Module } from '@nestjs/common';
import { PizzaModule } from './pizza/pizza.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), PizzaModule, AuthModule]
})
export class AppModule {}
