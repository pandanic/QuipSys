import { ComponentInfoType } from '.';

export function getNextSelectedId(id: string, componentList: ComponentInfoType[]) {
    const index = componentList.findIndex((c) => c.fe_id === id);
    if (index < 0) return '';
    let newSelectedId = '';
    const { length } = componentList;
    if (length < 1) {
        newSelectedId = '';
    } else {
        if (index + 1 === length) {
            newSelectedId = componentList[index - 1].fe_id;
        } else {
            newSelectedId = componentList[index + 1].fe_id;
        }
    }
    return newSelectedId;
}
