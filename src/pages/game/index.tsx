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

  function subCard(title: string, list: Release[]) {
    return (
      <Card title={title}>
        <Collapse
          accordion
          defaultActiveKey={1}
          bordered={false}
          expandIconPosition={'right'}
        >
          {list.map(release => (
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
                  <List.Item
                    key={asset.name}
                    actions={[
                      <a href={getDownloadURL(asset.browser_download_url)}>
                        下载
                      </a>,
                    ]}
                  >
                    <strong>{asset.name}</strong>
                    <small>{(asset.size / 1024 / 1024).toFixed(2)} MB</small>
                  </List.Item>
                ))}
              </List>
            </Collapse.Panel>
          ))}
        </Collapse>
        {list.length == 0 ? <Empty /> : ''}
      </Card>
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
      {subCard('正式版', releases)}
      {subCard('6.0 BE 测试版', beReleases)}
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
  return request(
    'https://api.github.com/repos/' + repo + '/releases?per_page=' + perPage,
  );
}
