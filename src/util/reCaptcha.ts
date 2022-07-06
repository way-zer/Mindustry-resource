/* eslint-disable */
declare namespace grecaptcha {
  function ready(b: (token: string) => void): void;
  function execute(key: string, body: { action: string }): Promise<string>;
}

const key = '6LfGReEZAAAAAE5Uwrag1tf4HhVMtZtit3-hQwEC';

let loadGRecaptcha: Promise<any>

export async function requestToken(action: string): Promise<string> {
  if (!loadGRecaptcha) {
    const script = document.createElement('script');
    script.src = 'https://www.recaptcha.net/recaptcha/api.js?render=' + key;
    document.body.append(script);
    loadGRecaptcha = new Promise(resolve => (script.onload = ()=>{
      grecaptcha.ready(resolve)
    }));
  }
  await loadGRecaptcha
  return grecaptcha.execute(key, {action});
}
