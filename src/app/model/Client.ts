import {ClientOperation} from "./ClientOperaion";

export class Client{
  clientId: string;
  clientName: string;
  ownerFirstName: string;
  ownerLastName: string;
  clientCategory: string;
  status: string;
  prebokingHours: number;
  houseNo: string;
  street: string;
  street1: string;
  street2: string;
  street3: string;
  street4: string;
  pincode: string;
  country: string;
  state: string;
  citu: string;
  latitude: string;
  longitude: string;
  daysOfOperation: [ClientOperation];
}
