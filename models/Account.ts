import { User } from './User';

export class Account extends User<Account> {
    public email: string;
    public role: string;
    public _id: string;
    public name: string;
    public avatar: string;

}
