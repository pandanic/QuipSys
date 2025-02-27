import { Pagination } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

type PropType = {
    total: number;
};

export const ListPage: FC<PropType> = (prpo: Partial<PropType>) => {
    const { total = 10 } = prpo;
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [searchParams] = useSearchParams();
    useEffect(() => {
        const pageNo = parseInt(searchParams.get('pageNo') || '', 10) || 1;
        const size = parseInt(searchParams.get('pageSize') || '', 10) || 10;
        setCurrent(pageNo);
        setPageSize(size);
    }, [searchParams]);

    const nav = useNavigate();
    const location = useLocation();

    function onChangePageProp(page: number, size: number) {
        searchParams.set('pageNo', page.toString());
        searchParams.set('pageSize', size.toString());
        nav({
            pathname: location.pathname,
            search: searchParams.toString(),
        });
    }

    return (
        <div>
            <Pagination
                total={total}
                current={current}
                pageSize={pageSize}
                onChange={onChangePageProp}
            />
        </div>
    );
};
