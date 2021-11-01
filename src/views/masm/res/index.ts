/*ASM逻辑高级编译器
* 增加语法jumpX IfNot IfThen sensor内联
* 类型安全@xxx常量 Sensor.xxx Vars.xxx Units.xxx Items.xxx
*/

/**@param type 单位类型
 * @param one 单控/群控
 */
function bindUnit(type: Var, one: boolean = true): Var {
    const unit = Vars.unit
    let bindStart = 0
    if (one) {//该if为编译时if,根据需要选择一种输出为逻辑中
        ifNot([unit, "notEqual", null], () => {
            bindStart = builder.anchor()
            uBind(type)
            jumpX([sensor(unit, Sensor.flag), "notEqual", 0], bindStart)
            uControl("flag", 1)
        })
    } else {
        bindStart = builder.anchor()
        uBind(type)
        jumpX([sensor(unit, Sensor.flag), "notEqual", 0], bindStart)
    }
    jumpX([sensor(unit, Sensor.dead), "equal", 1], bindStart)
    return unit
}

builder.reset()
const unit = bindUnit(Units.mono)
const factory = variable("dome1")
const item = variable()
withDefault(item, Items.silicon)

print("[gold]单处理器大超速")
print("\n[blue]   By WayZer")
print("\n[green]当前绑定单位: ", unit)
print("\n当前搬运物品: ", item)
printFlush(variable("message1"))

ifThen([sensor(factory, item), "lessThanEq", 8], () => {
    //检测背包中物品数量
    ifThen([sensor(unit, item), "greaterThan", 0], () => {
        //有则放入
        uControl("approach", Vars.thisX, Vars.thisY, 3)
        uControl("itemDrop", factory, 10)
    }).else(() => {
        //无则去核心取
        const {outX, outY, build} = uLocate("building", "core", false)
        uControl("approach", outX, outY, 3)
        uControl("itemDrop", build, 999)
        uControl("itemTake", build, item, 999)
    })
}).else(() => {
    //切换当前搬运物品
    ifThen([item, "equal", Items.silicon], () => {
        set(item, Items.phaseFabric)
    }).else(() => {
        set(item, Items.silicon)
    })
})
output(builder)//如果需要同时生成多个逻辑，可多次reset output