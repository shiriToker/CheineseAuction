import { User } from "./user";

export class Gift {
    id?:string;
    number?:number;
    name?:string;
    donor?:string; //Donor
    ticketPrice:number=10;
    imageUrl?:string;
    userNames?:User[]=[];
}
