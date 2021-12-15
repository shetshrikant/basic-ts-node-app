import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne} from 'typeorm';
import Company from "./company.js";

@Entity()
export default class Team {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  companyId!: number;

  @ManyToOne(()=>Company, (company)=>company.teams)
  company: Company

  @Column()
  teamLeadFirstName: string;

  @Column()
  teamLeadLastName: string;

  @CreateDateColumn()
  createdOn!: Date;

  @UpdateDateColumn()
  updatedOn!: Date;

}