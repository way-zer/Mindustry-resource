import React, { useState } from 'react';
import { Input, Modal, Spin } from 'antd';
import { request } from '@@/plugin-request/request';

export function AddModel({ close }: { close: (update: boolean) => void }) {
  const [loading, setLoading] = useState(false);
  const inputR = React.createRef<Input>();
  async function check() {
    const value = inputR.current!!.state.value;
    setLoading(true);
    await request('/api/servers/add?address=' + value).finally(() => {
      setLoading(false);
    });
    close(true);
  }
  return (
    <Modal
      title="请输入服务器地址"
      visible
      onCancel={() => {
        close(false);
      }}
      onOk={check}
    >
      <Spin spinning={loading}>
        <Input type={'text'} ref={inputR} onSubmit={check} />
      </Spin>
    </Modal>
  );
}
