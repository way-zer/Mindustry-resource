import React from 'react';

export default function() {
  return (
    <div style={{ padding: '0 10%' }}>
      <h2>本资源站由WayZer搭建并运营</h2>
      <p>内容均由网友分享添加,与本人无关.如有问题可以邮箱联系 me@wayzer.top</p>
      <details>
        <summary>
          资源站目前完全公益制作,如果觉得不错,可以考虑<a href={'https://afdian.net/@WayZer'}>赞助</a>
        </summary>
        <img src={'/wechat.png'} alt={'微信二维码'} />
      </details>
      <h2>其他资源</h2>
      <ul>
        <li>
          <a href={'https://git.io/SA4Mindustry'}>服务器基础管理插件</a>
        </li>
      </ul>
    </div>
  );
}
