function end() {
    builder.line("end");
}

function jump(op: Var, line: IntVar) {
    builder.line(`jump ${Var.warp(line)} ${Var.warp(op)}`)
}

function set(v: Var, value: AnyVar) {
    builder.line(`set ${v} ${Var.warp(value)}`);
}

function print(...v: StringVar[]): void {
    v.forEach((it) => {
        builder.line(`print ${Var.warp(it)}`);
    });
}

function printFlush(v: Var): void {
    builder.line(`printFlush ${v}`);
}

function sensor(subject: Var, v: StringVar): Var {
    return expr((it) => `sensor ${it} ${subject} ${v}`);
}

function getLink(i: IntVar): Var {
    return expr((it) => `getlink ${it} ${i}`);
}

function control<T extends keyof ControlOP>(
    type: T,
    ...arg: Parameters<ControlOP[T]>
) {
    builder.line(`control ${type} ${arg.join(" ")}`);
}

function uBind(type: Var) {
    builder.line(`ubind ${type}`);
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
    builder.line(
        `ulocate ${outArg.join(" ")} ${outX} ${outY} ${isFound} ${build}`
    );
    return {outX, outY, isFound, build};
}

function uControl<T extends keyof UControlOP>(
    type: T,
    ...arg: Parameters<UControlOP[T]>
) {
    builder.line(`ucontrol ${type} ${arg.join(" ")}`);
}

interface ControlOP {
    enable(subject: Var, v: BoolVar): void;
}

interface ULocateOP {
    ore(type: Var): void;

    building(group: string, ememy: boolean): void;

    spawn(): void;

    damaged(): void;
}

interface UControlOP {
    flag(v: IntVar): void;

    approach(x: IntVar, y: IntVar, range: IntVar): void;

    itemDrop(building: Var, amount: IntVar): void;

    itemTake(building: Var, type: Var, amount: IntVar): void;
}
