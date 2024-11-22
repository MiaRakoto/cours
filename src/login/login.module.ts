import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { UserModule } from '../user/user.module';
import { UsersService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

// import {}

@Module({
  imports: [UserModule],
  controllers: [LoginController],
  providers: [UsersService],
})
export class LoginModule { }
