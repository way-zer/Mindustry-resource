/* eslint-disable */
import {ElMessage} from "element-plus";

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
        loadGRecaptcha = new Promise((resolve, reject) => {
            script.onerror = reject
            script.onload = () => {
                grecaptcha.ready(resolve)
            };
        });
    }
    let msg = ElMessage.info({message: "正在加载reCaptcha组件", duration: 0})
    try {
        await loadGRecaptcha
    } catch (e) {
        ElMessage.error({message: "加载reCaptcha组件失败,可能网络不佳\n" + e, duration: 30_000, showClose: true})
    } finally {
        msg.close()
    }
    msg = ElMessage.info({message: "正在获取reCaptcha验证码", duration: 0})
    try {
        return await grecaptcha.execute(key, {action});
    } finally {
        msg.close()
    }
}
