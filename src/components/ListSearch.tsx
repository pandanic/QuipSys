import { Input } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const { Search } = Input;

export const ListSearch: FC = () => {
    const nav = useNavigate();
    const { pathname } = useLocation();
    const [valueState, setValueState] = useState<string>('');
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const keyword = searchParams.get('keyword') || '';
        setValueState(keyword);
    }, [searchParams]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValueState(e.target.value);
    }

    function onSearch(value: string) {
        nav({
            pathname,
            search: value && value.length > 0 ? `keyword=${value}` : '',
        });
    }
    return (
        <>
            <div>
                <Search
                    size="large"
                    allowClear
                    placeholder="请输入关键字搜索"
                    onSearch={onSearch}
                    onChange={handleChange}
                    value={valueState}
                    style={{ width: '300px' }}
                />
            </div>
        </>
    );
};
