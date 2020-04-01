
import { UserID } from './User';
import { Model } from './Model';

export class Action extends Model<Action> {
  public amount: number;
  public currency: string;
  public author: UserID;
  public type: number
  public target: UserID;
  public date: number;
}
