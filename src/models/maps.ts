import { useCallback, useEffect, useState } from 'react';
import { request } from '@@/plugin-request/request';

export interface MapInfo {
  hash: string;
  name: string;
  desc: string;
  imgUrl: string;
}

function fetchMaps(begin: number): Promise<MapInfo[]> {
  return request('/api/maps/list', {
    params: { begin },
  });
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
