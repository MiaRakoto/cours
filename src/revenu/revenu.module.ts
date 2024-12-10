import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompteService } from 'src/compte/compte.service';
import { Compte } from 'src/compte/entities/compte.entity';
import { User } from 'src/user/entities/user.entity';
import { Revenu } from './entities/revenu.entity';
import { RevenuController } from './revenu.controller';
import { RevenuService } from './revenu.service';

@Module({
  imports: [TypeOrmModule.forFeature([Revenu, Compte, User])],
  controllers: [RevenuController],
  providers: [RevenuService, CompteService],
  exports: [RevenuService],
})
export class RevenuModule {}
