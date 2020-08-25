import React from "react";
import {history, IRouteComponentProps} from "umi";
import {Col, Modal, Popover, Row, Skeleton, Tooltip} from 'antd';
import {CopyOutlined} from '@ant-design/icons';
import {fetchDetail} from "@/models/maps";
import {copyContent} from "@/utils/common";

export default function DetailModal(props: IRouteComponentProps<{ id: string }>) {
  const id = props.match.params.id
  const detail = fetchDetail(id)

  const {name, author, description, width, height} = detail.tags || {}
  const rules = detail.rules || {}
  return <Modal visible onCancel={() => {
    history.goBack()
  }} cancelText={"关闭"} footer={null} width={"100%"}>
    <Skeleton loading={!detail}>
      <div style={{padding: "16px"}}>
        <Row gutter={32} justify={"center"}>
          <Col md={10} xs={18}>
            <div style={{width: '100%', height: '0', paddingBottom: '100%', position: 'relative'}}>
              <img
                src={detail.preview} alt={'map Preview'}
                style={{
                  objectFit: 'contain',
                  width: '96%',
                  height: '96%',
                  position: 'absolute',
                  left: '2%',
                  top: '2%',
                }}
              />
            </div>
          </Col>
          <Col md={10} sm={20}>
            <h4>地图名: {name}</h4>
            <h5>宽高: {width}x{height}</h5>
            {/*<h5>*/}
            <Tooltip title={'拷贝换图指令'} destroyTooltipOnHide={{keepParent:false}}>
              <Popover
                content={
                  <>
                    <pre>/vote map {detail.hash}</pre>
                    粘贴指令到支持网络换图的服务器使用
                  </>
                }
                trigger={'click'}
                destroyTooltipOnHide={{keepParent:false}}
              >
                <h5 onClick={copyContent.bind(null, () => {
                  return document.getElementsByClassName("ant-popover-inner-content")[0].getElementsByTagName("pre")[0]
                })}>识别码: {detail.hash}<CopyOutlined/></h5>
              </Popover>
            </Tooltip>
            {/*</h5>*/}
            <h5>作者: {author}</h5>
            <h5>描述: {description}</h5>
            <h5>规则:</h5>
            <ul>
              <li>刷怪: {rules.waves ? "开" : "关"} 进攻模式: {rules.attackMode ? "开" : "关"}</li>
              <li>单位血量: {rules.unitHealthMultiplier}</li>
              <li>单位伤害: {rules.unitDamageMultiplier}</li>
              <li>玩家血量: {rules.playerHealthMultiplier}</li>
              <li>玩家伤害: {rules.playerDamageMultiplier}</li>
              <li>建筑血量: {rules.blockHealthMultiplier}</li>
              <li>核心保护: {rules.enemyCoreBuildRadius / 8}</li>
              <li>重生时间: {rules.respawnTime / 60}</li>
              <li>每波间隔: {rules.waveSpacing / 60}</li>
              <li>禁用建筑: {rules.bannedBlocks?.values}</li>
              <li>初始物资: {rules.loadout?.map(d => (`${d.item}:${d.amount} `))}</li>
              <li>太阳能倍数: {rules.solarPowerMultiplier}</li>
            </ul>
            {props.children}
          </Col>
        </Row>
        <p style={{textAlign: "center"}}>可以直接分享该页链接给他人</p>
      </div>
    </Skeleton>
  </Modal>
}
