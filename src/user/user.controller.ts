import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './user.service';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<void> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );
    const user: User = {
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
      id: 0,
      comptes: [],
      comptePartage: [],
      revenusPerso: [],
      depensesPerso: [],
      collaborations: [],
    };
    try {
      const response = await this.usersService.create(user);
      res.status(200).json({
        status: true,
        data: response,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        data: error,
      });
    }
  }

  @Get(':userId/revenu/:revenuId')
  async getUserIdByRevenuId(
    @Param('userId') userId: number,
    @Param('revenuId') revenuId: number,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const response = await this.usersService.getUserIdByRevenuId(
        userId,
        revenuId,
      );
      res.status(200).json({
        status: true,
        data: response,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        data: error,
      });
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
