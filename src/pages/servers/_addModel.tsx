import React from 'react';
import { Alert, Input, Modal, Spin } from 'antd';
import { request } from '@@/plugin-request/request';

export class AddModel extends React.Component<
  { close: (update: boolean) => void },
  { error?: string; loading: boolean }
> {
  state = { error: undefined, loading: false };
  inputR = React.createRef<Input>();

  render() {
    return (
      <>
        <Modal
          title="请输入服务器地址"
          visible
          onCancel={() => {
            this.props.close(false);
          }}
          onOk={this.check.bind(this)}
        >
          {this.state.error && (
            <Alert message={this.state.error} type={'error'} />
          )}
          <Spin spinning={this.state.loading}>
            <Input
              type={'text'}
              ref={this.inputR}
              onSubmit={this.check.bind(this)}
            />
          </Spin>
        </Modal>
      </>
    );
  }

  check() {
    const value = this.inputR.current!!.state.value;
    this.setState({ loading: true });
    request('/api/servers/add?address=' + value, { skipErrorHandler: true })
      .then(() => {
        this.props.close(true);
      })
      .catch(async e => {
        if (e.response.status == 406)
          this.setState({ error: '连接服务器失败，请检查地址是否正确！' });
        else if (e.response.status == 403)
          this.setState({ error: '错误:' + (await e.response.text()) });
        else {
          this.setState({ error: '未知错误' + e });
        }
        console.error(e);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }
}
