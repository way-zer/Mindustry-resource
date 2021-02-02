import { useCallback, useEffect, useState } from 'react';
import { request } from '@@/plugin-request/request';
import { MapDetail } from '@/models/types/MapDetail';
import { history } from '@@/core/history';

export interface MapInfo {
  hash: string;
  name: string;
  desc: string;
  tags: string[];
  preview: string;
}

export function editMap(hash: string, action: string, extra: string): Promise<void> {
  return request(`/api/maps/${hash}/edit`, {
    method: 'POST',
    data: { action, extra },
  });
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
  let initSearchKey = decodeURI(history!!.location.search.substring(1));
  if (history!!.location.pathname != '/maps') initSearchKey = '';
  const [searchKey, setSearchKey] = useState(initSearchKey);
  const [maps, updateMaps] = useState([] as MapInfo[]);
  const [noData, setNoData] = useState(false);
  const [loading, setLoading] = useState(false);

  const pullMore = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    let newMaps = await fetchMaps(maps.length, searchKey);
    newMaps = maps.concat(newMaps);
    setNoData(!newMaps.length);
    updateMaps(newMaps);
    setLoading(false);
  }, [maps, loading, searchKey]);

  const uploadFinish = useCallback(
    (response: MapInfo) => {
      updateMaps(maps.concat(response));
      setNoData(false);
      console.log(maps);
    },
    [maps],
  );
  const onSearch = useCallback(
    async (key: string) => {
      setSearchKey(key);
      if (loading) return;
      setLoading(true);
      history!!.push({ search: key });
      let newMaps = await fetchMaps(0, key);
      setNoData(!newMaps.length);
      updateMaps(newMaps);
      setLoading(false);
    },
    [loading],
  );

  return {
    maps,
    searchKey,
    pullMore,
    uploadFinish,
    noData,
    loading,
    onSearch,
  };
}
