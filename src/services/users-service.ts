import { UsersPostgresProvider } from './../providers/UsersPostgresProvider';
import { ICrudService } from './../types/interfaces/ICrudService';
import { User, UserExtended } from '../types/User';

export class UsersService implements ICrudService<User> {
    private usersPostgresProvider: UsersPostgresProvider = new UsersPostgresProvider();

    constructor() {
    }




    async getAll(params: any): Promise<User[]> {
        const { isExtended } = params;
        let results: any[] = [];        
        if (isExtended) {
            results = await this.usersPostgresProvider.getAllExtended();
        } else {
            results = await this.usersPostgresProvider.getAll();
        }
        return results;
    }


    async create(data: UserExtended): Promise<number> {
        const newId = await this.usersPostgresProvider.create(data);
        return newId;
    }

    getById(id: number): Promise<User> {
        throw new Error('Method not implemented.');
    }

    updateById(data: User): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async deleteById(id: number): Promise<void> {
       await this.usersPostgresProvider.deleteById(id);
    }

    async addHobbie(user_id: number, hobbie: string) {
        await this.usersPostgresProvider.addHobbie(user_id, hobbie);
    }

}