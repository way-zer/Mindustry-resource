<script lang="tsx" setup>
useHead({
  title: '关于',
  meta: [
    {name: 'description', content: '像素工厂资源站，关于页面'},
    {name: 'keywords', content: 'Mindustry,像素工厂,资源站,微泽,TinyLake,WayZer'},
  ],
})
</script>
<template>
  <article class="prose m4">
    <h2 class="mt">本资源站由WayZer搭建并运营</h2>
    <strong>欢迎会有兴趣且vue3开发的加入</strong>
    <p>开源仓库(技术栈 Nuxt+TS)：
      <a class="link" href="https://github.com/way-zer/Mindustry-resource">Mindustry-resource</a></p>
    <p>内容均由网友分享添加,与本人无关.如有问题可以邮箱反馈联系</p>
    <p>联系邮箱: me@wayzer.top</p>
    <details>
      <summary>
        资源站目前完全公益制作,如果觉得不错,可以考虑赞助(一杯奶茶)
        <a href="https://afdian.com/@WayZer">爱发电首页</a>
      </summary>
      <img src="~/assets/赞助.png" alt="微信二维码"/>
    </details>
    <h2>其他项目</h2>
    <ul>
      <li>
        <a href="https://github.com/way-zer/ScriptAgent4MindustryExt">服务器插件 - ScriptAgent4Mindustry</a>
      </li>
      <li>
        <a href="https://github.com/TinyLake/MindustryX">增强第三方服务端/客户端 - MindustryX</a>
      </li>
      <li>
        <a href="https://github.com/way-zer/ContentsTweaker">属性修改器Mod - ContentsTweaker</a>
      </li>
    </ul>
  </article>
</template>
