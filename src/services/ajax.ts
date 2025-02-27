import { message } from 'antd';
import axios from 'axios';

const instance = axios.create({
    timeout: 10 * 10000,
});

instance.interceptors.response.use((res) => {
    const resData = (res.data || {}) as ResType;
    const { success, data, msg } = resData;
    if (!success) {
        if (msg) {
            message.error(msg);
        }
        throw new Error(msg);
    }

    return data as any;
});

export default instance;

export type ResType = {
    success: boolean;
    code: number;
    status: number;
    data?: ResDataType;
    msg?: string;
};

export type ResDataType = {
    [key: string]: any;
};
