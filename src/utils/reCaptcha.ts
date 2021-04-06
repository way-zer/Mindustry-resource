declare namespace grecaptcha {
  function ready(b: (token: string) => void): void;
  function execute(key: string, body: { action: string }): Promise<string>;
}

const key = '6LfGReEZAAAAAE5Uwrag1tf4HhVMtZtit3-hQwEC';

export async function requestToken(action: string): Promise<String> {
  // @ts-ignore
  if (!window['grecaptcha']) {
    const script = document.createElement('script');
    script.src = 'https://www.recaptcha.net/recaptcha/api.js?render=' + key;
    document.body.append(script);
    await new Promise(resolve => (script.onload = resolve));
  }
  await new Promise(resolve => grecaptcha.ready(resolve));
  return grecaptcha.execute(key, { action });
}
