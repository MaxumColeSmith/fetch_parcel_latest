import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config()
type IEnv = { mongo_username: string, mongo_password: string };
const {mongo_username, mongo_password} = process.env as IEnv;

export const write_parcels_mongo = async (itemsToWrite: Array<any>) => {
    const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.rstqb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
    const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
    client.connect(async (err: any) => {
        const db = client.db("lewis_county_parcels")
        const collection = db.collection("parcel_number_locations");
        try {
            await collection.insertMany(itemsToWrite, { ordered: false })
        } catch (e) {
            console.log(e)
        }
        // await collection.insertMany(itemsToWrite)
        client.close();
    });
}
