import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import { colors } from '../../themes';

export const Container = styled.View`
  flex: 1;
`;

export const TopContent = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  flex-direction: row;
  position: absolute;
  top: 40px;
  left: 20px;
  z-index: 1;
`;

export const Image = styled.Image`
  flex: 1;
`;

export const BottomContent = styled(LinearGradient)`
  flex: 1;
  margin-top: -40px;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  z-index: 99999;
`;

export const Title = styled.Text`
  margin: 0px 30px;
  margin-top: 10px;
  font-size: 36px;
  color: ${colors.default.commonText};
  font-family: 'RobotoSlab-Medium';
  font-weight: bold;
  ${{
    textShadowColor: colors.default.textShadow,
    textShadowOffset: '1px 2px',
    textShadowRadius: 14,
  }}
`;
export const TagsContainer = styled.View`
  flex-direction: row;
  margin-left: 25px;
  margin-top: 5px;
`;
export const TagItem = styled.Text`
  font-size: 12px;
  min-width: 40px;
  height: 30px;
  margin-left: 5px;
  color: ${colors.default.commonText};
  font-family: 'RobotoSlab-Medium';
  font-weight: bold;

  border-radius: 20px;
  border-color: ${colors.default.backgroundGenresCardActive};
  background-color: ${colors.default.backgroundGenresCardActive};
  padding: 5px;
  text-align: center;
  ${{
    textShadowColor: colors.default.textShadow,
    textShadowOffset: '1px 2px',
    textShadowRadius: 14,
  }}
`;
export const SubTitle = styled.Text`
  font-size: 12px;
  margin: 0px 30px;
  margin-top: 10px;
  color: ${colors.default.commonText};
  font-family: 'RobotoSlab-Medium';
  font-weight: bold;
`;

export const DescriptionContainer = styled.ScrollView`
  flex: 0.8;
  margin: 0px 30px;
  margin-top: 20px;
`;
export const Description = styled.Text`
  font-size: 16px;
  color: ${colors.default.commonText};
  font-family: 'RobotoSlab-Regular';
`;

export const OtherInfosContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

export const ContainerGraph = styled.View`
  height: 110px;
  width: 110px;
  margin-right: 30px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.default.backgroundProgress};
  border-radius: 55px;
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
