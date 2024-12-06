import fs from 'fs';

const CONFIG = JSON.parse(fs.readFileSync('config.json').toString());

/** @type {import('./$types').PageServerLoad} */
export const load = async () => {
    const data: { columns: Array<string>, topics: { [key:string]: any } } = {
        columns: [],
        topics: {}
    };

    for(let topic of CONFIG.topics) {
        // USE UTC OFFSETS, ZERO REASON TO USE TIMEZONE NAMES UNDER DST
        let query = `
        SELECT
            timestamp, SUM(amount), topic
        FROM
            ${CONFIG.tablename}
        WHERE
            topic='${topic}'
        SAMPLE BY
            1d FILL(0) ALIGN TO CALENDAR TIME ZONE '-05:00'
        ORDER BY
            timestamp DESC
        LIMIT
            300;`;
        let res = await fetch(`${CONFIG.dbUrl}/exec?query=${encodeURIComponent(query)}`);
        let resData = await res.json();
        (data.topics as { [key: string]: any})[topic as string] = (resData).dataset;
        data.columns = resData.columns;
    }

    return data;
};
