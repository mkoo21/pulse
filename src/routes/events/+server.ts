import { json } from '@sveltejs/kit';

const DB_URL = "http://localhost:9000/exec";

export const POST = async ({ request }: { request: Request}) => {
    const { topic } = await request.json();

    if(!topic) return json({ status: 400 })
    const query = `INSERT INTO events (id, topic, amount, timestamp) VALUES (rnd_uuid4(), '${ topic }', 1, now())`;
    const res = await fetch(`${DB_URL}?query=${encodeURI(query)}`);
    console.log(res)
    return await res.json();
};
