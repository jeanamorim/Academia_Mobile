import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { useTheme } from 'styled-components/native';
import { PressableProps } from 'react-native';
import moment from 'moment';

import {
  Container,
  Status,
  Content,
  Header,
  Title,
  Label,
  Info,
  Footer,
  OrderStyleProps
} from './styles';


export type OrderProps = OrderStyleProps & {
  _id: string;
  name: string;
  cellPhone: string;
  description: string;
  created_at: Date;
}

type Props = PressableProps & {
  data: OrderProps;
};

export function Client({ data, ...rest }: Props) {
  const theme = useTheme();


  return (
    <Container {...rest}>
      <Status status={"open"} />

      <Content>
        <Header>
          <Title>{data.name}</Title>
          <Entypo name="chevron-right" size={24} color={theme.COLORS.SECONDARY}/>
        </Header>

        <Footer>
          <Info>
            <MaterialIcons name="schedule" size={16} color={theme.COLORS.SUBTEXT} />
            <Label>
              {
                moment(data.created_at).format("DD/MM - HH:MM")
              }
            </Label>
          </Info>

          <Info>
          <MaterialCommunityIcons name="cellphone-check" size={16} olor={theme.COLORS.SUBTEXT} />
            <Label>
              {data.cellPhone}
            </Label>
          </Info>
        </Footer>
      </Content>
    </Container>
  );
}