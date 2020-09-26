import styled, { css } from 'styled-components/native';
import { colors } from '../../themes';

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
  position: absolute;
  justify-content: flex-end;
  align-content: center;
  align-items: center;
  width: 100%;
  bottom: 0;
`;

export const TextLoading = styled.Text`
  font-size: 20px;
  text-align: center;
  color: ${colors.default.specialText};
  font-family: 'RobotoSlab-Medium';
`;
