import { FC, useRef } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import {
    Button,
    Input,
    InputRef,
    message,
    Popover,
    QRCode,
    Space,
    Tooltip,
    Typography,
} from 'antd';
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons';

import useGetPageInfo from '../../../hooks/useGetPageInfo';

import styles from './StatHeader.module.scss';

const StatHeader: FC = () => {
    const nav = useNavigate();
    const { id } = useParams();
    const { title, isPublish } = useGetPageInfo();

    const urlInputRef = useRef<InputRef>(null);
    function copyUrl() {
        const elem = urlInputRef.current;
        if (!elem) return;
        elem.select();
        document.execCommand('copy');
        message.success('链接已复制');
    }
    function getLinkAndQRCodeElem() {
        if (!isPublish) return null;

        const url = `http://localhost:3000/question/${id}`;

        const qrCodeElem = (
            <div style={{ textAlign: 'center' }}>
                <QRCode value={url} size={150} />
            </div>
        );

        return (
            <Space>
                <Input ref={urlInputRef} value={url} style={{ width: '300px' }} />
                <Tooltip title="拷贝链接">
                    <Button icon={<CopyOutlined />} onClick={copyUrl} />
                </Tooltip>
                <Popover content={qrCodeElem}>
                    <Button icon={<QrcodeOutlined />} />
                </Popover>
            </Space>
        );
    }

    return (
        <div className={styles['header-wrapper']}>
            <div className={styles.header}>
                <div className={styles['header-left']}>
                    <Space>
                        <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
                            返回
                        </Button>
                        <Typography.Title>{title}</Typography.Title>
                    </Space>
                </div>
                <div className={styles['header-center']}>{getLinkAndQRCodeElem()}</div>
                <div className={styles['header-right']}>
                    <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
                        编辑问卷
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default StatHeader;
