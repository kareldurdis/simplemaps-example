import type { NextPage } from 'next';
import Head from 'next/head';
import { Container, Row, Text, Spacer } from '@nextui-org/react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useState } from 'react';
import { Database } from 'src/../scripts/import';
import TreeView from 'src/pages/Home/TreeView';
import createTree, { State } from 'src/utils/createTree';
import StatusOrChildren from 'src/components/StatusOrChildren';

const useCities = () => {
  return useQuery<Database, Error>('cities', async () => {
    const { data } = await axios.get<Database>('/api/cities');
    return data;
  });
};

const Home: NextPage = () => {
  const { status, data, error } = useCities();
  const [activeItem, setActiveItem] = useState();

  let treeData: State[] = [];

  if (status === 'success') {
    treeData = createTree(data);
  }

  console.log('activeItem', activeItem);

  return (
    <>
      <Head>
        <title>US States, Counties and Cities</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container>
          <Row justify="center" align="center">
            <Text h1>US States, Counties and Cities</Text>
          </Row>
          <Row justify="center" align="center">
            <Text>Pick a State, County or City to see details</Text>
          </Row>
          <Spacer />
          <Row justify="center" align="center">
            <StatusOrChildren status={status} error={error}>
              <TreeView treeData={treeData} setActiveItem={setActiveItem} />
            </StatusOrChildren>
          </Row>
        </Container>
      </main>
    </>
  );
};

export default Home;
