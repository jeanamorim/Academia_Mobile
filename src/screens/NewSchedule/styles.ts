import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

interface HourProps {
  available: boolean;
  selected: boolean;
}

interface HourTextProps {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
  justify-content:center;
  padding: 24px;
`;

export const Header = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  margin: 44px 0;
`;

export const HeaderTitle = styled.Text`
  color: #00000099;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
`;
export const Calender = styled.View`
  border-color: #99999955;
  border-width: 1px;
  padding: 6px
  border-radius: 10px;
`;
export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.COLORS.TEXT};
  align-self: center;
`;
export const TitleDate = styled.Text`
  font-size: 20px;
  align-self: flex-start;
  padding: 5px;
  color: #999591;
  font-size: 18px;
`;
//TitleDate
export const OpenDatePickerButton = styled(RectButton)`
  height: 46px;
  background: ${({ theme }) => theme.COLORS.PRIMARY};
  border-radius: 10px;
  margin: 0 24px;
  align-items: center;
  justify-content: center;
`;

export const OpenDatePickerButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;
export const CreateAppointmentButton = styled(RectButton)`
  height: 50px;
  width: 100%;
  background: #f4b43d;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
`;

export const CreateAppointmentButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
`;
export const Content = styled.ScrollView``;
export const Schedule = styled.View`
  padding: 20px 10px 16px 10px;
  border-color: #99999955;
  border-width: 1px;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const Section = styled.View`
  margin-bottom: 24px;
  max-height: 250px;
  border-color: #99999955;
  border-width: 1px;
  padding: 10px;
  border-radius: 10px;
`;

export const SectionTitle = styled.Text`
  color: #999591;
  font-size: 18px;
  margin: 0 24px 12px;
`;

export const SectionContent = styled.ScrollView.attrs({
  contentContainerStyle: {paddingHorizontal: 24},
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;

export const Hour = styled(RectButton)<HourProps>`
  padding: 12px;
  background: ${(props: {selected: any}) =>
    props.selected ? '#1300C1' : '#fff'};
  border-radius: 8px;
  margin-right: 8px;
  margin-bottom: 5px;
  justify-content: center;
  align-items: center;
  border-color: ${(props: {selected: any}) => (props.selected ? '#FFF' : '#1300C1')};
  border-width: 1px;
`;

export const HourText = styled.Text<HourTextProps>`
  color: ${(props: {selected: any}) => (props.selected ? '#FFF' : '#1300C1')};
  font-size: 16px;
  font-weight: bold;
`;
export const ContentCard = styled.View`
  border-color: #99999955;
  border-width: 1px;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 30px;
  margin-bottom: 10px;
  padding: 3px;
  justify-content: center;
  align-items: center;
`;
export const Day = styled.Text`
  color: #999591;
  font-size: 18px;
`;
export const Data = styled.Text`
color: ${({ theme }) => theme.COLORS.PRIMARY};
  font-size: 16px;
  font-weight: bold;
  padding: 6px;
`;
