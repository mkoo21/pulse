import { DB_URL } from '$env/static/private';
import fs from 'fs';

const CONFIG = JSON.parse(fs.readFileSync('config.json').toString());

/** @type {import('./$types').PageServerLoad} */
export const load = async () => {
    // Use UTC offsets instead of timezone names; SAMPLE BY does weird things around daylight savings time (e.g. US/Eastern will have two entries on Nov. 8 due to DST)
    // In fact it's probably best to just always use UTC offsets
    const query = "SELECT timestamp, SUM(amount) FROM events SAMPLE BY 1d FILL(0) ALIGN TO CALENDAR TIME ZONE '-05:00' ORDER BY timestamp DESC LIMIT 300;"
    const res = await fetch(`${DB_URL}/exec?query=${encodeURI(query)}`);

    return await res.json();
};
