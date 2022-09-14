import React, { useState, useCallback } from 'react';
import { Alert, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getRealm } from '../../databases/realm';
import { useNavigation } from '@react-navigation/native';

import { Load } from '../Load';
import { Client, OrderProps } from '../Client';

import { Container, Header, Title, Counter } from './styles';

interface Item {
  id: string;
  name: string;
  cellPhone: string;
  description: string;
}

export function Clientes() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<OrderProps[]>([]);

  async function fetchOrders() {
    setIsLoading(true);
    const realm = await getRealm();

    try {
      const response = realm
        .objects<OrderProps[]>("cliente")
        .sorted("created_at")
        .toJSON();

      setOrders(response);

    } catch (error) {
      Alert.alert("Clientes", "Não foi possível carregar os clientes");
    } finally {
      realm.close();
      setIsLoading(false);
    }
  }

  async function OrderUpdate(id: string) {
    const realm = await getRealm();

    try {
      const orderSelected = realm
        .objects<OrderProps>("client")
        .filtered(`_id = '${id}'`)[0]

      realm.write(() => {
        orderSelected.status = orderSelected.status === "open" ? "closed" : "open";
      });

      Alert.alert("Clientes", "Chamado atualizado!");

      fetchOrders();

    } catch (error) {
      console.log(error);
      Alert.alert("Chamado", "Não foi possível atualizar o chamado!");
    }
  }

  // function handleOrderUpdate(id: string) {
  //   Alert.alert(
  //     "Cliente",
  //     "Deseja agendar um horário para esse cliente ?",
  //     [
  //       {
  //         text: "Cancelar",
  //         style: "cancel"
  //       },
  //       {
  //         text: "Confirmar",
  //         onPress: () => OrderUpdate(id)
  //       }
  //     ]
  //   );
  // }

  function handleNewSchedule(item: Item) {
    navigation.navigate("newSchedule", {item: item});
  }

  useFocusEffect(useCallback(() => {
    fetchOrders();
  }, []));

  return (
    <Container>
      <Header>
        <Title>Quantidade de clientes</Title>
        <Counter>{orders.length}</Counter>
      </Header>

      {
        isLoading ?
          <Load />
          : <FlatList
            data={orders}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
              <Client data={item} onPress={() => handleNewSchedule(item)} />
            )}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
          />
      }
    </Container>
  );
}