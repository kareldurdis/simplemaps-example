import path from 'path';
import csv from 'csvtojson';

const makeItSo = async () => {
  const jsonArray = await csv().fromFile(path.resolve('data/uscities.csv'));
  console.log(jsonArray);
};

// const jsonData = csvToJson.fieldDelimiter(',').getJsonFromCsv(path.resolve('data/uscities.csv'));

export default makeItSo();
