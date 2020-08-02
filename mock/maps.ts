import { Request, Response } from 'umi';
import { MapInfo } from '@/models/maps';

export default {
  'GET /api/maps/:id/preview': (req: Request, res: Response) => {
    res.sendFile(__dirname + '/preview.png');
  },
  'GET /api/maps/list': (req: Request, res: Response) => {
    res.send(
      +req.params['begin'] > 0
        ? []
        : ([
            {
              name: '测试地图',
              desc: 'DDDDD',
              hash: Date.now().toString(),
              preview: '/api/maps/xxxx/preview',
            },
          ] as MapInfo[]),
    );
  },
  'POST /api/maps/upload': (req: Request, res: Response) => {
    res.send({
      name: '上传地图',
      desc: '这是上传完成的结果',
      hash: Date.now().toString(),
      imgUrl: '/api/maps/xxxx/preview',
    });
  },
  '/api/maps/:id/detail': {
    version: 0,
    build: 104,
    timestamp: 1587024625005,
    timePlayed: 0,
    map: null,
    wave: 1,
    preview: '/api/maps/xxxx/preview',
    rules: {
      waves: true,
      enemyCheat: true,
      reactorExplosions: false,
      unitBuildSpeedMultiplier: 2.5,
      unitHealthMultiplier: 2,
      playerHealthMultiplier: 2,
      blockHealthMultiplier: 1.5,
      playerDamageMultiplier: 8,
      unitDamageMultiplier: 2,
      buildCostMultiplier: 0.5,
      buildSpeedMultiplier: 2,
      dropZoneRadius: 12,
      respawnTime: 6,
      waveSpacing: 600,
      spawns: [
        { type: 'crawler', end: 149, scaling: 0.5 },
        {
          type: 'dagger',
          end: 149,
          scaling: 2,
          effect: 8,
        },
        { type: 'wraith', begin: 99, end: 149, scaling: 1 },
        {
          type: 'wraith',
          begin: 149,
          amount: 50,
        },
        { type: 'dagger', begin: 149, amount: 80, effect: 8 },
        { type: 'crawler', begin: 149, amount: 80 },
      ],
      attackMode: true,
      loadout: [
        { item: 'copper', amount: 1000 },
        { item: 'lead', amount: 1000 },
        {
          item: 'metaglass',
          amount: 100,
        },
        { item: 'graphite', amount: 100 },
        { item: 'titanium', amount: 100 },
        {
          item: 'thorium',
          amount: 100,
        },
        { item: 'silicon', amount: 100 },
      ],
      solarPowerMultiplier: 1.5,
    },
    tags: {
      playtime: '0',
      wavetime: '7200.0',
      saved: '1587024625005',
      name: 'Defendant Force (Attack)',
      author: 'Commanders',
      steamid: '2063002147',
      stats: '{buildingsBuilt:1546,buildingsDeconstructed:200}',
      mapname: 'Editor Playtesting',
      genfilters: '[]',
      build: '104',
      mods: '[]',
      width: '200',
      height: '200',
      wave: '1',
      description:
        'A conflict between both faction.But enemy faction seem have highly resource then us.So we should prepare our resource and force and push back the enemy.',
    },
    mods: [],
  },
};
