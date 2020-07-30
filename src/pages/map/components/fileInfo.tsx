import React from 'react';
import { Card, Col, Grid, Row } from 'antd';

interface MapInfo {
  img: string;
  name: String;
  author: String;
  desc: String;
  rules: {};
}

export default function fileInfo(info: MapInfo) {
  return (
    <Row>
      <Col>
        <img src={info.img} />
      </Col>
      <Col>
        <h4>地图名: {info.name}</h4>
        <span>作者: {info.author}</span>
        <desc>描述: {info.desc}</desc>
        <h6>规则:</h6>
        {Object.entries(info.rules).map(([k, v]) => {
          return k + ': ' + v;
        })}
      </Col>
    </Row>
  );
}
