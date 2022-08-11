import { StatusBar } from 'expo-status-bar';
import styled, { ThemeProvider } from 'styled-components/native';
import Home from './src/screens';
import theme from './src/styles/theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <StatusBar style='inverted' />
        <Home />
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.View`
  flex: 1;
  padding-top: 30px;

  background-color: ${({ theme }) => theme.colors.gray700};
`;
