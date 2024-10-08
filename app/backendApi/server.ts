export const ServerApi = {
    async list(): Promise<ServerInfo[]> {
        return request('GET', '/api/servers/list')
    },
    async add(address: string) {
        return request('GET', '/api/servers/add?address=' + address)
    },
}

export interface ServerInfo {
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
    ext: {
        score: string,
        sponsor: boolean,
        isHub: boolean,
    }
}

export enum Mode {
    Attack = 'Attack',
    Editor = 'Editor',
    Pvp = 'Pvp',
    Sandbox = 'Sandbox',
    Survival = 'Survival',
}