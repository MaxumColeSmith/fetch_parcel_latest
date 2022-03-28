# How To Get Started

`npx ts-node index.ts` to run the fetch script.

# index.ts

Gets the first pass at the parcels, and write the following shape to Mongo:

```json
{
    "parcelNumber": "${parcelNumber}",
    "_id": "${parcelNumber}",
    "url": "https://parcels.lewiscountywa.gov${parcelNumber}"
}
```

batch_mongo inserts as batch.

# update_parcel_objects.ts

Currently, this goes to earch parcel page and dumps the dom into mongo.

```json
{
    "parcelNumber": "${parcelNumber}",
    "_id": "${parcelNumber}",
    "url": "https://parcels.lewiscountywa.gov${parcelNumber}",
    "assessedValue": "$547,000",
    "...": "..."
}
```

Sample Return:

```bash
13603@DESKTOP-IE40UID MINGW64 ~/Repos/fetch_parcel_latest (main)
$ npx ts-node scripts/FILE_NAME_HERE.ts
updating https://parcels.lewiscountywa.gov/028088059002
updating https://parcels.lewiscountywa.gov/014727012001
updating https://parcels.lewiscountywa.gov/750010102006
updating https://parcels.lewiscountywa.gov/750010176120
updating https://parcels.lewiscountywa.gov/018553002018
updating https://parcels.lewiscountywa.gov/007256001000
updating https://parcels.lewiscountywa.gov/015433009001
updating https://parcels.lewiscountywa.gov/007442001001
updating https://parcels.lewiscountywa.gov/014731006000
updating https://parcels.lewiscountywa.gov/030695009000
updating https://parcels.lewiscountywa.gov/015638002001
```

Need to structure out the following:

- address
- owner
- account number
- total acres
- description
- property value history
- sales history
- charge history
- payment history
- structures, commercial buildings, residential buildings