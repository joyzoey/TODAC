import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Pagination, InputAdornment, Input, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const MemberManage = () => {
    const nav = useNavigate();
    const [members, setMembers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [membersPerPage] = useState(10);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.post("/admin/memberlist");
                setMembers(response.data.user);
            } catch (error) {
                console.error('회원 목록 불러오기 실패:', error.message);
            }
        };

        fetchMembers();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const clearSearch = () => {
        setSearchTerm('');
        setCurrentPage(1);
    };

    const indexOfLastMember = currentPage * membersPerPage;
    const indexOfFirstMember = indexOfLastMember - membersPerPage;
    const currentMembers = members
        .filter(member => member.nickname.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(indexOfFirstMember, indexOfLastMember);

    const totalPages = Math.ceil(members.length / membersPerPage);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <div className='mx_30'>
            <div className='mt-1 fs_14'>
                <Link to="/admin" className='col_blue2'>관리자 홈 {'>'} </Link>
                <Link to="/admin/MemberManage" className='col_blue2'>회원 관리</Link>
            </div>
            <div className='fs_25 fw_700'>회원 관리</div>
            <br />
            {/* <h6 className='fs_16 fw_700'>회원 검색</h6> */}


            {/* 검색창 */}
            <Input
                type="text"
                placeholder="회원 닉네임을 입력해주세요"
                value={searchTerm}
                onChange={handleSearch}
                className="form-control mb-3 fs_16 fw_900"
                style={{
                    height: '40px',
                    padding: '8px',
                    borderBottom: '1px solid #D4E4F2',
                    borderRadius: '0',
                    border: 'none', // 이 부분을 추가하여 기본 border를 제거
                }}
                endAdornment={
                    <InputAdornment position="end">
                        {searchTerm && (
                            <IconButton onClick={clearSearch}>
                                <ClearIcon />
                            </IconButton>
                        )}
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                }
            />
            <br /><br />
            <h6 className='fs_16 fw_800'>회원 목록</h6>
            <table className='table'>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>닉네임</th>
                        <th>가입 날짜</th>
                    </tr>
                </thead>
                <tbody className='bg_red'>
                    {currentMembers.map((member, index) => (
                        <tr
                            key={index}
                            onClick={() => nav("MemberProfile?usercode=" + member.usercode)}
                            style={{ cursor: 'pointer' }}
                        >
                            <td>{index + 1 + indexOfFirstMember}</td>
                            <td>{member.nickname}</td>
                            <td>{member.registereddate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="justify-content-center d-flex mt-3 qnaPage_btn">
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    style={{
                        '& .Mui-selected': {
                            backgroundColor: 'your_desired_color', // 변경하고자 하는 배경색
                            color: '#D4E4F2', // 변경하고자 하는 텍스트색
                        },
                    }}
                />

            </div>
        </div>
    );
};

export default MemberManage;
