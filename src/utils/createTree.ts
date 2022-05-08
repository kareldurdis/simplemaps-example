import { Database } from 'src/../scripts/import';

export type CityObject = {
  id: number;
  name: string;
  ascii: string;
};
export type CountyObject = {
  id: string;
  name: string;
  cities: CityObject[];
};
export type StateObject = {
  id: string;
  name: string;
  counties: CountyObject[];
};
// Map of unique states
interface StateMap {
  [key: string]: StateObject;
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

const createTree = (data: Database | undefined): StateObject[] => {
  if (!data) {
    return [];
  }
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

export default createTree;
