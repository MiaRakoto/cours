import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompteService } from 'src/compte/compte.service';
import { Collaboration } from 'src/compte/entities/collab.entity';
import { Compte } from 'src/compte/entities/compte.entity';
import { User } from 'src/user/entities/user.entity';
import { DepenseController } from './depense.controller';
import { DepenseService } from './depense.service';
import { Depense } from './entities/depense.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Depense, Compte, Collaboration, User])],
  controllers: [DepenseController],
  providers: [DepenseService, CompteService],
})
export class DepenseModule {}
