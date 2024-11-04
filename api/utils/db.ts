import { MongoClient } from 'mongodb';

let dbClient: MongoClient;
export async function initDbClient(): Promise<MongoClient> {
  console.log("🚀 ~ initDbClient ~ process.env.MONGODB_URI:", process.env.MONGODB_URI)
  dbClient = await MongoClient.connect(process.env.MONGODB_URI || '', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ignoreUndefined: true
  });

  // eslint-disable-next-line no-console
  console.log('✔️   Connected to Database');
  return dbClient;
}

export async function getDbClient(): Promise<MongoClient> {
  if (!dbClient) {
    await initDbClient();
  }
  return dbClient;
}
