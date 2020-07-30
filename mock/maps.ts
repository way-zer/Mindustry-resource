import { Request, Response } from 'umi';
import { MapInfo } from '@/models/maps';

export default {
  'GET /api/maps/list': (req: Request, res: Response) => {
    res.send(
      +req.params['begin'] > 0
        ? []
        : ([
            {
              name: '测试地图',
              desc: 'DDDDD',
              hash: Date.now().toString(),
              imgUrl:
                'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
            },
          ] as MapInfo[]),
    );
  },
  'POST /api/maps/upload': (req: Request, res: Response) => {
    res.send({
      name: '上传地图',
      desc: '这是上传完成的结果',
      hash: Date.now().toString(),
      imgUrl:
        'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    });
  },
};
