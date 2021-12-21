import { Connection, createConnection, Repository } from "typeorm"
import ClientsEntity from './entity/clients.entity';
import WhatsAppAccountEntity from './entity/whatsappAccount.entity';
import xlsx from 'xlsx';

const index = async () => {

  createConnection().then( async (connection: Connection) => {

    const clientRepository: Repository<ClientsEntity> = connection.getRepository(ClientsEntity);
    const whatsAppAccountRepository: Repository<WhatsAppAccountEntity> = connection.getRepository(WhatsAppAccountEntity);

    const dt = xlsx.readFile(__dirname+'/Clientes.xlsx', {});
    const first_book = dt.Sheets[dt.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(first_book, { header: 1}) as any;


    for(var i = 0; i < data.length; i++) {
      const name = data[i][0]?.replace('????', '').replace('?','').replace('??', '').replace('???', '');

      const newClient = new ClientsEntity();
      newClient.FirstName = name;
      newClient.LastName = '';
      newClient.WhatsAppAccount = [];

      const phoneNumbers = data[i].filter((item: any, index: number) => index != 0);

      for(var f =0; f < phoneNumbers.length; f++) {
        
        const whatsapp = new WhatsAppAccountEntity();
        whatsapp.WhatsAppId = phoneNumbers[f];
        
        newClient.WhatsAppAccount.push(whatsapp);
      }

      try {
        await clientRepository.save(newClient);
        console.log(`Cliente # ${i+1} guardado exitosamente con ${newClient.WhatsAppAccount.length} contactos`)
      } catch (err: any) {
        console.log(name);
        break;
        // console.log(err.driverError);
      }
    }
    console.log('Clientes guardados exitosamente');
    
  })

}

index();

