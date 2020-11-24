import { useCallback, useEffect, useState } from 'react';
import { request } from '@@/plugin-request/request';
import { requestToken } from '@/utils/reCaptcha';

export interface User {
  name: string;
  role: string;
}
export default function() {
  const [info, updateInfo] = useState(null as User | null);
  useEffect(() => {
    request('/api/users/info', { skipErrorHandler: true }).then(d => {
      updateInfo(d);
    });
  }, []);
  const login = useCallback(async (user, password) => {
    const token = await requestToken('login');
    const info = await request('/api/users/login', {
      method: 'POST',
      data: { user, password, token },
    });
    updateInfo(info as User);
  }, []);
  const logout = useCallback(async () => {
    await request('/api/users/logout');
    updateInfo(null);
  }, []);
  const register = useCallback(async (user, password, code) => {
    const token = await requestToken('register');
    const info = await request('/api/users/register', {
      method: 'POST',
      data: { user, password, code, token },
    });
    updateInfo(info as User);
  }, []);
  return { info, login, logout, register };
}
