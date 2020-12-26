import React, {PropsWithChildren} from "react";
import {history, useParams} from "umi";
import {Button, Col, Modal, Row, Skeleton, Tooltip} from 'antd';
import {CopyOutlined, DeleteOutlined, DownloadOutlined} from '@ant-design/icons';
import {fetchDetail} from "@/models/maps";
import SquaredImage from "@/components/squaredImage";
import {ActionCopy} from "@/pages/maps/_components/ActionCopy";
import {ActionDownload} from "@/pages/maps/_components/ActionDownload";
import {MapDetail} from "@/models/types/MapDetail";
import {useModel} from "@@/plugin-model/useModel";
import {ActionMarkOutDate} from "@/pages/maps/_components/ActionMarkOutDate";

function DetailActions({detail}: { detail: MapDetail }) {
  const {info} = useModel("user")
  const admin = (info?.name || "UnLogin") == detail.user || info?.role == "Admin" || info?.role == "SuperAdmin" || true
  return <Row gutter={8} justify={"center"}>
    <Col>
      <ActionDownload hash={detail.hash} content={(it) => (
        <Button onClick={it} shape={"circle"} icon={<DownloadOutlined/>}/>
      )}/>
    </Col>
    <Col>
      <ActionCopy hash={detail.hash} content={(it) => (
        <Button onClick={it} shape={"circle"} icon={<CopyOutlined/>}/>
      )}/>
    </Col>
    {admin && <Col>
      <ActionMarkOutDate detail={detail} content={(it) => (
        <Button onClick={it} shape={"circle"} icon={<DeleteOutlined/>}/>
      )}/>
    </Col>}
  </Row>
}

export default function DetailModal(props: PropsWithChildren<any>) {
  const {id} = useParams<{ id: string }>()
  const detail = fetchDetail(id)

  const {name, author, description, width, height, build, mods} = detail.tags || {}
  const rules = detail.rules || {}
  return <Modal visible onCancel={() => {
    history.push("/maps")
  }} cancelText={"关闭"} footer={null} width={"100%"}>
    <Skeleton loading={!detail}>
      <div style={{padding: "16px"}}>
        <Row gutter={32} justify={"center"}>
          <Col md={10} xs={18}>
            <SquaredImage src={detail.preview}/>
            <DetailActions detail={detail}/>
          </Col>
          <Col md={10} sm={20}>
            <h4>地图名: {name}</h4>
            <h5>宽高: {width}x{height}</h5>
            <h5>识别码: {detail.hash}</h5>
            <h5>上传者: <Tooltip title={"点击查看该用户更多地图"}><a
              href={"/maps?" + encodeURI("@user:" + detail.user)}>{detail.user}</a></Tooltip></h5>
            <h5>作者: {author}</h5>
            <h5>描述: {description}</h5>
            <h5>游戏版本: {build}</h5>
            <h5>所需Mod: {mods}</h5>
            <h5>规则:</h5>
            <ul>
              <li>刷怪: {rules.waves ? "开" : "关"} 进攻模式: {rules.attackMode ? "开" : "关"}</li>
              <li>单位血量: {rules.unitHealthMultiplier || "1"}倍</li>
              <li>单位伤害: {rules.unitDamageMultiplier || "1"}倍</li>
              <li>玩家血量: {rules.playerHealthMultiplier || "1"}倍</li>
              <li>玩家伤害: {rules.playerDamageMultiplier || "1"}倍</li>
              <li>建筑血量: {rules.blockHealthMultiplier || "1"}倍</li>
              <li>核心保护: {rules.enemyCoreBuildRadius / 8}格</li>
              <li>重生时间: {rules.respawnTime / 60}秒</li>
              <li>每波间隔: {rules.waveSpacing / 60}秒</li>
              <li>
                <details>
                  <summary>禁用建筑:</summary>
                  <ul>{rules.bannedBlocks?.values?.map(d => (<li key={d}>{d}</li>))}</ul>
                </details>
              </li>
              <li>
                <details>
                  <summary>初始物资:</summary>
                  <ul>{rules.loadout?.map(d => (<li key={d.item}>{d.item}: {d.amount}</li>))}</ul>
                </details>
              </li>
              <li>
                <details>
                  <summary>波次刷怪:</summary>
                  <ul>{rules.spawns?.map((d, i) => (<li
                    key={i}>{d.type}{d.effect ? "(BOSS)" : ""}:从{d.begin || 1}{d.end ? "到" + d.end : "开始"} 每{d.spacing ? 1 + d.spacing : 1}波生成{d.amount || 1}{d.scaling ? `+${d.scaling}T` : ""}只</li>))}</ul>
                </details>
              </li>
              <li>太阳能发电: {rules.solarPowerMultiplier || "1"}倍</li>
            </ul>
            {props.children}
          </Col>
        </Row>
        <p style={{textAlign: "center"}}>
          可以直接分享该页链接给他人<br/>
          <pre>{window.location.toString()}</pre>
        </p>
      </div>
    </Skeleton>
  </Modal>
}
