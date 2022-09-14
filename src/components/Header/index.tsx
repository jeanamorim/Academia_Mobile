import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from '../IconButton';

import { Container, Greeting, Title, SubTitle } from './styles';

export function Header() {
  const navigation = useNavigation();

  function handleNewSchedule() {
    navigation.navigate("schedule");
  }

  return (
    <Container>
      <Greeting>
        <Title>Agendamentos</Title>
        <SubTitle>Selecione o cliente que deseja agendar.</SubTitle>
      </Greeting>

      <IconButton icon="clipboard-list" onPress={handleNewSchedule}/>
    </Container>
  );
}
