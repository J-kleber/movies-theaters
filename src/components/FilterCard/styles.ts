import { RectButton } from 'react-native-gesture-handler';
import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';
import { colors } from '../../themes';

interface IContainerProps {
  active: boolean;
}

export const Container = styled(RectButton)<IContainerProps>`
  margin: 0px 10px;
  padding: 3px 10px;
  border-radius: ${Platform.OS === 'ios' ? 15 : 20}px;

  ${props =>
    props.active &&
    css`
      background-color: ${colors.default.backgroundGenresCardActive};
    `}

  ${props =>
    !props.active &&
    css`
      background-color: ${colors.default.backgroundGenresCard};
    `}
`;

export const Title = styled.Text`
  color: ${colors.default.commonText};
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
`;
