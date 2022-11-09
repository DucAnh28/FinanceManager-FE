import firebase from "firebase/compat";
import {AppUser} from "./appUser";

export interface Wallet {
  id?:number;
  name?:string;
  money?:number;
  status?:boolean;
  icon?:string;
  appUser?:any;
}
