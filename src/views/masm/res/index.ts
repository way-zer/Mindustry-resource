//此处为js函数,可复用于多个逻辑代码
function bindUnit(type: Var, one: boolean = true): Var {
    const unit = variable("@unit")
    const flagS = variable("@flag")
    let bindStart = 0

    function bindU() {
        bindStart = builder.anchor()
        uBind(type)
        jumpX([sensor(unit, flagS), "notEqual", 0], bindStart)
    }

    if (one)
        ifNot([unit, "notEqual", null], () => {
            bindU()
            uControl("flag", 1)
        })
    else bindU()
    jumpX([sensor(unit, variable("@health")), "lessThanEq", 0], bindStart)
    return unit
}

builder.reset()
print("[gold]单处理器大超速\\n")
print("[blue]   By WayZer\\n")
print("[green]当前绑定单位: ")
const unit = bindUnit(variable("@mono"))
print(unit)
const item = variable()

function changeItem() {
    ifThen([item, "equal", variable("@silicon")], () => {
        set(item, variable("@phase-fabric"))
    }).else(() => {
        set(item, variable("@silicon"))
    })
}

ifNot([item, "notEqual", null], () => {
    changeItem()
})
const factory = variable("dome1")
print("\\n当前搬运物品: ", item)
printFlush(variable("message1"))
ifThen([sensor(factory, item), "lessThanEq", 8], () => {
    ifThen([sensor(unit, item), "greaterThan", 0], () => {
        uControl("approach", variable("@thisx"), variable("@thisy"), 3)
        uControl("itemDrop", factory, 10)
    }).else(() => {
        const {outX, outY, build} = uLocate("building", "core", false)
        uControl("approach", outX, outY, 3)
        uControl("itemDrop", build, 999)
        uControl("itemTake", build, item, 999)
    })
}).else(() => {
    changeItem()
})
output(builder.toString())//如果需要同时生成多个逻辑，可多次reset output