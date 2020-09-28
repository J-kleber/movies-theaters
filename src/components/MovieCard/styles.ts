import styled from 'styled-components/native';
import { Dimensions, StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { colors } from '../../themes';

const { width } = Dimensions.get('window');

export const Container = styled.View`
  width: ${width * 0.75}px;
`;

export const EmptyContainer = styled.View`
  width: ${(width - width * 0.75) / 2}px;
`;

export const ClickableContainer = styled(RectButton)`
  flex: 1;
  flex-direction: row;
`;

export const Image = styled.Image`
  flex: 1;
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
  flex: 0.6;
  flex-direction: row;
`;

export const ContainerTitle = styled.ScrollView`
  flex: 1;
  max-height: 50px;
  align-content: center;
`;

export const ContainerItens = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
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
  font-size: ${0.035 * width}px;
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
  font-size: ${0.03 * width}px;
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
    flex: 1,
  },
});
