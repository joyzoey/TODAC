import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './QnaStyle.css';
import axios from "axios";
import "./MyPageStyle.css";

const MypageMain = () => {
    const [member, setmember] = useState([]);
    const nav = useNavigate();

    const storedId = sessionStorage.getItem("id");
    const loginType = sessionStorage.getItem("loginType");
    const usercode = sessionStorage.getItem("usercode");

    useEffect(() => {
        getmember();
        console.log("storedId:", storedId, ", usercode:", usercode);
    }, []);

    const getmember = () => {
        const url = "/member/info?userid=" + storedId;
        axios.post(url)
            .then(res => {
                setmember(res.data);
                console.log(res.data);
            })
    }

    const handleLogout = () => {
        let accessToken = "Bearer " + sessionStorage.getItem("accessToken");
        console.log(accessToken);

        if (loginType === "kakao") {
          axios.post(
            "/logout/logoutCallBack", {}
          ).then(res => {
            sessionStorage.clear();
            window.location.href = res.data.url;
          });
        }
    
        else{
            //세션에서 토큰 제거
            sessionStorage.clear();
            //로그인 페이지로 이동
            nav('/login');
        }

    };

    return (

        <div className="mypagemain">
            <div className='mypageheader'>
            <div className='mt-1 fs_14 col_blue2'>
                    <Link to="/user">마이 홈 </Link>
                </div>
                <div className='fs_24 fw_700'>
                    내 정보
                </div>
            </div>
            <div className="profile">
                <img className="profile" alt='' src={member.photo}/>
                <div className='mt_10 fs_20 fw_700'>{member.nickname}</div>
            </div>

            <div className="iconmenu mt-5">
                <div onClick={() => nav('point')} className="col">
                    <img alt="" src={require("../../image/mypageIcon/point.png")}/>
                    <h6>포인트 <b style={{color: "#FF7170"}}>{member.point}</b></h6>
                </div>
                <div onClick={() => nav('myboard')} className="col">
                    <img alt="" src={require("../../image/mypageIcon/board.png")}/>
                    <h6>게시글</h6>
                </div>
                <div onClick={() => nav('donate')} className="col">
                    <img alt="" src={require("../../image/mypageIcon/donation.png")}/>
                    <h6>후원하기</h6>
                </div>
            </div>

            <div className="listmenu fw_600 align-items-center mt_45">
                <div onClick={() => nav('update')}>
                    <img alt="" src={require("../../image/mypageIcon/info.png")}/>
                    <span className='mx-3'>내 정보 관리</span>
                    <img alt="" src={require("../../image/mypageIcon/pointer.png")}/>
                </div>
                <div onClick={() => nav('inquiry')} className='mt-4'>
                    <img alt="" src={require("../../image/mypageIcon/11.png")}/>
                    <span className='mx-3'>1:1 문의</span>
                    <img alt="" src={require("../../image/mypageIcon/pointer.png")}/>

                </div>
                <div onClick={() => nav('faq')} className='mt-4'>
                    <img alt="" src={require("../../image/mypageIcon/faq.png")}/>
                    <span className='mx-3'>도움말</span>
                    <img alt="" src={require("../../image/mypageIcon/pointer.png")}/>
                </div>
            </div>




        </div>

    );
};

export default MypageMain;