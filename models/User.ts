
import { Model } from './Model';
import { MongoId } from '~/types/common';

export type UserID = MongoId;

export class User<T> extends Model<T> {
    public _id: UserID;
    public name: string;
    public avatar: string;
}
