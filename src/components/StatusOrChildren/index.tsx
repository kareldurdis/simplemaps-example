import React, { ReactNode } from 'react';
import { Card, Loading } from '@nextui-org/react';
import { QueryStatus } from 'react-query/types/core/types';

type Props = {
  status: QueryStatus;
  error: Error | null;
  children: ReactNode;
};

const StatusOrChildren = ({ status, error, children }: Props) => {
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
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export default StatusOrChildren;
