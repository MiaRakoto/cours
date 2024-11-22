import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  // [x: string]: any;


  constructor(
    @InjectRepository(User) // Injection de dépendance de l'entité User
    private userRepository: Repository<User>,
  ) { }

  // Méthode pour récupérer tous les utilisateurs
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Méthode pour récupérer un utilisateur par ID
  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }  // Méthode pour créer un utilisateur

  findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  // Méthode pour mettre à jour un utilisateur
  async update(id: number, user: Partial<User>): Promise<User> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne({ where: { id } });
  }

  // Méthode pour supprimer un utilisateur
  async remove(id: number): Promise<void> {
    return await this.userRepository.delete(id).then(() => { });
  }
}
