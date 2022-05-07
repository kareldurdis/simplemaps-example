import React from 'react';
import { Card, Divider, Text } from '@nextui-org/react';
import { CountyObject } from 'src/utils/createTree';

type Props = {
  county: CountyObject;
};

const CountyCard = ({ county }: Props) => {
  return (
    <Card css={{ mw: '330px' }}>
      <Card.Header>
        <Text h3>{county.name}</Text>
      </Card.Header>
      <Divider />
      <Card.Body css={{ py: '$10' }}>
        <Text>Code: {county.id}</Text>
        <Text>Cities: {county.cities.length}</Text>
      </Card.Body>
    </Card>
  );
};

export default CountyCard;
