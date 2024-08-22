// services/http/index.ts

import axios, { AxiosInstance } from 'axios';

class HTTPService {
  protected axiosInstance: AxiosInstance;
  private baseURL: string;

  constructor(baseURL?: string) {
    this.baseURL = baseURL ?? 'http://default-base-url';
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  protected get<T>(url: string): Promise<T> {
    return this.axiosInstance.get<T>(url).then(response => response.data);
  }

  protected post<T>(url: string, payload: object): Promise<T> {
    return this.axiosInstance.post<T>(url, payload).then(response => response.data);
  }

  // Getter method to access the base URL
  protected getBaseURL(): string {
    return this.baseURL;
  }
}

export default HTTPService;
