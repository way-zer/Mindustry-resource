import React, { useState } from 'react';
import { useModel } from '@@/plugin-model/useModel';
import { Button, Form, Input, Modal } from 'antd';
import { RuleRender } from 'rc-field-form/lib/interface';

const passwordConfirmValidator: RuleRender = ({ getFieldValue }) => ({
  validator(rule, value) {
    if (!value || getFieldValue('password') === value) return Promise.resolve();
    else return Promise.reject('重复密码不匹配,请重新输入');
  },
});

function LoginModel({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: (b: boolean) => void;
}) {
  const { login, register } = useModel('user');
  const [isReg, setReg] = useState(false);
  const [form] = Form.useForm();
  async function handle(data: any) {
    if (isReg) {
      await register(data['user'], data['password'], data['code']);
      setVisible(false);
    } else {
      await login(data['user'], data['password']);
      setVisible(false);
    }
  }
  return (
    <Modal
      footer={null}
      title={isReg ? '注册' : '登录'}
      visible={visible}
      onCancel={() => {
        setVisible(false);
      }}
    >
      <Form onFinish={handle} form={form} labelAlign={'right'}>
        <Form.Item
          label={'用户名'}
          name={'user'}
          rules={[
            { required: true, message: '请输入用户名' },
            {
              pattern: /[-_a-zA-Z0-9]{6,16}/,
              message: '用户名需要6-16位字母数字下划线构成',
            },
          ]}
        >
          <Input autoComplete={'username'} />
        </Form.Item>
        <Form.Item
          label={'密码'}
          name={'password'}
          rules={[
            { required: true, message: '请输入密码' },
            { min: 6, message: '密码需要至少6个字符' },
          ]}
        >
          <Input
            type={'password'}
            autoComplete={!isReg ? 'current-password' : 'new-password'}
          />
        </Form.Item>
        {isReg && (
          <Form.Item
            label={'重复密码'}
            name={'password2'}
            dependencies={['password']}
            rules={[
              { required: true, message: '请输入密码' },
              passwordConfirmValidator,
            ]}
          >
            <Input type={'password'} />
          </Form.Item>
        )}
        {isReg && (
          <Form.Item
            label={'邀请码'}
            name={'code'}
            extra={'邀请码为6位数字,请找任意群内微泽机器人私聊"绑定"获取'}
            rules={[
              { required: true, message: '请输入邀请码' },
              { pattern: /[0-9]{6}/, message: '请输入正确邀请码' },
            ]}
          >
            <Input autoComplete={'new-password'} />
          </Form.Item>
        )}
        <Form.Item>
          <Button type={'primary'} htmlType={'submit'}>
            {isReg ? '注册' : '登录'}
          </Button>
          {isReg ? '已有账号' : '还没账号'},点击
          <a onClick={() => setReg(!isReg)}>{isReg ? '登录' : '注册'}</a>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export function NavUserInfo() {
  const { info, logout } = useModel('user');
  const [loginVisible, setLoginVisible] = useState(false);
  return (
    <div>
      {info ? (
        <div>
          Hi {info.name} <a onClick={logout}>登出</a>
        </div>
      ) : (
        <Button
          ghost
          onClick={() => {
            setLoginVisible(true);
          }}
        >
          登录
        </Button>
      )}
      <LoginModel visible={loginVisible} setVisible={setLoginVisible} />
    </div>
  );
}
export function MenuUserInfo() {
  const { info, logout } = useModel('user');
  const [loginVisible, setLoginVisible] = useState(false);
  return (
    <div>
      {info ? (
        <div>
          Hi {info.name} <a onClick={logout}>登出</a>
        </div>
      ) : (
        <a
          onClick={() => {
            setLoginVisible(true);
          }}
        >
          登录
        </a>
      )}
      <LoginModel visible={loginVisible} setVisible={setLoginVisible} />
    </div>
  );
}
