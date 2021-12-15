import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm';
import Team from './team.js';

@Entity()
export default class Company {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({unique: true})
  name!: string;

  @Column({nullable: true})
  ceoFirstName: string;

  @Column({nullable: true})
  ceoLastName: string;

  @Column({nullable: true})
  address: string;

  @Column({nullable: true, type: 'date'})
  inceptionDate: Date;

  @OneToMany(()=> Team, (team)=> team.company)
  teams: Team[]

  @CreateDateColumn()
  createdOn!: Date;

  @UpdateDateColumn()
  updatedOn!: Date;

}