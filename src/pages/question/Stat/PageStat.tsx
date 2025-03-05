import { useRequest } from 'ahooks';
import { FC, useState } from 'react';

import { useParams } from 'react-router-dom';

import { Pagination, Spin, Table, Typography } from 'antd';

import { getQuestionStatListService } from '../../../services/stat';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';

type Props = {
    selectId: string;
    setSelectId: (id: string) => void;
    setSelectType: (type: string) => void;
};

const PageStat: FC<Props> = (props: Props) => {
    const { selectId, setSelectId, setSelectType } = props;
    const { id = '' } = useParams();
    const [total, setTotal] = useState(0);
    const [list, setList] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const { loading } = useRequest(
        async () => {
            const res = await getQuestionStatListService(id, { pageNo, pageSize });

            return res;
        },
        {
            refreshDeps: [pageNo, pageSize, id],
            onSuccess: (res) => {
                const { total: resTotal, list: resList } = res;
                setTotal(resTotal);
                setList(resList);
            },
        },
    );

    const { componentList } = useGetComponentInfo();
    const dataSource = list.map((c: any) => ({ ...c, key: c._id }));
    const columns = componentList.map((item) => {
        const { fe_id: itemId, title, props: itemProps = {}, type } = item;
        const colTitile = itemProps.title || title;
        return {
            dataIndex: itemId,
            title: (
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        setSelectId(itemId);
                        setSelectType(type);
                    }}
                >
                    <span style={{ color: itemId === selectId ? '#1890ff' : 'inherit' }}>
                        {colTitile}
                    </span>
                </div>
            ),
        };
    });

    const tableElme = (
        <>
            <Table columns={columns} dataSource={dataSource} pagination={false} />
            <div style={{ marginTop: '18px' }}>
                <Pagination
                    align="center"
                    total={total}
                    pageSize={pageSize}
                    current={pageNo}
                    onChange={(page) => {
                        setPageNo(page);
                    }}
                    onShowSizeChange={(page, size) => {
                        setPageNo(page);
                        setPageSize(size);
                    }}
                />
            </div>
        </>
    );

    return (
        <div>
            <Typography.Title level={3}>答卷数量:{!loading && total}</Typography.Title>
            {loading && (
                <div style={{ textAlign: 'center' }}>
                    <Spin />
                </div>
            )}
            {!loading && tableElme}
        </div>
    );
};
export default PageStat;
