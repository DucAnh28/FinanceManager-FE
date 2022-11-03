import firebase from "firebase/compat";

export interface Wallet {
  id?:number;
  name?:string;
  money?:number;
  status?:boolean;
  icon?:string;
  user?:null;
}
