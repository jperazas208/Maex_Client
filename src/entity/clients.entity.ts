import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, RelationId } from "typeorm";
import WhatsAppAccountEntity from './whatsappAccount.entity';

@Entity('Clients')
export default class ClientsEntity {

  @PrimaryGeneratedColumn()
  ClientId: number;

  @Column({length: 255, nullable: true, default: ''})
  LastName: string;

  @Column({length: 255, nullable: true, default: ''})
  FirstName: string;

  @Column('date', { nullable: true, default: null })
  DOB?: Date | null

  @Column('date', { nullable: true, default: null })
  InactiveDate?: Date | null;

  @Column({length: 15, nullable: true, default: ''})
  Gender: string;

  @Column({ nullable: true, default: null })
  AssignedTo?: number;

  @CreateDateColumn()
  ActiveDate: Date;

  @OneToMany(() => WhatsAppAccountEntity, whatsAppAccount => whatsAppAccount.Client, { cascade: ['insert'] })
  //@OneToMany(() => WhatsAppAccountEntity, whatsAppAccount => whatsAppAccount.Client)
  WhatsAppAccount: WhatsAppAccountEntity[];

}