import { Collaboration } from 'src/compte/entities/collab.entity';
import { Compte } from 'src/compte/entities/compte.entity';
import { Depense } from 'src/depense/entities/depense.entity';
import { Revenu } from 'src/revenu/entities/revenu.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Revenu, (revenu) => revenu.user)
  revenusPerso: Revenu[];

  @OneToMany(() => Depense, (depense) => depense.user)
  depensesPerso: Depense[];

  @OneToMany(() => Compte, (compte) => compte.user)
  comptes: Compte[];

  @ManyToMany(() => Compte, (compte) => compte.collab)
  @JoinTable({ name: 'collaboration' })
  comptePartage: Compte[];

  @OneToMany(() => Collaboration, (collaboration) => collaboration.user)
  collaborations: Collaboration[];
}
