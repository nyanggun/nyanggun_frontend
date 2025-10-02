import React from 'react';
import footerLogo from '/src/assets/logo.svg';
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-custom">
      <div className="footer-content">
        
        {/* 로고 영역 */}
        <div className="footer-logo-area">
          
          <img 
            src={footerLogo} 
            alt="한국문화사냥꾼 로고" 
            className="footer-logo"
          />
        </div>

        {/* 연락처 및 정보 영역 */}
        <div className="footer-info">
          <p>제작 | 팀 @Bean쥐팥쥐</p>
          <p>연락처 | 010-1234-5678</p>
          <p>1:1 문의 | koreaculturehunters@gmail.com</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;