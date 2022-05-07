import React, { ReactNode } from 'react';
import { Card, Loading } from '@nextui-org/react';
import { QueryStatus } from 'react-query/types/core/types';

type Props = {
  status: QueryStatus;
  error?: Error;
  children?: ReactNode;
};

const StatusOrChildren = ({ status, error, children }: Props): ReactNode => {
  if (status === 'loading') {
    return <Loading size="xl" />;
  }
  if (status === 'error') {
    let message = 'An Error has occured.';
    if (error && error.message) {
      message = error.message;
    }
    return <Card color="error">{message}</Card>;
  }
  return children;
};

export default StatusOrChildren;
