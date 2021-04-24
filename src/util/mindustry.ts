interface ColorData {
    color: string,
    key: number,
    text: string
}

const colors = {
    '': 'black',

    white: 'black',
    lightgray: '#898989',
    gray: '#7f7f7fff',
    darkgray: '#3f3f3fff',
    black: 'black',
    clear: 'black',

    blue: '#0000ffff',
    navy: '#00007fff',
    royal: '#4169e1ff',
    slate: '#708090ff',
    sky: '#6eafc4',
    cyan: '#00b3b3',
    teal: '#007f7fff',

    green: '#009900',
    acid: '#59b300',
    lime: '#259925',
    forest: '#228b22ff',
    olive: '#6b8e23ff',

    yellow: '#bfbf00',
    gold: '#bf9f00',
    goldenrod: '#daa520ff',
    orange: '#cc8500',

    brown: '#8b4513ff',
    tan: '#d2b48c',
    brick: '#b22222ff',

    red: '#bf0000',
    scarlet: '#ff341cff',
    coral: '#cc653f',
    salmon: '#cc695e',
    pink: '#cc5490',
    magenta: '#7f007fff',

    purple: '#a020f0',
    violet: '#cc70cc',
    maroon: '#b03060ff',

    // alias?
    crimson: '#bf2615', // scarlet

    // special
    accent: '#bf972a',
};

export function colorize(text: string): ColorData[] {
    function colors(str: string): string {
        if (str.match(/#[0-9a-f]{3,8}/i)) return str;
        else {
            // eslint-disable-next-line
            // @ts-ignore
            return colors[str.toLowerCase()];
        }
    }

    let lastColor = 'black';
    const out: ColorData[] = [];
    text.split(/(\[[#0-9a-zA-Z]*])/g).forEach(v => {
        if (v.length == 0) return;
        if (v.startsWith('[') && v.endsWith(']')) {
            const color = colors(v.substring(1, v.length - 1));
            if (color) {
                lastColor = color;
                return;
            }
        }
        out.push({color: lastColor, key: out.length, text: v})
    })
    return out;
}

export const modeMap = {
    Survival: '生存',
    Pvp: 'PvP',
    Attack: '进攻',
    Sandbox: '沙盒',
    Editor: '编辑器',
};

export const modeFilters = Object.keys(modeMap).map(k => ({
    // eslint-disable-next-line
    // @ts-ignore
    text: modeMap[k],
    value: k,
}));
