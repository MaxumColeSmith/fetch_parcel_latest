import { write_parcels_mongo } from "./batch_mongo";

const { Builder, By, Key } = require('selenium-webdriver');

type IMain = {
	searchPhrase: string;
	pageToStart: number;
}

const process_browser = async ({
	searchPhrase,
	pageToStart,
}: IMain) => {
	const builder = await new Builder();
	let driver = builder.forBrowser('chrome').build();
	// If default count to 1000, that seems to be the max allowable return
	await driver.get(`https://parcels.lewiscountywa.gov/search?q=${searchPhrase}&page=${pageToStart}&count=${1000}`);
	
	let assessedValueArray = await driver.findElements(By.xpath('//tr'));
	let itemsToSave = [];
	for (let assessedValue of assessedValueArray) {
		// the search page returns a table with parcel numbers in the attribute data-href
		const dataHref = await (assessedValue).getAttribute("data-href");
		itemsToSave.push({
			parcelNumber: dataHref,
			_id: dataHref,
			url: `https://parcels.lewiscountywa.gov${dataHref}`
		})
	}

	await write_parcels_mongo(itemsToSave);
}

const main = async () => {
	for (const char of ("abcdefghijklmnopqrstuvwxyz")) {
		await process_browser({
			searchPhrase: char,
			pageToStart: 0
		});
	}
}

main();