import React, { useState, useCallback } from 'react';
import { Alert, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getRealm } from '../../databases/realm';
import { useNavigation } from '@react-navigation/native';
import { Filters } from '../Filters';
import { Load } from '../Load';
import { Schedule, OrderProps } from '../Schedule';

import { Container, Header, Title, Counter } from './styles';

interface Item {
  id: string;
  cliente_id: string;
  date: string;
  hours: string;
  exercise: string;
}

export function ScheduleItem() {
  const [isLoading, setIsLoading] = useState(false);
  const [schedule, setSchedule] = useState<OrderProps[]>([]);
  const [status, setStatus] = useState('open');

  async function fetchOrders() {
    setIsLoading(true);
    const realm = await getRealm();

    try {
        const response = realm
        .objects<OrderProps[]>("schedule")
        .filtered(`status = '${status}'`)
        .sorted("created_at")
        .toJSON();

        setSchedule(response);

    } catch (error) {
      Alert.alert("Agendamentos", "Não foi possível carregar os agendamentos");
    } finally {
      realm.close();
      setIsLoading(false);
    }
  }

  async function ScheduleUpdate(id: string) {
    const realm = await getRealm();

    try {
      const orderSelected = realm
        .objects<OrderProps>("schedule")
        .filtered(`_id = '${id}'`)[0]

      realm.write(() => {
        orderSelected.status = orderSelected.status === "open" ? "closed" : "open";
      });

      Alert.alert("Agendamento", "Agendamento atualizado!");

      fetchOrders();

    } catch (error) {
      Alert.alert("Agendamento", "Não foi possível atualizar o agendamento!");
    }
  }

  function handleOrderUpdate(id: string) {
    if (status === "closed") {
      Alert.alert("Agendamento", "Esse agendamento foi concluído")
      return
    }
    Alert.alert(
      "Agendamento",
      "Marcar o agendamento como concluido ?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Confirmar",
          onPress: () => ScheduleUpdate(id)
        }
      ]
    );
  }


  useFocusEffect(useCallback(() => {
    fetchOrders();
  }, [status]));

  return (
    <Container>
       <Filters onFilter={setStatus} />
      <Header>
      <Title>Agendamentos {status === 'open' ? 'abertos' : 'concluídos'}</Title>
        <Counter>{schedule.length}</Counter>
      </Header>

      {
        isLoading ?
          <Load />
          : <FlatList
            data={schedule}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
              <Schedule data={item} status={status} onPress={() => handleOrderUpdate(item._id)} />
            )}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
          />
      }
    </Container>
  );
}