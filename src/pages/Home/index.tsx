import type { NextPage } from 'next';
import Head from 'next/head';
import { Container, Row, Text, Spacer, Card, Divider } from '@nextui-org/react';
import { useQuery } from 'react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { Database } from 'src/../scripts/import';
import ListView from 'src/components/ListView';
import createTree, { CityObject, CountyObject, StateObject } from 'src/utils/createTree';
import StatusOrChildren from 'src/components/StatusOrChildren';
import sortByNameProp from 'src/utils/sortByNameProp';

const useCities = () => {
  return useQuery<Database, Error>('cities', async () => {
    const { data } = await axios.get<Database>('/api/cities');
    return data;
  });
};

const Home: NextPage = () => {
  const { status, data, error } = useCities();
  const [activeState, setActiveState] = useState<StateObject>();
  const [activeCounty, setActiveCounty] = useState<CountyObject>();
  const [activeCity, setActiveCity] = useState<CityObject>();

  let allStates: StateObject[] = [];

  if (status === 'success') {
    allStates = createTree(data).sort(sortByNameProp);
  }
  const allCounties = allStates
    .map((state) => state.counties)
    .flat()
    .sort(sortByNameProp);

  const allCities = allCounties
    .map((county) => county.cities)
    .flat()
    .sort(sortByNameProp);

  // We need to reset County and City when changing State
  const handleStateChange = (state: StateObject) => {
    setActiveState(state);
    setActiveCounty(undefined);
    setActiveCity(undefined);
  };

  // We need to reset City when changing County
  const handleCountyChange = (county: CountyObject) => {
    setActiveCounty(county);
    setActiveCity(undefined);
  };

  console.log('activeItem', activeState, activeCounty, activeCity);

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
          <Text>Pick a State, County and City to see its details</Text>
          <Text b>OR</Text>
          <Text>Search in all of them</Text>
          <Spacer />
          <Row justify="flex-start" align="flex-start">
            <StatusOrChildren status={status} error={error}>
              <ListView items={allStates} setActiveItem={handleStateChange} title="States" />
              {activeState && (
                <ListView
                  items={activeState.counties.sort(sortByNameProp)}
                  setActiveItem={handleCountyChange}
                  title="Counties"
                />
              )}
              {activeCounty && (
                <ListView
                  items={activeCounty.cities.sort(sortByNameProp)}
                  setActiveItem={setActiveCity}
                  title="Cities"
                />
              )}
            </StatusOrChildren>
          </Row>
          <Spacer />
          <Row align="flex-start">
            <Card css={{ mw: '330px' }}>
              <Card.Header>
                <Text h3>Your selection</Text>
              </Card.Header>
              <Divider />
              <Card.Body css={{ py: '$10' }}>
                {activeState && (
                  <>
                    <Text h4>State: {activeState.name}</Text>
                    <Text>Code: {activeState.id}</Text>
                    <Text>Counties: {activeState.counties.length}</Text>
                    <Spacer />
                  </>
                )}
                {activeCounty && (
                  <>
                    <Text h4>County: {activeCounty.name}</Text>
                    <Text>Code: {activeCounty.id}</Text>
                    <Text>Cities: {activeCounty.cities.length}</Text>
                    <Spacer />
                  </>
                )}
                {activeCity && (
                  <>
                    <Text h4>City: {activeCity.name}</Text>
                    <Text>ID: {activeCity.id}</Text>
                    <Text>ASCII name: {activeCity.ascii}</Text>
                  </>
                )}
              </Card.Body>
            </Card>
          </Row>
        </Container>
      </main>
    </>
  );
};

export default Home;
