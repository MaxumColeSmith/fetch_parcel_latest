# How To Get Started

`npx ts-node index.ts` to run the fetch script.

# index.ts

Gets the first pass at the parcels, and write the following shape to Mongo:

```json
{
    "parcelNumber": "parcelNumber",
    "_id": "parcelNumber",
    "url": "https://parcels.lewiscountywa.gov${parcelNumber}"
}
```

batch_mongo inserts as batch.

# update_parcel_objects.ts

Currently, this goes to earch pacel page and dumps the dom into mongo. Need to structure out the following:

- address
- owner
- account number
- assessed value
- total acres
- description
- property value history
- sales history
- charge history
- payment history
- structures, commercial buildings, residential buildings