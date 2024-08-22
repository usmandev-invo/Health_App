// services/api.ts

import { URLs, endpoints } from "@constants";
import HTTPService from "../http";

class APIService extends HTTPService {
  private static apiInstance: APIService | null = null;

  private constructor(baseURL?: string) {
    super(baseURL);
  }

  public static getInstance(baseURL?: string): APIService {
    if (!APIService.apiInstance) {
      console.log("Initializing API Service with base URL:", baseURL);
      APIService.apiInstance = new APIService(baseURL ?? URLs.BASE_URL);
    }
    return APIService.apiInstance;
  }

  public getHealthData<T = any>(): Promise<T> {
    const fullUrl = `${this.getBaseURL()}${endpoints.GET_DATA}`;
    console.log("Full URL for GET request:", fullUrl);
    return this.get<T>(fullUrl).catch(error => {
      console.error("Error in GET request:", error);
      throw error;
    });
  }

  public addHealthData<T = any>(payload: object): Promise<T> {
    const fullUrl = `${this.getBaseURL()}${endpoints.ADD_DATA}`;
    console.log("Full URL for POST request:", fullUrl);
    return this.post<T>(fullUrl, payload).catch(error => {
      console.error("Error in POST request:", error);
      throw error;
    });
  }
}

export default APIService;
