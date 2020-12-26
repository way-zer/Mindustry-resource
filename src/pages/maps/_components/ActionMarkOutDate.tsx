import { Modal, Select, Spin, Tooltip } from 'antd';
import React, { ReactElement, useEffect, useState } from 'react';
import { MapDetail } from '@/models/types/MapDetail';
import { fetchMaps, MapInfo } from '@/models/maps';
import { useDebounce } from '@/utils/common';

function SearchModal({ user }: { user: string }) {
  const [state, setState] = useState({
    data: [] as MapInfo[],
    fetching: false,
    value: '',
  });
  const fetchList = useDebounce(async (value: string) => {
    const newData = await fetchMaps(0, '@user:' + user + ' ' + value);
    setState(prevState => ({ ...prevState, fetching: false, data: newData }));
  }, 800);
  useEffect(() => {
    fetchList('');
  }, []);
  return (
    <div>
      <Select
        value={state.value}
        notFoundContent={state.fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={value => {
          setState(prevState => ({ ...prevState, fetching: true }));
          fetchList(value);
        }}
        onSelect={value => {
          setState(prevState => ({ ...prevState, value }));
        }}
        style={{ width: '100%' }}
        autoFocus
        showSearch
      >
        {state.data.map(d => (
          <Select.Option value={d.hash} key={d.hash}>
            {d.name}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
}

export function ActionMarkOutDate({
  detail,
  content,
}: {
  detail: MapDetail;
  content: (onClick: () => void) => ReactElement;
}) {
  return (
    <Tooltip title={'标记重复'} key={'markOutDate'}>
      {content(() => {
        Modal.confirm({
          icon: false,
          title: '请选择地图的最新版本',
          content: <SearchModal user={detail.user} />,
        });
      })}
    </Tooltip>
  );
}
