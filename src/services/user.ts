import axios, { ResDataType } from './ajax';

export async function getUserService(): Promise<ResDataType> {
    const data = await axios.get(`/api/user/info`);
    return data;
}

export async function registerUserService(
    username: string,
    password: string,
): Promise<ResDataType> {
    const data = await axios.post('/api/user/register', { username, password });
    return data;
}

export async function loginUserService(username: string, password: string): Promise<ResDataType> {
    const data = await axios.post('/api/user/login', { username, password });
    return data;
}
