import styled from 'styled-components/native';
import { colors } from '../../themes';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-content: center;
  align-items: center;
  width: 100%;
  bottom: 0;
  background: ${colors.default.primaryColor};
`;

export const TextLoading = styled.Text`
  font-size: 20px;
  text-align: center;
  color: ${colors.default.specialText};
  font-family: 'RobotoSlab-Medium';
`;
