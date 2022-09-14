import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Container } from './styles';

import { Header } from '../../components/Header';
import { Clientes } from '../../components/Clientes';
import { Button } from '../../components/Button';

export function Home() {
  const navigation = useNavigation();

  function handleNewOrder() {
    navigation.navigate("new");
  }

  return (
    <Container>
      <Header />
      <Clientes />

      <Button
        title="Novo cliente"
        onPress={handleNewOrder}
      />
    </Container>
  );
}