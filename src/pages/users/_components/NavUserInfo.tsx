import React, { useState } from 'react';
import { useModel } from '@@/plugin-model/useModel';
import { Button } from 'antd';
import { LoginModel } from '@/pages/users/_components/LoginModel';

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
