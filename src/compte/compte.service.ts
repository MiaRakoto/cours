import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { CompteService } from './compte.service';
import { CreateCompteDto } from './dto/create-compte.dto';
import { UpdateCompteDto } from './dto/update-compte.dto';

@Controller('compte')
@UseGuards(JwtAuthGuard)
export class CompteController {
  constructor(private readonly compteService: CompteService) {}

  @Post()
  async create(@Body() createCompteDto: CreateCompteDto, @Res() res: Response) {
    try {
      const data = await this.compteService.create(createCompteDto);

      res.status(200).json({
        status: true,
        data,
      });
    } catch (err) {
      res.status(501).json({
        status: false,
        err,
      });
    }
  }

  @Post('/share/:compteId')
  async shareCompte(
    @Param('compteId') compteId,
    @Body('idUser') idUser: number,
    @Res() res: Response,
  ) {
    try {
      const data = await this.compteService.shareCompte(compteId, idUser);

      res.status(200).json({
        status: true,
        data,
      });
    } catch (e) {
      res.status(200).json({
        status: true,
        data: e,
      });
    }
  }

  @Get('/user/:userId')
  async findByUserId(@Param('userId') userId, @Res() res: Response) {
    try {
      const data = await this.compteService.findByUserId(userId);

      res.status(200).json({
        status: true,
        data,
      });
    } catch (err) {
      res.status(501).json({
        status: false,
        err,
      });
    }
  }

  @Get()
  findAll() {
    return this.compteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.compteService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCompteDto: UpdateCompteDto,
  ) {
    return await this.compteService.update(+id, updateCompteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.compteService.remove(+id);
  }
}
