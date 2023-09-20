import { Client } from 'pg';
import { User, UserExtended } from '../types/User';

export class UsersPostgresProvider {

    private scheme_name: string = "barak_josef"

    private db(): Client {
        const dbConfig = {
            user: 'asterra',
            host: 'asterra-db.ccokaxcrygnz.eu-west-1.rds.amazonaws.com', // For example, 'localhost' or your AWS RDS endpoint
            database: 'taskdb',
            password: '12345678',
            port: 5432, // PostgreSQL default port
            ssl: {
                rejectUnauthorized: false
            }
        };
        return new Client(dbConfig);
    }


    async addHobbie(user_id: number, hobbies: string) {
        const db = this.db();
        try {
            db.connect();
            const query = `
            INSERT INTO ${this.scheme_name}.hobbies (user_id, hobbies)
            VALUES ($1, $2)
            ON CONFLICT (user_id) DO UPDATE
            SET hobbies = $2
            RETURNING user_id;`;
            await db.query(query, [user_id, hobbies]);
        }
        catch (err) {
            console.log(err);
            throw err;
        }
        finally {
            await db.end();
        }
    }


    async getAllExtended(): Promise<User[]> {
        const db = this.db();
        try {
            db.connect();
            const query = `
            SELECT u.id,
            first_name,
            last_name,
            address,
            phone_number,
            h.hobbies
FROM ${this.scheme_name}.users u
LEFT JOIN ${this.scheme_name}.hobbies h ON u.id = h.user_id`;
            const dbresult = await db.query(query);
            console.log(JSON.stringify(dbresult.rows));
            
            const result: UserExtended[] = dbresult.rows.map<UserExtended>(u => ({
                id: u.id,
                firstName: u.first_name,
                lastName: u.last_name,
                address: u.address,
                phone: u.phone_number,
                hobbies: u.hobbies
            }))
            return result;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
        finally {
            await db.end();
        }
    }

    async getAll(): Promise<User[]> {
        const db = this.db();
        try {
            db.connect();
            const query = `SELECT id, first_name, last_name FROM ${this.scheme_name}.users`;
            const dbresult = await db.query(query);

            const result: User[] = dbresult.rows.map<User>(u => ({
                id: u.id,
                firstName: u.first_name,
                lastName: u.last_name,
            }))
            return result;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
        finally {
            await db.end();
        }
    }
    getById(id: number): Promise<User> {
        throw new Error('Method not implemented.');
    }
    async create(data: UserExtended): Promise<number> {
        const db = this.db();
        try {
            db.connect();
            const query = `
            INSERT INTO ${this.scheme_name}.users (first_name, last_name, address, phone_number)
            VALUES ($1, $2, $3, $4)
            RETURNING id;`;

            const values = [data.firstName, data.lastName, data.address, data.phone];

            const result = await db.query(query, values);
            const insertedUserId = result.rows[0].id;
            return insertedUserId;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
        finally {
            await db.end();
        }
    }
    updateById(data: User): Promise<void> {
        throw new Error('Method not implemented.');
    }

    async deleteById(id: number): Promise<void> {
        const db = await this.db();
        try {
            db.connect();

            const deleteHobbiesQuery = `DELETE FROM ${this.scheme_name}.hobbies WHERE user_id = $1`;
            const deleteUserQuery = `DELETE FROM ${this.scheme_name}.users WHERE id = $1`;
            const values = [id];
            const hobbiesResult = await db.query(deleteHobbiesQuery, values)
            const dbresult = await db.query(deleteUserQuery, values);

            if (dbresult.rowCount === 1) {
                console.log(`Deleted user with ID: ${id}`);
            } else {
                throw new Error("User with ID ${id} not found.")
            }
        }
        catch (err) {
            console.log(err);
            throw err;
        }
        finally {
            await db.end();
        }
    }

}