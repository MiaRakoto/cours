import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompteModule } from './compte/compte.module';
import { Collaboration } from './compte/entities/collab.entity';
import { Compte } from './compte/entities/compte.entity';
import { DepenseModule } from './depense/depense.module';
import { Depense } from './depense/entities/depense.entity';
import { LoginModule } from './login/login.module';
import { Revenu } from './revenu/entities/revenu.entity';
import { RevenuModule } from './revenu/revenu.module';
import { User } from './user/entities/user.entity';
import { UsersModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Revenu, Depense, Compte, Collaboration],
      synchronize: false,
      logging: true,
    }),

    UsersModule,
    LoginModule,
    RevenuModule,
    DepenseModule,
    CompteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
