export interface CardSlot {
  slotName: string;
  value: number;
}

export interface Card {
  id: number;
  userId: string;
  device: Device;
  cardSlots: CardSlot[];
}

export type Authority = 'ROLE_USER' | 'ROLE_ADMIN' | 'ROLE_GENERATOR' | 'ROLE_OPERATOR' | 'ROLE_UAT';
export function getAuthorityText(authority: Authority) {
  switch (authority) {
    case 'ROLE_USER':
      return 'Utilizator';
    case 'ROLE_ADMIN':
      return 'Admin';
    case 'ROLE_GENERATOR':
      return 'Generator';
    case 'ROLE_OPERATOR':
      return 'Operator';
    case 'ROLE_UAT':
      return 'UAT';
  }
}

export interface User {
  id: number;
  login: string;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  authorities: Authority[];
  user: User;
  card: Card | null;
}

export interface Slot {
  id: number;
  name: string;
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
  createdDate: Date;
  card: Card;
  slot: Slot;
}

export interface DeviceLog {
  id: number;
  log: string;
  createdDate: Date;
  device: Device;
}

export interface Contact {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export interface ReportDisplay {
  id: number;
  createdAt: Date;
}

export interface ReportSlot {
  id: number;
  name: string;
  volume: number;
}

export interface UserReport extends ReportDisplay {
  userId: number;
  username: string;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  deviceId: number;
  cardId: number;
  slots: ReportSlot[];
}

export interface DeviceReport extends ReportDisplay {
  deviceId: number;
  deviceName: string;
  deviceLocation: string;
  slots: ReportSlot[];
}

export interface ReportUser {
  id: number;
  userId: number;
  username: string;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  cardId: number;
}

export interface UserDeviceReport extends ReportDisplay {
  deviceId: number;
  deviceName: string;
  deviceLocation: string;
  users: ReportUser[];
}

export interface DeviceCoordinate {
  name: string;
  latitude: number;
  longitude: number;
}

export interface Notification {
  id: number;
  deviceId: number;
  slotId: number;
  finished: boolean;
}
