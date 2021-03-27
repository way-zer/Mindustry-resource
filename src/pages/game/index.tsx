import { Card, Collapse, Empty, List, PageHeader, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import { request } from 'umi';

export default function() {
  const [useMirror, setUseMirror] = useState(false);
  const [releases, setRelease] = useState([] as Release[]);
  const [beReleases, setBeRelease] = useState([] as Release[]);
  useEffect(() => {
    getRelease('Anuken/Mindustry', 5).then(d => setRelease(d));
    getRelease('Anuken/MindustryBuilds', 15).then(d => setBeRelease(d));
  }, []);

  function getDownloadURL(raw: string): string {
    if (!useMirror) return raw;
    return 'https://gh.api.99988866.xyz/' + raw;
  }

  function ReleaseList(prop: { list: Release[] }) {
    const item = (release: Release) => (
      <Collapse.Panel
        key={release.tag_name}
        header={
          <a href={release.html_url} target="_blank">
            {release.tag_name}
          </a>
        }
      >
        <List>
          {release.assets.map(asset => (
            <List.Item key={asset.name} actions={[<a href={getDownloadURL(asset.browser_download_url)}>下载</a>]}>
              <strong>{asset.name}</strong>
              <small>{(asset.size / 1024 / 1024).toFixed(2)} MB</small>
            </List.Item>
          ))}
        </List>
      </Collapse.Panel>
    );
    return (
      <>
        <Collapse accordion defaultActiveKey={1} bordered={false} expandIconPosition={'right'}>
          {prop.list.map(it => item(it))}
        </Collapse>
        {prop.list.length == 0 && <Empty />}
      </>
    );
  }

  return (
    <PageHeader
      title={'游戏下载与安装'}
      extra={[
        <Switch
          checkedChildren={'使用gh.api.99988866.xyz镜像加速'}
          unCheckedChildren={'不使用镜像加速'}
          checked={useMirror}
          onChange={v => {
            setUseMirror(v);
          }}
        />,
      ]}
    >
      <Card title={'正式版'}>
        <ReleaseList list={releases} />
        <details>
          <summary>
            apk等版本请前往
            <a href={'https://anuke.itch.io/mindustry'} target="_blank">
              官方itch下载站
            </a>
          </summary>
          点击Download Now,然后在弹出的对话框内点击No,Thanks即可免费下载
          <br />
          IOS版本仅可以在AppStore付费功能
          <br />
          <b>支持作者,可以选择付费,或者在Steam购买正版</b>
        </details>
      </Card>
      <Card title={'6.0 BE 测试版'}>
        <ReleaseList list={beReleases} />
      </Card>
      <p>所有下载均来自github.com</p>
    </PageHeader>
  );
}

interface Release {
  html_url: string;
  tag_name: string;
  published_at: string;
  assets: { name: string; browser_download_url: string; size: number }[];
}

function getRelease(repo: string, perPage: number): Promise<Release[]> {
  return request('https://api.github.com/repos/' + repo + '/releases?per_page=' + perPage);
}
