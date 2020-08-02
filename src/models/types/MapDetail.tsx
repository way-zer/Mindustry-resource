export interface MapDetail {
  version: number;
  build: number;
  timestamp: number;
  timePlayed: number;
  map: null;
  wave: number;
  rules: Rules;
  tags: { [key: string]: string };
  mods: any[];
  preview: string;
  hash: string;
}

export interface Rules {
  waves: boolean;
  unitHealthMultiplier: number;
  playerHealthMultiplier: number;
  blockHealthMultiplier: number;
  playerDamageMultiplier: number;
  unitDamageMultiplier: number;
  enemyCoreBuildRadius: number;
  dropZoneRadius: number;
  respawnTime: number;
  waveSpacing: number;
  spawns: Spawn[];
  attackMode: boolean;
  loadout: Loadout[];
  bannedBlocks: BannedBlocks;
  solarPowerMultiplier: number;
}

export interface BannedBlocks {
  values: string[];
}

export interface Loadout {
  item: string;
  amount: number;
}

export interface Spawn {
  type: string;
  end?: number;
  scaling: number;
  begin?: number;
  effect?: number;
}
