import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompteService } from 'src/compte/compte.service';
import { Compte } from 'src/compte/entities/compte.entity';
import { Repository } from 'typeorm';
import { CreateDepenseDto } from './dto/create-depense.dto';
import { Depense } from './entities/depense.entity';

@Injectable()
export class DepenseService {
  constructor(
    @InjectRepository(Depense)
    private depenseRepository: Repository<Depense>,

    @InjectRepository(Compte)
    private compteRepository: Repository<Compte>,

    @Inject()
    private compteService: CompteService,
  ) {}

  async create(createDepenseDto: CreateDepenseDto) {
    const compte = await this.compteRepository.findOne({
      where: {
        idCompte: createDepenseDto.userId,
      },
    });

    if (!compte) {
      throw new Error('compte not found');
    }

    const newDepense = await this.depenseRepository.create({
      ...createDepenseDto,
      compte,
    });

    await this.compteService.degradeSolde(
      newDepense.compte.idCompte,
      newDepense.montant,
    );

    return await this.depenseRepository.save(newDepense);
  }

  // async getDepenseByUserId(userId: number): Promise<Depense[]> {

  //   // const depenses = await this.depenseRepository.find({
  //   //   where: {
  //   //     user: {
  //   //       id: userId
  //   //     }
  //   //   },
  //   //   relations: ["user"]
  //   // })

  //   // if (!depenses || depenses.length === 0) {
  //   //   throw new Error("no depenses found")
  //   // }

  //   // return depenses;

  // }

  async findOne(id: number): Promise<Depense> {
    const depense = await this.depenseRepository.findOne({
      where: {
        idDepense: id,
      },
    });

    if (!depense) {
      throw new Error('Depense not found');
    }

    return depense;
  }

  async update(id: number, depense: Partial<Depense>): Promise<Depense> {
    await this.depenseRepository.update(id, depense);
    return this.findOne(id);
  }
  async remove(id: number): Promise<void> {
    const depense = await this.depenseRepository.findOne({
      where: {
        idDepense: id,
      },
      relations: ['compte'],
    });

    await this.compteService.upgradeSolde(
      depense.compte.idCompte,
      depense.montant,
    );

    await this.depenseRepository.delete(id);
  }
}
