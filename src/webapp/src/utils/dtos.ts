export interface Card {
  id: number;
  userId: string;
  device: Device;
}

export interface User {
  id: number;
  login: string;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  authorities: string[];
  user: User;
  card: Card | null;
}

export interface Slot {
  id: number;
  volume: number;
}

export interface Device {
  id: number;
  name: string;
  location: string;
  slots: Slot[];
}

export interface Transaction {
  id: number;
  volume: number;
  createdDate: string;
  card: Card;
  slot: Slot;
}

export interface DeviceLog {
  id: number;
  log: string;
  createdDate: string;
  device: Device;
}
