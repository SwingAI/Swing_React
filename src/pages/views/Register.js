import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../_actions/user_action';

import '../../components/Register.css'

import Terms from '../../components/Terms';
import TeamSelect from '../../components/TeamSelect';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 초기값
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [team, setTeam] = useState('');

  // 오류메세지 상태
  const [emailMessage, setEmailMessage] = useState("이메일 형식에 맞게 입력해주세요.");
  const [idMessage, setIdMessage] = useState("5~20자의 영문 소문자, 숫자를 사용하세요.");
  const [passwordMessage, setPasswordMessage] = useState("8~20자의 영문 대·소문자, 숫자, 특수문자를 사용하세요.");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("비밀번호를 다시 입력해주세요.");
  const [nicknameMessage, setNicknameMessage] = useState("2~16자의 한글, 영문 대·소문자, 숫자를 사용하세요.");
  const [teamMessage, setTeamMessage] = useState("선호하는 구단을 선택해주세요.");

  // 유효성 검사
  const [isEmail, setIsEmail] = useState(false);
  const [isId, setIsId] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isNickname, setIsNickname] = useState(false);
  const [isTeam, setIsTeam] = useState(false);

  const onChangeEmail = (e) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
    const emailRegExp = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
 
    if (!emailRegExp.test(currentEmail)) {
      setEmailMessage("이메일 형식에 맞게 입력해주세요.");
      setIsEmail(false);
    } else {
      setEmailMessage("사용 가능한 이메일 입니다.");
      setIsEmail(true);
    }
  };
  const onChangeId = (e) => {
    const currentId = e.target.value;
    setId(currentId);
    const idRegExp = /^[a-z0-9]{5,20}$/;
 
    if (!idRegExp.test(currentId)) {
      setIdMessage("5~20자의 영문 소문자, 숫자를 사용하세요.");
      setIsId(false);
    } else {
      setIdMessage("사용 가능한 아이디 입니다.");
      setIsId(true);
    }
  };
  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;

    if (!passwordRegExp.test(currentPassword)) {
      setPasswordMessage("8~20자의 영문 대·소문자, 숫자, 특수문자를 사용하세요.");
      setIsPassword(false);
    } else {
      setPasswordMessage("사용 가능한 비밀번호 입니다.");
      setIsPassword(true);
    }
  };
  const onChangePasswordConfirm = (e) => {
    const currentPasswordConfirm = e.target.value;
    setPasswordConfirm(currentPasswordConfirm);

    if (password !== currentPasswordConfirm) {
      setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.");
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage("비밀번호가 일치합니다.");
      setIsPasswordConfirm(true);
    }
  };
  const onChangeNickname = (e) => {
    const currentNickname = e.target.value;
    setNickname(currentNickname);
    const nicknameRegExp = /^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{2,16}$/;
 
    if (!nicknameRegExp.test(currentNickname)) {
      setNicknameMessage("2~16자의 한글, 영문 대·소문자, 숫자를 사용하세요.");
      setIsNickname(false);
    } else {
      setNicknameMessage("사용 가능한 닉네임 입니다.");
      setIsNickname(true);
    }
  };
  const onChangeTeam = (e) => {
    setTeam(e);
    
    console.log(e, team)

    if (!team) {
      setTeamMessage("선호하는 구단을 선택해주세요.");
      setIsTeam(false);
    } else {
      setTeamMessage(team);
      setIsTeam(true);
    }
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      email: email,
      id: id,
      password: password,
      nickname: nickname,
      team: team,
      role: 0,
      prediction: 0,
      correctPrediction: 0,
      token: "",
      tokenExp: 0
    }

    dispatch(registerUser(body))
      .then(response => {
        if(response.payload.success){
          alert('회원가입이 완료되었습니다!')
          navigate('/login', true);
        } else {
          alert('회원가입을 실패했습니다. 다시 진행해주세요.')
          console.log(response.payload.success)
        }
      })
  };

    return (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="mx-auto w-auto text-center text-4xl font-extrabold text-blue-500">Swing</div>
          <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            회원가입
          </h2>
        </div>
  
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={onSubmitHandler}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                이메일
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={onChangeEmail}
                  required
                  className="block w-full rounded-md border-2 ps-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="mt-2 ms-1 text-start text-sm text-gray-500">
                {emailMessage}
              </p>
            </div>

            <div>
              <label htmlFor="id" className="block text-sm font-medium leading-6 text-gray-900">
                아이디
              </label>
              <div className="mt-2">
                <input
                  id="id"
                  name="id"
                  type="id"
                  autoComplete="on"
                  onChange={onChangeId}
                  required
                  className="block w-full rounded-md border-2 ps-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="mt-2 ms-1 text-start text-sm text-gray-500">
                {idMessage}
              </p>
            </div>
  
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  비밀번호
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={onChangePassword}
                  required
                  className="block w-full rounded-md border-2 ps-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="mt-2 ms-1 text-start text-sm text-gray-500">
                {passwordMessage}
              </p>
              <div className="mt-1">
                <input
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type="password"
                  autoComplete="current-password"
                  onChange={onChangePasswordConfirm}
                  required
                  className="block w-full rounded-md border-2 ps-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="mt-2 ms-1 text-start text-sm text-gray-500">
                {passwordConfirmMessage}
              </p>
            </div>

            <div>
              <label htmlFor="nickname" className="block text-sm font-medium leading-6 text-gray-900">
                닉네임
              </label>
              <div className="mt-2">
                <input
                  id="nickname"
                  name="nickname"
                  type="nickname"
                  autoComplete="on"
                  onChange={onChangeNickname}
                  required
                  className="block w-full rounded-md border-2 ps-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="mt-2 ms-1 text-start text-sm text-gray-500">
                {nicknameMessage}
              </p>
            </div>

            <div className='RteamLogo'>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                선호 구단
              </label>
              <TeamSelect onChange={(e) => onChangeTeam(e)}/>
              <p className="mt-2 ms-1 text-start text-sm text-gray-500">
                {teamMessage}
              </p>
            </div>

            <div>
              <textarea className='w-full' rows="10" value={Terms()}/>
            </div>
  
            <div>
              <button
                type="submit"
                className="mt-5 flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                회원가입
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

export default Register;