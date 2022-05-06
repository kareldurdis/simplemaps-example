import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Low, JSONFile } from 'lowdb';
import { Database } from '../../scripts/import';

const cities = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Workaround to get to the project root
    const file = path.resolve('src/../data/db.json');
    const adapter = new JSONFile<Database>(file);
    const db = new Low<Database>(adapter);

    await db.read();
    res.status(200).json(db.data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default cities;
