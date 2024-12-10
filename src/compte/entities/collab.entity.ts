import { User } from 'src/user/entities/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Compte } from './compte.entity';

@Entity('collaboration')
export class Collaboration {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  compteId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Compte, (compte) => compte.collaborations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'compteId' }) // Spécifie explicitement le nom de la colonne
  compte: Compte;
}
