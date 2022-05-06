import path from 'path';
import csv from 'csvtojson';
import { Low, JSONFile } from 'lowdb';

type City = {
  city: string;
  city_ascii: string;
  county_fips: string;
  county_name: string;
  id: number;
  state_id: string;
  state_name: string;
};

type Database = {
  cities: City[];
};

const makeItSo = async () => {
  try {
    const jsonArray = await csv().fromFile(path.resolve('data/uscities.csv'));

    // Use JSON file for storage
    const file = path.resolve('data/db.json');
    const adapter = new JSONFile<Database>(file);
    const db = new Low<Database>(adapter);

    db.data = {cities: []};

    const {cities} = db.data;

    jsonArray.forEach((city) => {
      cities.push({
        city: city.city,
        city_ascii: city.city_ascii,
        county_fips: city.county_fips,
        county_name: city.county_name,
        id: parseInt(city.id, 10),
        state_id: city.state_id,
        state_name: city.state_name,
      });
    });

    await db.write();
    console.log('Data imported successfuly.');
  } catch (error) {
    console.error(error);
  }
};

export default makeItSo();
