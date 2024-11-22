import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { UserModule } from '../user/user.module';
import { UsersService } from 'src/user/user.service';

@Module({
  imports: [UserModule],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule { }
