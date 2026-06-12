import { Injectable } from '@nestjs/common';
import { Source } from './types/sources';
import { Prameter } from './types/parameter';

@Injectable()
export class SncfService {

    async request(source: Source, parameters: Prameter[]): Promise<any> {
        const route = `https://api.sncf.com/v1/coverage/sncf/${source}`;
        const query = parameters.map(p => {
            return Object.entries(p).map(([key, value]) => `${key}=${value}`).join('&');
        });

        const url = `${route}?${query}`;
        const response = await fetch(url, {
            headers: {
                'Authorization': process.env.SNCF_API_KEY!
            }
        });

        const data = await response.json();
        return data;
    }
}
