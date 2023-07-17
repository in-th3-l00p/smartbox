export interface User {
  id: number;
  login: string;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  authorities: string[];
}

export interface Slot {
  id: number;
  order: number;
  empty: boolean;
  capacity: number;
}

export interface Device {
  id: number;
  name: string;
  location: string;
}
