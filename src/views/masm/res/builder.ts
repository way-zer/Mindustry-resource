class Var {
    constructor(public raw: string) {
    }

    static warp(v: AnyVar): Var {
        if (v instanceof Var) return v;
        if (v === null) return new Var("null");
        if (typeof v === "string") return new Var(`"${v.replace("\n", "\\n")}"`);
        return new Var(v.toString());
    }

    toString() {
        return this.raw;
    }
}

type StringVar = string | Var;
type Int = number;
type IntVar = Int | Var;
type BoolVar = boolean | Var;
type AnyVar = StringVar | IntVar | BoolVar | null;

class Builder {
    private lines = [] as string[];
    private tempVarId = 0;

    reset() {
        this.lines.length = 0;
        this.tempVarId = 0;
    }

    anchor(): Int {
        return this.lines.length;
    }

    line(code: string) {
        this.lines.push(code);
    }

    lazyLine(): Int {
        const anchor = this.anchor();
        this.line("[toAdd]");
        return anchor;
    }

    setLazy(id: Int) {
        const code = this.lines.pop();
        if (!code) return error("error setLazy:" + id);
        this.lines[id] = code;
    }

    var(name?: string) {
        return new Var(name || `var${this.tempVarId++}`);
    }

    tempVars(num: Int): Var[] {
        const out = [] as Var[];
        for (let index = 0; index < num; index++) {
            out.push(this.var());
        }
        return out;
    }

    toString() {
        if (this.lines[this.lines.length - 1] !== "end") this.lines.push("end");
        return this.lines.join("\n");
    }
}

const builder = new Builder();

declare function error(err: string)

declare function output(out: string)