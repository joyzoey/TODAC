import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PageHeader from '../PageHeader';
import CounselorOptions from './counselor/CounselorOptions';
import './counselor/CounselorStyle.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import LogNavigationButton from './counselor/LogNavigationButton';
import withReactContent from 'sweetalert2-react-content';

const ReactSwal = withReactContent(Swal);

const ChatMain = () => {
    const [counselorList, setCounselorList] = useState([]);

    const nav = useNavigate();

    const CURRENT_ROUTES = [
        { name: 'TODAC 채팅', url: '' }
    ];

    const PAGE_TITLE = '상담사 선택';

    // 나의 상담 기록 이동 버튼
    const handleLogNavClick = () => {
        nav("loglist");
    }

    const handleCounselClick = (data) => {
        ReactSwal.fire({
            icon: 'info',
            html: (<div>
                <span className='col_red fs_20 fw_600'>{data.name}</span> 상담사와<br />상담을 시작하시겠습니까?
            </div>),
            confirmButtonText: '네',
            confirmButtonColor: '#FF7170',
            showCancelButton: true,
            cancelButtonText: '아니오',
            cancelButtonColor: '#9396A6'
        }).then(res => {
            if (res.isConfirmed) {
                nav('counsel?counselorcode=' + data.counselorcode)
            }
        })
    }

    useEffect(() => {
        if (sessionStorage.getItem("usercode"))
            axios.get('/counselor/mylist?usercode=' + sessionStorage.getItem("usercode"))
                .then((res) => {
                    setCounselorList(res.data);
                })
    }, [])

    return (
        <div className='counselormain'>
            <LogNavigationButton handleClick={handleLogNavClick} />
            <div className='mx_30'>
                <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />
            </div>
            <CounselorOptions info={counselorList} handleCounselClick={handleCounselClick} />
        </div>
    );
};

export default ChatMain;