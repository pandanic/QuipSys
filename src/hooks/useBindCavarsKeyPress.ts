import { useKeyPress } from 'ahooks';
import { useDispatch } from 'react-redux';

import {
    copyComponent,
    pastedComponent,
    removeSelectedComponent,
    selectNextComponent,
    selectPrevComponent,
} from '../store/qustionComponentReducer';

function useBindCavarsKeyPress() {
    const dispatch = useDispatch();

    function isActiveElementValid() {
        const { activeElement } = document;
        if (activeElement === document.body) return true;

        return false;
    }

    useKeyPress(['backspace', 'delete'], () => {
        if (isActiveElementValid()) {
            dispatch(removeSelectedComponent());
        }
    });

    useKeyPress(['ctrl.c', 'meta.c'], () => {
        if (isActiveElementValid()) {
            dispatch(copyComponent());
        }
    });

    useKeyPress(['ctrl.v', 'meta.v'], () => {
        if (isActiveElementValid()) {
            dispatch(pastedComponent());
        }
    });
    useKeyPress(['ctrl.v', 'meta.v'], () => {
        if (isActiveElementValid()) {
            dispatch(pastedComponent());
        }
    });
    useKeyPress(['uparrow'], () => {
        if (isActiveElementValid()) {
            dispatch(selectPrevComponent());
        }
    });
    useKeyPress(['downarrow'], () => {
        if (isActiveElementValid()) {
            dispatch(selectNextComponent());
        }
    });
}

export default useBindCavarsKeyPress;
