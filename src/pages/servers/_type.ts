export interface Type {
  name: string;
  address: string;
  mapName: string;
  players: number;
  wave: number;
  version: number;
  type: string;
  mode: Mode;
  limit: number;
  description: string;
  timeMs: number;
  lastOnline: number;
  online: boolean;
  lastUpdate: number;
}

export enum Mode {
  Attack = 'Attack',
  Editor = 'Editor',
  Pvp = 'Pvp',
  Sandbox = 'Sandbox',
  Survival = 'Survival',
}
