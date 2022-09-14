import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';

import { getRealm } from '../../databases/realm';

import { Container, Header, Title, Form } from './styles';
import {CelularTelefone} from '../../utils/format'
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { TextArea } from '../../components/TextArea';
import { IconButton } from '../../components/IconButton';
import { Alert, ScrollView, Platform } from 'react-native';

export function NewClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [cellPhone, setCellPhone] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  async function handleNewOrderRegister() {
    const realm = await getRealm();

    if (name === "") {
      Alert.alert("Nome", "O nome do cliente é obrigatório.");
      return
    }
    if (cellPhone === "" || cellPhone.length < 14) {
      Alert.alert("Telefone", "O telefone do cliente é invalído.");
      return
    }

    try {
      setIsLoading(true);

      realm.write(() => {
        realm.create("cliente", {
          _id: uuid.v4(),
          name,
          cellPhone,
          description,
          created_at: new Date(),
        });
      });

      Alert.alert("Chamado", "Chamado cadastro com sucesso!");
      setTimeout(() => {
        navigation.goBack();
      }, 100);

    } catch {
      Alert.alert("Chamado", "Não foi possível abrir o chamado!");
    } finally {
      realm.close();
      setIsLoading(false);
    }
  }

  function setCellPhoneForm(texto: string) {
    setCellPhone(CelularTelefone(texto));
  }

  return (
    <Container>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Platform.OS === "ios" ? "80%" : "10%" }}>
        <Header>
          <Title>Novo cliente</Title>
          <IconButton icon="chevron-left" onPress={handleBack} />
        </Header>

        <Form>
          <Input
            placeholder="Nome do cliente"
            onChangeText={setName}
          />

          <Input
            placeholder="Telefone"
            value={cellPhone}
            maxLength={15}
            onChangeText={setCellPhoneForm}
            keyboardType="phone-pad"
          />

          <TextArea
            placeholder="Descrição"
            autoCorrect={false}
            onChangeText={setDescription}
          />
        </Form>


        <Button
          title="Cadastrar"
          isLoading={isLoading}
          onPress={handleNewOrderRegister}
        />
      </ScrollView>
    </Container>
  );
}