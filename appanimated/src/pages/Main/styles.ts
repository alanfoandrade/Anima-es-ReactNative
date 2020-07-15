import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
`;
export const Header = styled.View`
  height: 200px;
  background: #2e93e5;
  padding: ${Platform.OS === 'ios' ? 40 : 20}px 15px 0;
`;
export const HeaderImage = styled.Image``;

export const HeaderText = styled.Text`
  font-size: 24px;
  font-weight: 900;
  color: #fff;
  background: transparent;
  position: absolute;
  left: 15px;
  bottom: 20px;
`;
