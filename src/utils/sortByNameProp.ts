type ObjectWithName = {
  name: string;
};

const sortByNameProp = (a: ObjectWithName, b: ObjectWithName) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};

export default sortByNameProp;
