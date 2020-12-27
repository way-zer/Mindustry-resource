import { Modal, Select, Spin, Tooltip } from 'antd';
import React, { ReactElement, useEffect, useState } from 'react';
import { MapDetail } from '@/models/types/MapDetail';
import { editMap, fetchMaps, MapInfo } from '@/models/maps';
import { useDebounce } from '@/utils/common';

function SearchModal({ user, value, setValue }: { user: string; value: string; setValue: (value: string) => void }) {
  const [state, setState] = useState({
    data: [] as MapInfo[],
    fetching: false,
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
        value={value}
        notFoundContent={state.fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={value => {
          setState(prevState => ({ ...prevState, fetching: true }));
          fetchList(value);
        }}
        onSelect={setValue}
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
  const [show, setShow] = useState(false);
  const [value, setValue] = useState('');
  return (
    <Tooltip title={'标记重复'} key={'markOutDate'}>
      <Modal
        title={'请选择地图的最新版本'}
        visible={show}
        onOk={async () => {
          if (value) {
            await editMap(detail.hash, 'markUpdate', value);
            setShow(false);
          }
        }}
        onCancel={() => {
          setValue('');
          setShow(false);
        }}
      >
        <SearchModal user={detail.user} value={value} setValue={setValue} />
      </Modal>
      {content(() => {
        setShow(true);
      })}
    </Tooltip>
  );
}
