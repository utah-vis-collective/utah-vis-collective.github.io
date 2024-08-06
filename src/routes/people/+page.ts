import type { PageLoad } from './$types';
import { sheetToJson, PEOPLE_TSV, PeoplePrep } from '../../lib/data';

export const load: PageLoad = async ({ fetch }) => {
	const get = async (url: string) =>
		fetch(url, { headers: { 'cache-control': 'public, max-age=3600' } }).then((res) => res.text());
	const [people] = await Promise.all([get(PEOPLE_TSV).then((x) => sheetToJson(x, PeoplePrep))]);

	return { people };
};

// async function processXLSX(inputStream: any) {
// 	const workbook = new Excel.Workbook();
// 	await workbook.xlsx.load(inputStream);
// 	const data = workbook.worksheets.map((sheet) => {
// 		const rows = sheet.getSheetValues();
// 		sheet.getImages().forEach((image) => {
// 			const x = workbook.getImage(image.imageId as any);
// 			const xPos = image.range.tl.col;
// 			const yPos = image.range.tl.row;
// 			// buffer to base64
// 			const base64 = x.buffer.toString('base64');
// 			(rows as any)[yPos + 1][xPos + 1] = base64;
// 		});
// 		return rows;
// 	});
// 	const columnNames = data[0][1] as (string | null)[];
// 	return data[0]
// 		.slice(2)
// 		.filter((x) => (x as any)[1])
// 		.map((x) =>
// 			(x as any)?.map((y: any) => (typeof y === 'object' && y.hyperlink ? y.hyperlink : y))
// 		)
// 		.map((x) => Object.fromEntries(zip(columnNames, x as any)));
// }

// const zip = <A, B>(a: A[], b: B[]): [A, B][] =>
// 	a.reduce(
// 		(acc, a, i) => {
// 			if (a === null) return acc;
// 			acc.push([a, b[i]]);
// 			return acc;
// 		},
// 		[] as [A, B][]
// 	);
