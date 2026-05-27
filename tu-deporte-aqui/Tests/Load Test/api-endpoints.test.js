import http from 'k6/http';
import { sleep, check, group } from 'k6';

export const options = {
    stages: [
        { duration: '10s', target: 20 },
        { duration: '30s', target: 50 },
        { duration: '10s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'],
        http_req_failed: ['rate<0.1'],
    },
};

const BASE_URL = 'http://localhost:3000';

export default function () {
    group('Games API', () => {
        const gameRes = http.get(`${BASE_URL}/api/games`);
        check(gameRes, {
            'games status is 200': (r) => r.status === 200,
            'games response has data': (r) => r.body.length > 0,
        });
    });

    sleep(1);

    group('Standings API', () => {
        const standingsRes = http.get(`${BASE_URL}/api/standings`);
        check(standingsRes, {
            'standings status is 200': (r) => r.status === 200,
            'standings response has data': (r) => r.body.length > 0,
        });
    });

    sleep(1);
}
