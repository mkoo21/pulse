import type { Handle } from '@sveltejs/kit';
import { AUTH_CREDS } from '$env/static/private';


export const handle: Handle = ({event, resolve}) => {
    const authHeader = event.request.headers.get('Authorization');
    if (authHeader && authHeader.startsWith('Basic')) {
        const creds = atob(authHeader.replace('Basic ', ''));
        if (creds == AUTH_CREDS) {
            return resolve(event);
        }
        console.error(`Invalid credentials ${AUTH_CREDS}`);
    }
    return new Response('Unauthorized', {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic realm="Protected"',
        },
    });
}