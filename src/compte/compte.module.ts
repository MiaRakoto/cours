import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { CompteController } from './compte.controller';
import { CompteService } from './compte.service';
import { Collaboration } from './entities/collab.entity';
import { Compte } from './entities/compte.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Compte, Collaboration, User])],
  controllers: [CompteController],
  providers: [CompteService],
  exports: [CompteService],
})
export class CompteModule {}
