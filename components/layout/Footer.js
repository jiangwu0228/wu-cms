import styled from 'styled-components';

const FooterSection = styled.div`
  background: #000;
  color: #fff;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Footer = () => {
  return (
    <FooterSection>
      Copyright 2021 School CMS. Designed by <a href="http://www.jiangwu.me/">Jiangwu</a>. All rights reserved.
    </FooterSection>
  );
};

export default Footer;
