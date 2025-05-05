import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./index.module.css";
import { useLazyCurrentQuery, useLoginMutation } from "../../app/userApi";
import { useNavigate } from "react-router-dom";

interface LoginData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: ""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const [login] = useLoginMutation()
  const navigate = useNavigate()
  // const [triggerCurrentQuery] = useLazyCurrentQuery()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login Data:", loginData);
    try {
        await login(loginData).unwrap()
        // await triggerCurrentQuery()
        navigate("/")
      } catch (err) {
        console.log(err);
      }
  };

  const handleRegister = () => {
    navigate('/register')
  }

  return (
    <div className={styles.formWrapper}>
      <div className={styles.formContainer}>
        <h2 className={styles.header}>Авторизация</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <button type="submit" className={styles.button}>Войти</button>
          </div>
        </form>
        <button type="button" className={styles.buttonAlt} onClick={handleRegister}>Зарегистрироваться</button>
        <button type="button" className={styles.buttonAlt} onClick={() => navigate('/')}>Главная</button>
      </div>
    </div>
  );
};

export default LoginForm;
