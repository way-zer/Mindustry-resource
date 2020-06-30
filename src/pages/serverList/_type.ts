export interface Type {
  name: string;
  address: string;
  mapName: string;
  players: number;
  wave: number;
  version: number;
  type: TypeEnum;
  mode: Mode;
  limit: number;
  description: string;
  timeMs: number;
  lastOnline: number;
  online: boolean;
  lastUpdate: number;
}

export enum Mode {
  Attack = 'attack',
  Editor = 'editor',
  Pvp = 'pvp',
  Sandbox = 'sandbox',
  Survival = 'survival',
}

export enum TypeEnum {
  Official = 'official',
}
