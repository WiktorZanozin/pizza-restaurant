import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'witke2565624',
    database: 'pizzarestaurant',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true
}
