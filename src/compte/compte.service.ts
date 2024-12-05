import { Injectable } from '@nestjs/common';
import { CreateCompteDto } from './dto/create-compte.dto';
import { UpdateCompteDto } from './dto/update-compte.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Compte } from './entities/compte.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompteService {

  constructor(
    @InjectRepository(Compte)
    private compteRepository: Repository<Compte>
  ) {

  }

  async create(createCompteDto: CreateCompteDto) {
    try {
      const newCompte = await this.compteRepository.create(createCompteDto)

      return await this.compteRepository.save(newCompte)


    } catch (error) {
      throw new Error("Verify your input")
    }

  }

  async shareCompte(compteId: number, idUser: number) {
    const compte = await this.findOne(compteId)

    if (!compte.collab) {
      compte.collab = []
    }

    const addCollab = await this.compteRepository.update(compteId, {
      collab: [...compte.collab, { id: idUser }]
    })

    return addCollab
  }


  async findByUserId(userId: number): Promise<Compte[]> {

    const comptes = await this.compteRepository.find({
      where: {
        user: { id: userId }
      },
      relations: ["user"]
    })

    if (!comptes || comptes.length === 0) {
      throw new Error("compte not found | the user have no compte")
    }

    return comptes;


  }




  findAll() {
    return `This action returns all compte`;
  }

  async findOne(id: number) {
    return await this.compteRepository.findOne({
      where: {
        idCompte: id
      },
      relations: ["depenses", "revenus", "user", "collab"]
    });
  }

  async update(id: number, updateCompteDto: UpdateCompteDto) {
    const compte = await this.compteRepository.update(id, updateCompteDto)

    return await this.findOne(id)

  }


  async upgradeSolde(id: number, montantRevenu: number) {

    const compte = await this.findOne(id)

    const newSolde = compte.solde + montantRevenu

    await this.update(id, { solde: newSolde })

  }


  async degradeSolde(id: number, montantDepense: number) {

    const compte = await this.findOne(id)

    const newSolde = compte.solde - montantDepense

    await this.update(id, { solde: newSolde })

  }

  async remove(id: number) {
    await this.compteRepository.delete(id);
  }
}
