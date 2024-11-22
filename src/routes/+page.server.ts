const DB_URL = "http://localhost:9000/exec"

/** @type {import('./$types').PageServerLoad} */
export const load = async () => {
    const query = "SELECT * FROM events ORDER BY timestamp DESC"
    const res = await fetch(`${DB_URL}?query=${encodeURI(query)}`);
    return await res.json();
};
