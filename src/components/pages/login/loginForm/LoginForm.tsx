'use client';
import { useState } from "react";
import * as styles from "./LoginForm.css";
import Link from "next/link";
import DefaultTextField from "@/components/common/defaultTextField/DefaultTextField";
import DefaultCheckbox from "@/components/common/defaultCheckbox/DefaultCheckbox";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    autoLogin: false,
  })
  return (
    <div className={styles.loginForm}>
      <span className={styles.lineBox}>
        <em className={styles.line}/>
        또는 이메일로 로그인
        <em className={styles.line}/>
      </span>
      <div className={styles.loginInputContainer}>
        <DefaultTextField
          type='text'
          id='email'
          name='email'
          value={formData.email}
          placeholder='이메일을 입력해주세요'
          onChange={(value) => setFormData({...formData, email: value})}
        />
        <DefaultTextField
          type='text'
          id='password'
          name='password'
          value={formData.password}
          placeholder='비밀번호를 입력해주세요'
          onChange={(value) => setFormData({...formData, password: value})}
        />
      </div>
      <div className={styles.loginControls}>
        <DefaultCheckbox
          id='autoLogin'
          name='autoLogin'
          value={formData.autoLogin}
          label='자동 로그인'
          labelPosition='right'
          onChange={() => setFormData({...formData, autoLogin: !formData.autoLogin})}
        />
        <div className={styles.findAccount}>
          <Link className={styles.findById} href='/findMyId'>아이디 찾기</Link>
          <Link href='/findMyPw'>비밀번호 찾기</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;