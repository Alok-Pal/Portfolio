import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { getDbClient } from '../../api/utils/db';

let dbClient: MongoClient;

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  // We can hit the api the req data will come here like api/addPortfolioData   as the folder structure represent the url
  if (req.method === 'POST') {
    try {
      dbClient = await getDbClient();
      const newData = req.body;
      const result = await dbClient.db().collection('personaldata').insertOne(newData);
      res.status(201).json({ success: true, data: result?.ops });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    } finally {
      if (dbClient) {
        await dbClient.close();
      }
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
