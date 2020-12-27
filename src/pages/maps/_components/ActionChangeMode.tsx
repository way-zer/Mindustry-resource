import { Modal, Select, Tooltip } from 'antd';
import React, { ReactElement, useState } from 'react';
import { MapDetail } from '@/models/types/MapDetail';
import { editMap } from '@/models/maps';

const modes = ['Survive', 'Pvp', 'Attack', 'SandBox'];

function SetModal({ value, setValue }: { value: string; setValue: (value: string) => void }) {
  return (
    <div>
      <Select value={value} filterOption={false} onSelect={setValue} style={{ width: '100%' }} autoFocus>
        {modes.map(d => (
          <Select.Option value={d} key={d}>
            {d}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
}

export function ActionChangeMode({
  detail,
  content,
}: {
  detail: MapDetail;
  content: (onClick: () => void) => ReactElement;
}) {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState(detail.mode);
  return (
    <Tooltip title={'修改游戏模式'} key={'changeMode'}>
      <Modal
        title={'请选择地图游戏模式'}
        visible={show}
        onOk={async () => {
          if (value) {
            if (value != detail.mode) {
              await editMap(detail.hash, 'mode', value);
              detail.mode = value;
            }
            setShow(false);
          }
        }}
        onCancel={() => {
          setValue(detail.mode);
          setShow(false);
        }}
      >
        <SetModal value={value} setValue={setValue} />
      </Modal>
      {content(() => {
        setShow(true);
      })}
    </Tooltip>
  );
}
