import { ComponentInfoType, QuestionComponentStateType } from '.';

export function getNextSelectedId(id: string, componentList: ComponentInfoType[]) {
    const visableList = componentList.filter((c) => !c.isHidden);
    const index = visableList.findIndex((c) => c.fe_id === id);
    if (index < 0) return '';
    let newSelectedId = '';
    const { length } = visableList;
    if (length <= 1) {
        newSelectedId = '';
    } else {
        if (index + 1 === length) {
            newSelectedId = visableList[index - 1].fe_id;
        } else {
            newSelectedId = visableList[index + 1].fe_id;
        }
    }
    return newSelectedId;
}

export function insertNewComponent(draft: QuestionComponentStateType, newComp: ComponentInfoType) {
    const { selectedId, componentList } = draft;
    const index = componentList.findIndex((c) => c.fe_id === selectedId);
    if (index < 0) {
        draft.componentList.push(newComp);
    } else {
        draft.componentList.splice(index + 1, 0, newComp);
    }
    draft.selectedId = newComp.fe_id;
}
