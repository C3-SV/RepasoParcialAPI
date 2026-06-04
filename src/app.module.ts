import 'dotenv/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MachineModule } from './machines/machines.module';
import { RentalsModule } from './rentals/rentals.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST?.trim() || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME?.trim() || 'postgres',
      password: process.env.DB_PASSWORD?.trim() || '',
      database: process.env.DB_NAME?.trim() || 'heavyrent',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    MachineModule,
    RentalsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
