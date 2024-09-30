//Checked in v134
//内存块 Read Write
//绘图 [ ]Draw [ ]DrawFlush
//文字 Print PrintFlush
//方块 GetLink Control Radar Sensor
//变量 Set Operation Lookup
//扩展 End Jump Wait
//单位 uBind uControl uRadar uLocate
// noinspection JSUnusedGlobalSymbols

//======Flow======
function end() {
    builder.line("end");
}

function jump(op: JumpOp, line: IntVar) {
    builder.line(`jump ${Var.warp(line)} ${op}`)
}

function wait(second: IntVar) {
    builder.line(`wait ${second}`)
}


//======Variable=======
function set(v: Var, value: AnyVar) {
    builder.line(`set ${v} ${Var.warp(value)}`);
}

type OpType = "add" | "sub" | "mul" | "div" | "idiv" | "mod" | "pow" | "equal" | "notEqual"
    | "land" | "lessThan" | "lessThanEq" | "greaterThan" | "greaterThanEq" | "strictEqual"
    | "shl" | "shr" | "or" | "and" | "xor" | "not" | "max" | "min" | "angle" | "len" | "noise" | "abs"
    | "log" | "log10" | "floor" | "ceil" | "sqrt" | "rand" | "sin" | "cos" | "tan" | "asin" | "acos" | "atan"

function op(out: Var, a: Var, op: OpType, b?: AnyVar) {
    builder.line(`op ${op} ${out} ${a} ${b || null}`);
}

function opX(a: Var, op0: OpType, b?: AnyVar): Var {
    return expr(it => op(it, a, op0, b))
}

function lookup(type: 'block' | 'unit' | 'item' | 'liquid', i: IntVar): Var {
    return expr(out => `lookup ${type} ${out} ${i}`)
}


//======Text======
function print(...v: StringVar[]): void {
    v.forEach((it) => {
        builder.line(`print ${Var.warp(it)}`);
    });
}

function printFlush(v: Var): void {
    builder.line(`printFlush ${v}`);
}


//======Block======
function sensor(subject: Var, v: StringVar): Var {
    return expr((it) => `sensor ${it} ${subject} ${v}`);
}

function getLink(i: IntVar): Var {
    return expr((it) => `getlink ${it} ${i}`);
}

function radar(from: Var, condition: RadarCondition[], sort: RadarSort, desc: boolean = true): Var {
    if (condition.length > 3)
        throw "condition can't be more than 3."
    while (condition.length < 3)
        condition.push('any')
    const result = variable()
    builder.line(`uRadar ${condition.join(' ')} ${sort} ${from} ${desc ? 1 : 0} ${result}`)
    return result
}

function control<T extends keyof ControlOP>(block: Var, type: T, ...arg: Parameters<ControlOP[T]>) {
    builder.line(`control ${type} ${block} ${arg.join(" ")}`);
}

interface ControlOP {
    enabled(v: BoolVar): void;

    shoot(x: IntVar, y: IntVar, v: BoolVar): void;

    shootP(target: Var, v: BoolVar): void;

    config(v: Var): void;

    color(v: Var): void;
}


//=======Unit=======
function uBind(type: Var) {
    builder.line(`ubind ${type}`);
}

type RadarCondition = 'player' | 'ally' | 'enemy' | 'attacker' | 'fly' | 'boss' | 'ground' | 'any'
type RadarSort = 'distance' | 'health' | 'shield' | 'armor' | 'maxHealth'

function uRadar(condition: RadarCondition[], sort: RadarSort, desc: boolean = true): Var {
    if (condition.length > 3)
        throw "condition can't be more than 3."
    while (condition.length < 3)
        condition.push('any')
    const result = variable()
    builder.line(`uRadar ${condition.join(' ')} ${sort} 0 ${desc ? 1 : 0} ${result}`)
    return result
}

function uLocate<T extends keyof ULocateOP>(
    type: T,
    ...arg: Parameters<ULocateOP[T]>
) {
    const [outX, outY, isFound, build] = builder.tempVars(4);
    const outArg = [] as any[];
    if (type === "ore") outArg[2] = arg[0];
    else {
        outArg.push(arg[0], arg[1], null);
    }
    builder.line(`ulocate ${outArg.join(" ")} ${outX} ${outY} ${isFound} ${build}`);
    return {outX, outY, isFound, build};
}

interface ULocateOP {
    ore(type: Var): void;

    building(group: string, ememy: boolean): void;

    spawn(): void;

    damaged(): void;
}

function uControl<T extends keyof UControlOP>(
    type: T,
    ...arg: Parameters<UControlOP[T]>
) {
    const type0 = type
        .replace('pathFind', 'pathfind')
        .replace('targetP', 'targetp')
    builder.line(`ucontrol ${type0} ${arg.join(" ")}`);
}

interface UControlOP {
    idle(): void;

    stop(): void;

    move(x: IntVar, y: IntVar): void;

    approach(x: IntVar, y: IntVar, range: IntVar): void;

    boost(v: BoolVar): void;

    pathFind(): void;

    target(x: IntVar, y: IntVar, shoot: BoolVar): void;

    targetP(target: Var, shoot: BoolVar): void;

    itemDrop(building: Var, amount: IntVar): void;

    itemTake(building: Var, type: Var, amount: IntVar): void;

    payDrop(): void;

    payTake(unitOrBuild: Var): void;

    payEnter(): void;

    mine(x: IntVar, y: IntVar): void;

    flag(v: IntVar): void;

    build(x: IntVar, y: IntVar, block: Var, rotation: IntVar, config: Var): void

    getBlock(x: IntVar, y: IntVar, outType: Var, outBuild: Var): void

    within(x: IntVar, y: IntVar, range: IntVar, out: BoolVar): void
}


//======Memory======
function read(cell: Var, pos: IntVar): Var {
    const out = variable()
    builder.line(`read ${out} ${cell} ${pos}`)
    return out
}

function write(cell: Var, pos: IntVar, value: Var) {
    builder.line(`write ${value} ${cell} ${pos}`)
}