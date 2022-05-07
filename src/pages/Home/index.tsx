import type { NextPage } from 'next';
import Head from 'next/head';
import { Container, Row, Text, Spacer } from '@nextui-org/react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Database } from 'src/../scripts/import';
import TreeView from 'src/pages/Home/TreeView';
import createTree, { State } from 'src/utils/createTree';

const useCities = () => {
  return useQuery<Database, Error>('cities', async () => {
    const { data } = await axios.get<Database>('/api/cities');
    return data;
  });
};

const Home: NextPage = () => {
  const { status, data, error } = useCities();

  let treeData: State[] = [];

  if (status === 'success') {
    treeData = createTree(data);
  }

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
          <Spacer />
          <Row justify="center" align="center">
            {status === 'loading' && <Loading size="xl" />}
            {status === 'error' && <Card color="error">{error.message}</Card>}
            {status === 'success' && <TreeView treeData={treeData} />}
          </Row>
        </Container>
      </main>
    </>
  );
};

export default Home;
