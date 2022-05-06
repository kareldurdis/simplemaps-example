import type { NextPage } from 'next';
import Head from 'next/head';
import { Container, Row, Text, Loading, Card, Spacer } from '@nextui-org/react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Database } from 'src/../scripts/import';
import TreeView from "src/pages/Home/TreeView";

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
export type State = {
  id: string;
  name: string;
  counties: CountyObject[];
};
// Map of unique states
interface StateMap {
  [key: string]: State;
}
// Map of unique counties
interface CountyMap {
  [key: string]: CountyObject;
}
// Map of county arrays per state ID
interface CountyArray {
  [key: string]: CountyObject[];
}
// Map of City arrays per county ID
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

      // Push county to the map to keep track of unique counties
      countiesById[city.county_fips] = countyObject;
      // Push new counties to state arrays
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
  // Return array of states from the map
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
