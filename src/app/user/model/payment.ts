import {Category} from "./category";
import {Wallet} from "./wallet";
export interface Payment {
  id?: number;
  name?: string;
  status?: string;
  date?: Date;
  money?: number;
  description?: string;
  category?: any;
  wallet?: any;
}
