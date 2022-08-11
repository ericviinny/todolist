import React from "react";
import { ProgressViewIOSComponent } from "react-native";
import styled from "styled-components/native";

import LogoImage from "../assets/logo.png";

const Header: React.FC = () => {

  return (
    <Container>
      <Logo source={LogoImage} />
    </Container>
  )

}

export default Header;

const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.gray700};
  padding: 40px 0;
  padding-bottom: 70px;

  align-items: center;
`;

const Logo = styled.Image`

`;