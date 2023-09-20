import { Hobbie } from './Hobbie';

export interface User {
    id?: number;
    firstName: string;
    lastName: string;
}

export interface UserExtended extends User {
    address: string;
    phone: string;
    hobbies: Hobbie[];
}

