type CodeBody = () => void;
type boolExpOP =
    | "notEqual"
    | "equal"
    | "greaterThan"
    | "greaterThanEq"
    | "lessThan"
    | "lessThanEq"
    | "strictEqual";
type BoolExpr =
    | ["always", BoolVar]
    | [Var, boolExpOP, AnyVar];

function _wrapBoolExpr(arg: BoolExpr): Var {
    return new Var(
        arg[0] === "always" ? `always ${arg[1]} 0` : `${arg[1]} ${arg[0]} ${arg[2]}`
    );
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

function expr(body: (it: Var) => string): Var {
    const v = variable();
    builder.line(body(v));
    return v;
}
