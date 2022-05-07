import React from 'react';
import { Card, Divider, Text } from '@nextui-org/react';
import { StateObject } from 'src/utils/createTree';

type Props = {
  state: StateObject;
};

const StateCard = ({ state }: Props) => {
  return (
    <Card css={{ mw: '330px' }}>
      <Card.Header>
        <Text h3>{state.name}</Text>
      </Card.Header>
      <Divider />
      <Card.Body css={{ py: '$10' }}>
        <Text>Code: {state.id}</Text>
        <Text>Counties: {state.counties.length}</Text>
      </Card.Body>
    </Card>
  );
};

export default StateCard;
