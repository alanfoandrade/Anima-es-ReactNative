import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
`;
export const Header = styled.View`
  flex: 1;
  background: #2e93e5;
  padding: ${Platform.OS === 'ios' ? 40 : 20}px 15px 0;
`;

export const HeaderText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  background: transparent;
  position: absolute;
  left: 15px;
  bottom: 20px;
`;
