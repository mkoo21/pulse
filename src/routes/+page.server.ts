import { DB_URL } from '$env/static/private';

/** @type {import('./$types').PageServerLoad} */
export const load = async () => {
    // TODO: group by day and pad up to current day
    // const query = "SELECT * FROM events ORDER BY timestamp DESC"
    const query = "SELECT timestamp, SUM(amount) FROM events SAMPLE BY 1d FILL(0) ALIGN TO CALENDAR TIME ZONE 'EST' ORDER BY timestamp DESC LIMIT 300;"
    const res = await fetch(`${DB_URL}/exec?query=${encodeURI(query)}`);

    return await res.json();
};
