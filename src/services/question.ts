import axios, { ResDataType } from './ajax';

type SearchOption = {
    keyword?: string;
    isStar: boolean;
    isDeleted: boolean;
    pageNo: number;
    pageSize: number;
};

export async function getQuestionService(id: string): Promise<ResDataType> {
    const data = await axios.get(`/api/question/${id}`);
    return data;
}

export async function createQuestionService(): Promise<ResDataType> {
    const data = await axios.post('/api/question');
    return data;
}

export async function getQuestionListService(
    params: Partial<SearchOption> = {},
): Promise<ResDataType> {
    const data = await axios.get('/api/question', { params });
    return data;
}

export async function updateQuestionService(
    id: number,
    opt: { [Key: string]: any },
): Promise<ResDataType> {
    const data = await axios.patch(`/api/question/${id}`, opt);
    return data;
}

export async function duplicateQuestionService(id: number): Promise<ResDataType> {
    const data = await axios.post(`/api/question/duplicate/${id}`, {});
    return data;
}

export async function deleteQuestionService(id: number): Promise<ResDataType> {
    const data = await axios.delete(`/api/question/${id}`, {});
    return data;
}
