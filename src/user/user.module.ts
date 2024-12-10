import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collaboration } from 'src/compte/entities/collab.entity';
import { Compte } from 'src/compte/entities/compte.entity';
import { Revenu } from 'src/revenu/entities/revenu.entity';
import { User } from './entities/user.entity'; // Importer l'entité User
import { UsersController } from './user.controller';
import { UsersService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Revenu, Compte, Collaboration])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
