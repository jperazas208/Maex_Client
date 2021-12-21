import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import ClientsEntity from './clients.entity';

@Entity('WhatsAppAccounts')
export default class WhatsAppAccountEntity {

  @PrimaryColumn('varchar', { nullable: false, length: 255, unique: true })
  WhatsAppId: string;

  @CreateDateColumn()
  ActiveDate: Date;

  @Column('datetime', { nullable: true, default: null })
  InactiveDate?: Date | null;

  @ManyToOne(() => ClientsEntity, client => client.WhatsAppAccount)
  @JoinColumn({name: 'ClientId'})
  Client: ClientsEntity;

}