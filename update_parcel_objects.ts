import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
import  { Builder, By, Key } from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome';
// const { Builder, By, Key } = require('selenium-webdriver');



dotenv.config()
type IEnv = { mongo_username: string, mongo_password: string };
const {mongo_username, mongo_password} = process.env as IEnv;

export const fetch_parcel_documents = async () => {
    const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.rstqb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
    const client = await MongoClient.connect(uri, { serverApi: ServerApiVersion.v1 })
        .catch(err => { console.log(err); });

    if (!client) {
        return;
    }

    const db = client.db("lewis_county_parcels")
    const collection = db.collection("parcel_number_locations");
    const cursor = collection.find({"html": null})

    let documentsToUpdate: Array<any> = [];

    await cursor.forEach(doc => {
        documentsToUpdate.push(doc);
    })

    for (const doc of documentsToUpdate) {
        const { url, _id } = doc;
        if (typeof url !== 'string' || url.includes('null')) continue;
        const builder = await new Builder();
        let driver = builder.forBrowser('chrome')
            .setChromeOptions(new chrome.Options().headless())
            .build();
        await driver.get(url);
        let html = await driver.findElement(By.xpath('//html'))
        const htmlString: string = await html.getAttribute('innerHTML');
        await collection.findOneAndReplace({ "_id": _id }, { ...doc, html: htmlString });
        console.log(`updating ${url}`);
        await driver.close();
    }
}

fetch_parcel_documents();