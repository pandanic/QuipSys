import axios, { ResDataType } from './ajax';

export async function getQuestionStatListService(
    id: string,
    opt: { pageNo: number; pageSize: number },
): Promise<ResDataType> {
    const data = await axios.get(`/api/stat/${id}`, { params: opt });
    return data;
}
