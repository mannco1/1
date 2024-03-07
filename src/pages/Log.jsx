import React from 'react';
import styled from 'styled-components';
import Header from '../elements/Header.jsx';
import Footer from '../elements/Footer.jsx';
import Validation from '../Validation.jsx';
// import '../css/index.css';
import '../css/Log.css'





function Log() {
  return (
    <div className='box'>
      <Header /> 
      <div className='container'>
      <div className='content__block'>
        <div className='registr'>
          Пройдите регистрацию, пожалуйста
          </div>
        <Validation />
        </div>
        </div>
      <Footer />
    </div>
  );
}

export default Log;
