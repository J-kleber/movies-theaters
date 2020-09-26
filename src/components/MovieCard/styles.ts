import styled, { css } from 'styled-components/native';
import { Dimensions, Animated, StyleSheet } from 'react-native';
import { colors } from '../../themes';

const { width, height } = Dimensions.get('window');

export const Container = styled.View`
  width: ${width * 0.75}px;
`;

export const EmptyContainer = styled.View`
  width: ${(width - width * 0.75) / 2}px;
`;

export const Image = styled.Image`
  width: 100%;
  height: ${width * 0.888}px;
  border-radius: 24px;
  margin-bottom: 10px;
  margin: 0px;
`;

export const Title = styled.Text`
  font-size: 24px;
  margin-top: 10px;
  text-align: center;
  color: ${colors.default.commonText};
  font-family: 'RobotoSlab-Medium';
  ${{
    textShadowColor: colors.default.textShadow,
    textShadowOffset: '1px 2px',
    textShadowRadius: 14,
  }}
`;

export const MovieInfo = styled.View`
  flex: 1;
  flex-direction: row;
  background-color: blue;
`;

export const ContainerItens = styled.View`
  height: 70px;
  width: ${width * 0.25}px;
  flex-direction: column;
  justify-content: flex-end;
  align-content: center;
  align-items: center;
  margin-top: 60px;
`;

export const ContainerItensMiddle = styled.View`
  height: 70px;
  width: ${width * 0.25}px;
  flex-direction: column;
  justify-content: flex-end;
  align-content: center;
  align-items: center;
  margin-top: 30px;
`;

export const ContainerGraph = styled.View`
  height: 74px;
  width: 74px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.default.backgroundProgress};
  border-radius: 37px;
`;

export const TitleItem = styled.Text`
  font-size: 16px;
  text-align: center;
  color: ${colors.default.commonText};
  font-family: 'RobotoSlab-Medium';
  ${{
    textShadowColor: colors.default.textShadow,
    textShadowOffset: '1px 2px',
    textShadowRadius: 14,
  }}
`;

export const TextItem = styled.Text`
  font-size: 12px;
  font-family: 'RobotoSlab-Regular';
  text-align: center;
  color: ${colors.default.commonText};
  ${{
    textShadowColor: colors.default.textShadow,
    textShadowOffset: '1px 2px',
    textShadowRadius: 14,
  }}
`;

export const TextScore = styled.Text`
  position: absolute;
  font-size: 16px;
  text-align: center;
  color: ${colors.default.commonText};
  font-family: 'RobotoSlab-Medium';
  color: ${colors.default.commonText};
  ${{
    textShadowColor: colors.default.textShadow,
    textShadowOffset: '1px 2px',
    textShadowRadius: 5,
  }}
`;

export const styles = StyleSheet.create({
  animatedCard: {
    marginHorizontal: 10,
    alignItems: 'center',
    width: width * 0.71,
  },
});
