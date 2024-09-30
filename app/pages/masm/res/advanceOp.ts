type CodeBody = () => void;
type BoolExpOP =
    | "notEqual"
    | "equal"
    | "greaterThan"
    | "greaterThanEq"
    | "lessThan"
    | "lessThanEq"
    | "strictEqual";
type BoolExpr =
    | ["always", BoolVar]
    | [Var, BoolExpOP, AnyVar];
type JumpOp = string

function _wrapBoolExpr(arg: BoolExpr): JumpOp {
    return arg[0] === "always" ? `always ${arg[1]} 0` : `${arg[1]} ${arg[0]} ${arg[2]}`
}

function jumpX(op: BoolExpr, line: IntVar) {
    jump(_wrapBoolExpr(op), line)
}

function ifNot(op: BoolExpr, body: CodeBody) {
    const lazy = builder.lazyLine();
    body();
    jumpX(op, builder.anchor());
    builder.setLazy(lazy);
}

function ifThen(op: BoolExpr, whenTrue: CodeBody) {
    let whenFalse0: CodeBody = () => {
    };
    return {
        else(whenFalse: CodeBody) {
            whenFalse0 = whenFalse;
            this.end();
        },
        end() {
            ifNot(op, whenFalse0);
            const lazy = builder.lazyLine();
            whenTrue();
            jumpX(["always", true], builder.anchor())
            builder.setLazy(lazy);
        }
    };
}

const variable = builder.var.bind(builder) as (name?: string) => Var;

function withDefault(v: Var, value: Var) {
    ifNot([v, "notEqual", null], () => {
        set(v, value)
    })
}

function expr(body: (it: Var) => string | void): Var {
    const v = variable();
    const result = body(v)
    if (typeof result === 'string')
        builder.line(result);
    return v;
}

/**
 * @example loop(i=>lookup('unit',i),type=>{})
 */
function loop(update: (i: IntVar) => Var, body: (v: Var) => void) {
    let i = variable()
    set(i, 0)
    let loop = builder.anchor()
    let out = update(i)
    ifNot([out, "equal", null], () => {
        body(out)
        op(i, i, "add", 1)
        jumpX(["always", true], loop)
    })
}