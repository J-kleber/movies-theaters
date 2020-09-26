import styled, { css } from 'styled-components/native';

import { StyleSheet, Platform, Dimensions } from 'react-native';
import { colors } from '../../themes';

const { width, height } = Dimensions.get('window');

const ITEM_SIZE = width * 0.75;

export const ContainerFilter = styled.View`
  margin-top: 20px;
  height: auto;
`;

export const TitleFilter = styled.Text`
  color: ${colors.default.specialText};
  font-size: 18px;
  margin-left: 30px;
  margin-bottom: 16px;
  font-family: 'RobotoSlab-Medium';
  font-weight: bold;
`;
