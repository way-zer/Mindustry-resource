export interface MapInfo {
    id: number;
    latest: string;
    name: string;
    desc: string;
    preview: string;
    tags: string[];
}

export interface MapDetail {
    hash: string;
    thread: number;
    mode: string;
    user?: string;
    preview: string;
    tags: Tags
}

export interface Tags {
    mods: any[];
    name: string;
    wave: number;
    build: number;
    rules: RulesV5 | Rules;
    saved: number;
    stats: any;
    width: number;
    author: string;
    height: number;
    viewpos: string;
    playtime: number;
    wavetime: number;
    description: string;
    saveVersion: number;
    controlledType: string;
    genfilters: any[];
}

export const gameModes = ['Survive', 'Pvp', 'Attack', 'Sandbox', 'Editor', 'UnKnown']

export interface RulesV5 {
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

export interface Rules {
    teams: { [key: string]: Team };
    waves: boolean;
    spawns: Spawn[];
    loadout: Loadout[];
    unitAmmo: boolean;
    waveSpacing: number;
    dropZoneRadius: number;
    damageExplosions: boolean;
    reactorExplosions: boolean;
    buildCostMultiplier: number;
    buildSpeedMultiplier: number;
    enemyCoreBuildRadius: number;
    unitDamageMultiplier: number;
    blockDamageMultiplier: number;
    blockHealthMultiplier: number;
    unitBuildSpeedMultiplier: number;
    deconstructRefundMultiplier: number;
    attackMode: boolean;
    fire: boolean;
    unitCap?: number;
    unitCapVariable?: number;
    bannedBlocks: BannedBlocks;
    solarPowerMultiplier: number;
}

interface BannedBlocks {
    values: string[];
}

interface Loadout {
    item: string;
    amount: number;
}

interface Spawn {
    type: string;
    end?: number;
    amount?: number;
    spacing?: number;
    scaling: number;
    begin?: number;
    effect?: number | string;
    shieldScaling?: number;
    shields?: number;
}

interface Team {
    infiniteAmmo?: boolean;
}