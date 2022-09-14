/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-sparse-arrays */
import React, {useCallback, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Platform, Alert, ScrollView} from 'react-native';
import { format } from 'date-fns';
import { IconButton } from '../../components/IconButton';
import { Button } from '../../components/Button';
import { getRealm } from '../../databases/realm';
import uuid from 'react-native-uuid';
import {
  Container,
  Header,
  Calender,
  Data,
  Title,
  Content,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
  Schedule,
  Section,
  SectionContent,
  Hour,
  HourText,
  ContentCard,
  Day,
  TitleDate,
} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}
interface AvailabilityItem {
  hour: string;
  key: string;
}

export function NewSchedule({ route }) {
  const navigation = useNavigation();
  const {reset} = useNavigation();
  const [item] = useState(route.params.item)
  const[loading, setLoading] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availability] = useState<AvailabilityItem[]>([
    { hour: '05:00', key: '1' },
    { hour: '06:00', key: '2' },
    { hour: '07:00', key: '3' },
    { hour: '08:00', key: '4' },
    { hour: '09:00', key: '5' },
    { hour: '10:00', key: '6' },
    { hour: '11:00', key: '7' },
    { hour: '12:00', key: '8' },
    { hour: '13:00', key: '9' },
    { hour: '14:00', key: '10' },
    { hour: '15:00', key: '11' },
    { hour: '16:00', key: '12' },
    { hour: '17:00', key: '13' },
    { hour: '18:00', key: '14' },
    { hour: '19:00', key: '15' },
    { hour: '20:00', key: '16' },
    { hour: '21:00', key: '17' },
    { hour: '22:00', key: '18' },
    { hour: '23:00', key: '19' },
  ]);
  const [exercises] = useState<AvailabilityItem[]>([
    { hour: 'Musculação', key: '1' },
    { hour: 'Funcional', key: '2' },
    { hour: 'Treino funcional', key: '3' },
    { hour: 'Corrida', key: '4' },
    { hour: 'Spinning', key: '5' },
    { hour: 'Bike outdoor', key: '6' },
    { hour: 'HIIT', key: '7' },
    { hour: 'Danças', key: '8' },
  ]);
  const [selectedHour, setSelectedHour] = useState('');
  const [exercise, setExercise] = useState('');

  const {navigate} = useNavigation();

  const handleDateChange = useCallback((event: any, date: Date | undefined) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (date) {
      setSelectedDate(date);
    }
  }, []);

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker(state => !state);
  }, []);


    async function handleCreateSchedule() {
    const realm = await getRealm();

    try {
      setLoading(true);

      realm.write(() => {
        realm.create("schedule", {
          _id: uuid.v4(),
          cliente_id: item._id,
          name: item.name,
          date: format(selectedDate, 'dd/MM/yyyy'),
          hours: selectedHour,
          exercise: exercise,
          status: 'open',
          created_at: new Date(),
        });
      });

      Alert.alert("Agendamento", "Agendamento cadastrado com sucesso!");

      setTimeout(() => {
        reset({
          routes: [{name: 'schedule'}],
          index: 0,
        });
      }, 200);

    } catch {
      Alert.alert("Agendamento", "Não foi possível criar esse agendamento!");
    } finally {
      realm.close();
      setLoading(false);
    }
  };

  const handleSelectHour = (hour: string) => {
    setSelectedHour(hour);
  };
  const handleSelectExercise = (exercise: string) => {
    setExercise(exercise);
  };

  function handleBack() {
    navigation.goBack();
  }
  function handleOralertSchedule() {
    if (selectedHour === '') {
      Alert.alert('Atenção', 'Você precisa selecionar um horário.');
      return;
    }
    if (exercise === '') {
      Alert.alert('Atenção', 'Você precisa selecionar um exercício.');
      return;
    }

    Alert.alert(
      "Agendar",
      `Deseja agendar a data de ${format(selectedDate, 'dd/MM/yyyy')} às ${selectedHour} para esse cliente treinar ${exercise} ?`,
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Confirmar",
          onPress: () => handleCreateSchedule()
        }
      ]
    );
  }

  return (
    <Container>
        <Header>
          <Title>Novo agendamento</Title>
          <IconButton icon="chevron-left" onPress={handleBack} />
        </Header>

        <ContentCard>
          <Day>Agendado para:</Day>
          <Data>{`${format(selectedDate, 'dd/MM/yyyy')} às ${
            selectedHour ? selectedHour : '--:--'
          }`}</Data>
        </ContentCard>

        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 70}}>
          <Calender>
            <TitleDate>Selecione a data:</TitleDate>

            <OpenDatePickerButton onPress={handleToggleDatePicker}>
              <OpenDatePickerButtonText>
                {showDatePicker ? 'Selecionar' : 'Selecione uma data'}
              </OpenDatePickerButtonText>
            </OpenDatePickerButton>

            {showDatePicker && (
              <DateTimePicker
                mode="date"
                display="spinner"
                onChange={handleDateChange}
                value={selectedDate}
                minimumDate={new Date()}
              />
            )}
          </Calender>

          <Schedule>
            <TitleDate>Escolha horário:</TitleDate>

            <Section>
              <SectionContent>
                 {availability.map(({hour, key}) => (
                   <Hour
                     key={key}
                     onPress={() => handleSelectHour(hour)}
                     selected={selectedHour === hour}>
                     <HourText selected={selectedHour === hour}>{hour}</HourText>
                   </Hour>
                 ))}
                
              </SectionContent>
            </Section>

         <Section>
         <TitleDate>Escolha o exercício:</TitleDate>
              <SectionContent>
                {exercises.map(({hour, key}) => (
                  <Hour
                    key={key}
                    selected={exercise === hour}
                    onPress={() => handleSelectExercise(hour)}>
                    <HourText selected={exercise === hour}>{key} - {hour}</HourText>
                  </Hour>
                ))}
              </SectionContent>
            </Section>

          </Schedule>
          <Button
          title="Agendar"
          isLoading={loading}
          onPress={handleOralertSchedule}
        />
        </Content>
    </Container>
  );
};


