import {Col, Row, Popover, Modal} from "antd";
import {IRouteComponentProps} from "umi"
import React from "react";
import {getInfo, getPreviewSrc} from "@/pages/map/_service";
import {MapInfo} from "@/pages/map/_type";

export default class UploadInfo extends React.Component<IRouteComponentProps<{ id: string }>, { fullImg:boolean,previewSrc: string, info: MapInfo }> {
  state = {fullImg:false,previewSrc: "", info: {tags: {}, rules: {}} as MapInfo}

  componentDidMount() {
    const md5 = this.props.match.params.id
    this.setState({previewSrc: getPreviewSrc(md5)})
    getInfo(md5).then((d: MapInfo) => {
      Object.keys(d.tags).forEach(k => {
        d.tags[k] = (d.tags[k] as any).value
      })
      // debugger;
      this.setState({info: d})
    })
  }

  render() {
    const {name, author, description,width,height} = this.state.info.tags
    const rules = this.state.info.rules
    return (
      <div style={{padding: "16px"}}>
        <Row  gutter={32} justify={"center"}>
          <Col md={10} xs={18}>
            <Modal footer={null} title={null} visible={this.state.fullImg} onCancel={()=>{this.setState({fullImg:false})}}>
              <img src={this.state.previewSrc} alt={"Preview"} width={"100%"}/>
            </Modal>
            <div style={{width: "100%", height: "0", paddingBottom: "100%"}} onClick={()=>{this.setState({fullImg:true})}}>
              <img src={this.state.previewSrc} alt={"Preview"}
                   style={{objectFit: "cover",width: "96%",height:"96%",position:"absolute",left:"2%",top:"2%"}}/>
            </div>
          </Col>
          <Col md={10} sm={20}>
            <h4>地图名: {name}</h4>
            <h5>宽高: {width}x{height}</h5>
            <h5>识别码: {this.props.match.params.id}</h5>
            <h5>作者: {author}</h5>
            <h5>描述: {description}</h5>
            <h5>规则:</h5>
            <ul>
              <li>刷怪: {rules.waves?"开":"关"} 进攻模式: {rules.attackMode?"开":"关"}</li>
              <li>单位血量: {rules.unitHealthMultiplier}</li>
              <li>单位伤害: {rules.unitDamageMultiplier}</li>
              <li>玩家血量: {rules.playerHealthMultiplier}</li>
              <li>玩家伤害: {rules.playerDamageMultiplier}</li>
              <li>建筑血量: {rules.blockHealthMultiplier}</li>
              <li>核心保护: {rules.enemyCoreBuildRadius/8}</li>
              <li>重生时间: {rules.respawnTime/60}</li>
              <li>每波间隔: {rules.waveSpacing/60}</li>
              <li>禁用建筑: {rules.bannedBlocks?.values}</li>
              <li>初始物资: {rules.loadout?.map(d=>(`${d.item}:${d.amount} `))}</li>
              <li>太阳能倍数: {rules.solarPowerMultiplier}</li>
            </ul>
          </Col>
        </Row>
        <h3 style={{textAlign:"center"}}>自动审核正在开发中,将该页面地址发送到群里进行手动审核</h3>
      </div>
    );
  }
}
