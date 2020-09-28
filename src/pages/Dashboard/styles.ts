import styled from 'styled-components/native';

import { colors } from '../../themes';

export const ContainerFilter = styled.View`
  margin-top: 20px;
  height: auto;
`;

export const Title = styled.Text`
  color: ${colors.default.specialText};
  margin-top: 30px;
  font-size: 30px;
  margin-left: 30px;
  font-family: 'RobotoSlab-Medium';
  font-weight: bold;
`;

export const TitleFilter = styled.Text`
  color: ${colors.default.specialText};
  font-size: 18px;
  margin-left: 30px;
  margin-bottom: 16px;
  font-family: 'RobotoSlab-Medium';
  font-weight: bold;
`;
