import type { NextPage } from 'next';
import Head from 'next/head';
import { Container, Row, Text, Loading, Card } from '@nextui-org/react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Database } from 'src/../scripts/import';

/*
city: "New York"
city_ascii: "New York"
county_fips: "36061"
county_name: "New York"
id: 1840034016
state_id: "NY"
state_name: "New York"
 */

type CityObject = {
  id: number;
  name: string;
  ascii: string;
};
type CountyObject = {
  id: string;
  name: string;
  cities: CityObject[];
};
type State = {
  id: string;
  name: string;
  counties: CountyObject[];
};
interface StateMap {
  [key: string]: State;
}
interface CountyMap {
  [key: string]: CountyObject;
}
interface CountyArray {
  [key: string]: CountyObject[];
}
interface CityArray {
  [key: string]: CityObject[];
}

const createTree = (data: Database): State[] => {
  const statesById: StateMap = {};
  const countiesById: CountyMap = {};
  const countiesByStateId: CountyArray = {};
  const citiesByCountyId: CityArray = {};

  data.cities.forEach((city) => {
    const cityObject = {
      id: city.id,
      name: city.city,
      ascii: city.city_ascii,
    };

    // Push cities into counties
    if (citiesByCountyId[city.county_fips]) {
      citiesByCountyId[city.county_fips].push(cityObject);
    } else {
      citiesByCountyId[city.county_fips] = [cityObject];
    }

    // Create counties that are new
    if (!countiesById[city.county_fips]) {
      const countyObject = {
        id: city.county_fips,
        name: city.county_name,
        cities: citiesByCountyId[city.county_fips],
      };

      countiesById[city.county_fips] = countyObject;
      if (countiesByStateId[city.state_id]) {
        countiesByStateId[city.state_id].push(countyObject);
      } else {
        countiesByStateId[city.state_id] = [countyObject];
      }
    }

    // Create states that are new
    if (!statesById[city.state_id]) {
      statesById[city.state_id] = {
        id: city.state_id,
        name: city.state_name,
        counties: countiesByStateId[city.state_id],
      };
    }
  });
  return Object.values(statesById);
};

const useCities = () => {
  return useQuery<Database, Error>('cities', async () => {
    const { data } = await axios.get<Database>('/api/cities');
    return data;
  });
};

const Home: NextPage = () => {
  const { status, data, error } = useCities();

  if (status === 'success') {
    const treeData = createTree(data);
  }

  return (
    <>
      <Head>
        <title>Hello world</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container>
          <Row justify="center" align="center">
            <Text h1>Hello world</Text>
          </Row>
          <Row justify="center" align="center">
            {status === 'loading' && <Loading size="xl" />}
            {status === 'error' && <Card color="error">{error.message}</Card>}
          </Row>
        </Container>
      </main>
    </>
  );
};

export default Home;
