import { useCallback, useEffect, useState } from 'react';
import { request } from '@@/plugin-request/request';
import { MapDetail } from '@/models/types/MapDetail';

export interface MapInfo {
  hash: string;
  name: string;
  desc: string;
  preview: string;
}

function fetchMaps(begin: number): Promise<MapInfo[]> {
  return request('/api/maps/list', {
    params: { begin },
  });
}

export function fetchDetail(id: string): MapDetail {
  const [detail, setDetail] = useState({} as MapDetail);
  useEffect(() => {
    request('/api/maps/' + id + '/detail.json').then((d: MapDetail) => {
      setDetail(d);
    });
  }, [id]);
  return detail;
}

export default function() {
  const [maps, updateMaps] = useState([] as MapInfo[]);
  const [loading, setLoading] = useState(false);

  const pullMore = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    let newMaps = await fetchMaps(maps.length);
    setLoading(false);
    updateMaps(maps.concat(newMaps));
  }, [maps, loading]);
  const uploadFinish = useCallback(
    (response: MapInfo) => {
      updateMaps(maps.concat(response));
      console.log(maps);
    },
    [maps],
  );

  //Run once
  useEffect(() => {
    console.log('Effect');
    pullMore().then();
  }, []);

  return {
    maps,
    pullMore,
    uploadFinish,
    loading,
  };
}
