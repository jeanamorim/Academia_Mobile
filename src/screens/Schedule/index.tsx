import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';

import { getRealm } from '../../databases/realm';

import { Container, Header, Title, Form } from './styles';
import { ScheduleItem } from '../../components/Schedules';
import { IconButton } from '../../components/IconButton';
import { Alert, ScrollView, Platform } from 'react-native';

export function Schedule() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [cellPhone, setCellPhone] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation();

  function handleBack() {
    navigation.navigate("home");
  }

  async function handleNewOrderRegister() {
    const realm = await getRealm();

    try {
      setIsLoading(true);

      realm.write(() => {
        const created = realm.create("client1", {
          _id: uuid.v4(),
          name,
          cellPhone,
          description,
          created_at: new Date(),
        });

        console.log("CADASTRADO ==>", created);
      });

      Alert.alert("Chamado", "Chamado cadastro com sucesso!");
    } catch {
      Alert.alert("Chamado", "Não foi possível abrir o chamado!");
    } finally {
      realm.close();
      setIsLoading(false);
    }
  }

  return (
    <Container>
        <Header>
          <Title>Agendamentos</Title>
          <IconButton icon="chevron-left" onPress={handleBack} />
      </Header>
        <ScheduleItem />
    </Container>
  );
}