import type { NextPage } from 'next';
import Head from 'next/head';
import { Container, Row, Text, Spacer, Card, Divider, Input, FormElement } from '@nextui-org/react';
import { useQuery } from 'react-query';
import axios from 'axios';
import React, { ChangeEvent, useState } from 'react';
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
  const [searchTerm, setSearchTerm] = useState<string>('');

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

  const searchActive = searchTerm.length > 0;

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
    // We need to reverse search for State if we pick County from search results
    if (searchActive) {
      const newState = allStates.find((state) => {
        return state.counties.includes(county as CountyObject);
      });
      if (newState) {
        setActiveState(newState);
      }
    }
  };

  // Handles updating city selection
  const handleCityChange = (city: CityObject) => {
    setActiveCity(city);
    // We need to reverse search for County and State if we pick City
    // from search results
    if (searchActive) {
      const newCounty = allCounties.find((county) => {
        return county.cities.includes(city);
      });
      const newState = allStates.find((state) => {
        return state.counties.includes(newCounty as CountyObject);
      });
      if (newCounty) {
        setActiveCounty(newCounty);
      }
      if (newState) {
        setActiveState(newState);
      }
    }
  };

  // Searching resets manual selection
  const handleSearchChange = (event: ChangeEvent<FormElement>) => {
    setSearchTerm(event.currentTarget.value);
    setActiveState(undefined);
    setActiveCounty(undefined);
    setActiveCity(undefined);
  };

  console.log('activeItem', searchTerm, activeState, activeCounty, activeCity);

  const searchRegexp = new RegExp(searchTerm, 'ig');

  // Set data for views according to if we're searching or not
  const stateView = searchActive
    ? allStates.filter((item) => searchRegexp.test(item.name))
    : allStates;
  const countyView = searchActive
    ? allCounties.filter((item) => searchRegexp.test(item.name))
    : activeState?.counties.sort(sortByNameProp) || allCounties;
  const cityView = searchActive
    ? allCities.filter((item) => searchRegexp.test(item.name))
    : activeCounty?.cities.sort(sortByNameProp) || allCities;

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
          <Text>Search in all of them (using search will reset your selection)</Text>
          <Spacer />
          <Row>
            <Input
              placeholder="Search..."
              clearable
              value={searchTerm}
              onChange={handleSearchChange}
              aria-label="Search field"
            />
          </Row>
          <Spacer />
          <Row>
            <StatusOrChildren status={status} error={error}>
              <ListView
                items={stateView}
                setActiveItem={handleStateChange}
                activeItem={activeState}
                title="States"
              />
              {(activeState || searchActive) && (
                <ListView
                  items={countyView}
                  setActiveItem={handleCountyChange}
                  activeItem={activeCounty}
                  title="Counties"
                />
              )}
              {(activeCounty || searchActive) && (
                <ListView
                  items={cityView}
                  setActiveItem={handleCityChange}
                  activeItem={activeCity}
                  title="Cities"
                />
              )}
            </StatusOrChildren>
          </Row>
          <Spacer />
          <Row align="flex-start">
            <Card css={{ mw: '290px' }}>
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
