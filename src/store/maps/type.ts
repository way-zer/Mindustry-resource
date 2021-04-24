export interface MapInfo {
    id: string;
    latest: string;
    name: string;
    desc: string;
    preview: string;
    tags: string[];
}

export interface MapDetail {
    hash: string;
    thread: string;
    mode: string;
    user?: string;
    preview: string;
    tags: {
        rules: Rules
    } & any;
}

export const gameModes = ['Survive', 'Pvp', 'Attack', 'Sandbox', 'Editor', 'UnKnown']

interface Rules {
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
    effect?: number;
}
