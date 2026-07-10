import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class HttpTwoService {
  private readonly baseUrl: string =
    process.env.MS2_BASE_URL ?? 'http://two:3002';

  async get<T>(path: string): Promise<T> {
    if (!path.startsWith('/')) {
      throw new Error('Path must start with /');
    }

    const response = await axios.get<T>(`${this.baseUrl}${path}`);

    return await response.data;
  }
}
