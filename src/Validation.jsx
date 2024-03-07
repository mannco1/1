import React, { useState } from 'react';
import axios from 'axios';

const Validation = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isRegistration, setIsRegistration] = useState(false);
  const [message, setMessage] = useState('');

  const toggleMode = () => {
    setIsRegistration(!isRegistration);
    setEmailError('');
    setPasswordError('');
    setMessage(''); // Сброс сообщений при переключении режима
  };

  const validateEmail = async (email) => {
    const isValidFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValidFormat) {
      setEmailError('Некорректный формат email');
      return false;
    }

    
    try {
      const response = await axios.get(`http://localhost:3001/users?email=${email}`);
      if (response.data.length > 0) {
        setEmailError('Этот email уже используется');
        return false;
      }
      setEmailError('');
      return true;
    } catch (error) {
      console.error('Ошибка при проверке уникальности email:', error);
      return false;
    }
  };

  const validatePassword = (password) => {
    const isValid = password.length >= 8;

    if (!isValid) {
      setPasswordError('Пароль должен содержать не менее 8 символов');
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmailValid = await validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isRegistration) {
      if (isEmailValid && isPasswordValid) {
        try {
          const response = await axios.post('http://localhost:3001/users', { email, password });
          setMessage('Регистрация успешна: ' + response.data.email);
          setEmail('');
          setPassword('');
        } catch (error) {
          console.error('Ошибка при регистрации:', error);
        }
      } else {
        setMessage('Данные не валидны. Пожалуйста, исправьте ошибки.');
      }
    } else {
      try {
        const response = await axios.get(`http://localhost:3001/users?email=${email}`);
        const user = response.data[0];

        if (user && user.password === password) {
          setMessage('Вход успешен: ' + user.email);
        } else {
          setMessage('Неверный email или пароль');
        }

        setEmail('');
        setPassword('');
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    }
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => validateEmail(email)}
          />
          {emailError && <span style={{ color: 'red' }}>{emailError}</span>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => validatePassword(password)}
          />
          {passwordError && <span style={{ color: 'red' }}>{passwordError}</span>}
        </div>
        <div>
          <button type="submit">{isRegistration ? 'Зарегистрироваться' : 'Войти'}</button>
        </div>
      </form>
      <p>
        {isRegistration
          ? 'Уже есть аккаунт?'
          : 'Нет аккаунта? Пройдите регистрацию.'}
        <button onClick={toggleMode}>
          {isRegistration ? 'Войти' : 'Зарегистрироваться'}
        </button>
      </p>
    </div>
  );
};

export default Validation;