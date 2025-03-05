import { useKeyPress } from 'ahooks';
import { useDispatch } from 'react-redux';

import { ActionCreators } from 'redux-undo';

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
        if (activeElement?.matches('div[role="button"]')) return true;
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

    useKeyPress(
        ['ctrl.z', 'meta.z'],
        () => {
            if (isActiveElementValid()) {
                dispatch(ActionCreators.undo());
            }
        },
        { exactMatch: true },
    );
    useKeyPress(
        ['ctrl.shift.z', 'meta.shift.z'],
        () => {
            if (isActiveElementValid()) {
                dispatch(ActionCreators.redo());
            }
        },
        { exactMatch: true },
    );
}

export default useBindCavarsKeyPress;
