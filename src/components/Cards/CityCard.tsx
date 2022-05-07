import React from 'react';
import { Card, Divider, Text } from '@nextui-org/react';
import { CityObject } from 'src/utils/createTree';

type Props = {
  city: CityObject;
};

const CityCard = ({ city }: Props) => {
  return (
    <Card css={{ mw: '330px' }}>
      <Card.Header>
        <Text h3>{city.name}</Text>
      </Card.Header>
      <Divider />
      <Card.Body css={{ py: '$10' }}>
        <Text>ID: {city.id}</Text>
        <Text>ASCII name: {city.ascii}</Text>
      </Card.Body>
    </Card>
  );
};

export default CityCard;
