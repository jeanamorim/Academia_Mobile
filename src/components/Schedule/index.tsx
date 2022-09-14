import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { useTheme } from 'styled-components/native';
import { PressableProps } from 'react-native';
import moment from 'moment';
import {format} from "date-fns"

import {
  Container,
  Status,
  Content,
  Header,
  Title,
  Label,
  Info,
  Footer,
  OrderStyleProps,
  ContainerStatus,
  TextStatus,
  ContentExercise,
  ContentText,
} from './styles';


export type OrderProps = OrderStyleProps & {
  _id: string;
  cliente_id: string;
  name: string;
  date: string;
  hours: string;
  exercise: string;
  created_at: Date;
}

type Props = PressableProps & {
  data: OrderProps;
  status: string;
};

export function Schedule({ data, status, ...rest }: Props) {
  const theme = useTheme();


  return (
    <Container {...rest}>
      <Status status={"open"} />

      <Content>
        <Header>
          <Title>{data.name}</Title>
          <Entypo name="chevron-right" size={24} color={theme.COLORS.SECONDARY}/>
        </Header>

        <ContentExercise>  
          <ContentText>Exercício: {data.exercise}</ContentText>
        </ContentExercise>

        <Footer>
          <Info>
            {status === "open" ? (
              <MaterialIcons name="schedule" size={16} color={theme.COLORS.SUBTEXT} />
            ) : (
              <AntDesign name="checkcircleo" size={16} color="green" />

            )}
          
         
            <Label>
            {data.date} às {data.hours}
            </Label>
          </Info>

          <Info>
            <FontAwesome5 name="person-booth" size={14} color="black" />
            <ContainerStatus status={status} >  
              <TextStatus>{status === "open" ? "Aberto" : "Concluidos"}</TextStatus>
            </ContainerStatus>
          </Info>
        </Footer>
      </Content>
    </Container>
  );
}