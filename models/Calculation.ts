import { Participant } from "./Participant";
import { UserID } from './User';
import { Model } from './Model';

export class Debt {
  amount: 0;
  user: Participant;
}

export class Calculation extends Model<Calculation> {
  actions: number = 0;
  debts: Debt[] = [];
  participants: number = 0;
  totalAmount: number = 0;
  totalTurnover: number = 0;
}

class Chain {
  from: UserID;
  to: UserID;
  amount: number;
}

export class ChainedCalculation extends Model<ChainedCalculation> {
  payers: string[] = [];
  paymentChain: Chain[] = [];
}
