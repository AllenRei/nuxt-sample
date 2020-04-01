import { MongoId } from '~/types/common';
import { Action } from './Action';
import { UserID } from './User';
import { Model } from './Model';

export type EventId = MongoId;

export class Event extends Model<Event> {
  _id: string;
  title: string = "";
  description: string = "";
  actions: Action[];
  admins: UserID[];
  participants: UserID[];
  tags: any[];
  inviteLink?: string;
  thread: any[];
  updatedAt: number;

  public get id() {
    return this._id;
  }
}
