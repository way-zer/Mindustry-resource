import { useCallback, useEffect, useState } from 'react';
import { request } from '@@/plugin-request/request';
import { MapDetail } from '@/models/types/MapDetail';

export interface MapInfo {
  hash: string;
  name: string;
  desc: string;
  tags: string[];
  preview: string;
}

export function fetchMaps(begin: number, search: string): Promise<MapInfo[]> {
  return request('/api/maps/list', {
    params: { begin, search },
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
  const [searchKey, setSearchKey] = useState('');
  const [maps, updateMaps] = useState([] as MapInfo[]);
  const [loading, setLoading] = useState(false);

  const pullMore = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    let newMaps = await fetchMaps(maps.length, searchKey);
    setLoading(false);
    updateMaps(maps.concat(newMaps));
  }, [maps, loading, searchKey]);

  const uploadFinish = useCallback(
    (response: MapInfo) => {
      updateMaps(maps.concat(response));
      console.log(maps);
    },
    [maps],
  );
  const onSearch = useCallback(
    async (key: string) => {
      setSearchKey(key);
      if (loading) return;
      setLoading(true);
      updateMaps(await fetchMaps(0, key));
      setLoading(false);
    },
    [loading],
  );

  return {
    maps,
    searchKey,
    pullMore,
    uploadFinish,
    loading,
    onSearch,
  };
}
