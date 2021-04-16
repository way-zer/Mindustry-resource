export interface MapDetail {
  hash: string;
  thread: string;
  mode: string;
  user?: string;
  preview: string;
  tags: { [key: string]: any; rules: Rules };
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
  amount?: number;
  spacing?: number;
  scaling: number;
  begin?: number;
  effect?: number;
}
