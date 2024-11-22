import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import * as bcrypt from "bcrypt"

import { UsersService } from '../user/user.service';
// import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly userService: UsersService,
    // private jwtService: JwtService

  ) { }

  @Post()
  async create(@Body() createLoginDto: CreateUserDto) {
    const userFindMail = await this.userService.findByEmail(createLoginDto.email);
    const isValid = await bcrypt.compare(createLoginDto.password, userFindMail.password)

    if (!isValid) {

      console.log("error");

    }

    return userFindMail;



  }

}
