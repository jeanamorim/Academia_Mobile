import { Pressable } from 'react-native';
import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native'

export type OrderStyleProps = {
  status: 'open' | 'closed';
};

export const Container = styled(Pressable)`
  width: 100%;
  height: 90px;
  flex-direction: row;
  overflow: hidden;
  margin-bottom: 16px;
`;

export const Content = styled.View`
  flex: 1;
  height: 94px;
  padding: 0 15px;
  justify-content: center;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 10px;
`;

export const Header = styled.View`
  flex-direction: row;
`;

export const Status = styled.View<OrderStyleProps>`
  width: 5px;
  height: 94px;
  background-color: ${({ theme, status }) => status === 'open' ? theme.COLORS.SECONDARY : theme.COLORS.PRIMARY};
`;

export const Title = styled.Text`
  flex: 1;
  font-size: 18px;
  color: ${({ theme }) => theme.COLORS.TEXT};
  margin-bottom: 7px;
  font-weight: 500;
`;

export const Info = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Footer = styled.View`
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
`;


export const Label = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.COLORS.SUBTEXT};  
  margin-left: 3px;
`;
export const ContainerStatus = styled.View<OrderStyleProps>`
  background-color: ${({ theme, status }) => status === 'open' ? theme.COLORS.SECONDARY : theme.COLORS.PRIMARY};
  align-items: center;
  border-radius: 28px;
  height: 25px;
  width: 100px;
justify-content:center;
margin-left: 4px;
`;

export const TextStatus = styled.Text`
  font-size: 14px;
  color: #fff;
`;
export const ContentText = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.TEXT}; 
`;
export const ContentExercise = styled.View`

`;

