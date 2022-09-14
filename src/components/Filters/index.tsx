import React from 'react';
import { useTheme } from 'styled-components/native';

import { Filter } from '../Filter';
import { Container, Title, Options } from './styles';

type Props = {
  onFilter: (status: string) => void;
}

export function Filters({ onFilter }: Props) {
  const theme = useTheme();

  return (
    <Container>
      <Title>Filtre pelo status do agendamento</Title>

      <Options>
        <Filter
          title="Abertos"
          backgroundColor={theme.COLORS.SECONDARY}
          onPress={() => onFilter('open')}
        />

        <Filter
          title="Concluidos"
          backgroundColor={theme.COLORS.PRIMARY}
          onPress={() => onFilter('closed')}
        />
      </Options>
    </Container>
  );
}