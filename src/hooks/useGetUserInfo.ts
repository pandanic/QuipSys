import { useSelector } from 'react-redux';

import { StateType } from '../store';
import { UserStateType } from '../store/userReducer';

export function useGetUserInfo() {
    const { username, nickname } = useSelector<StateType>((state) => state.user) as UserStateType;
    return { username, nickname };
}
