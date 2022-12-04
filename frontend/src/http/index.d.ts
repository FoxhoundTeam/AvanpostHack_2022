import Axios, { AxiosResponse } from "axios";
import http from ".";
type TFilters = Record<string, number | string | object | boolean>;

type THttpOptions = {
  showModal?: boolean;
  showSnackbar?: boolean;
};
type THttpGetListOptions = {
  filters?: TFilters;
} & THttpOptions;
type THttpCreateItemOptions = {
  data?: Record<string, any>;
} & THttpOptions;
type THttpGetOrDeleteItemOptions = {
  id?: number;
} & THttpOptions;
type THttpUpdateItemOptions = THttpCreateItemOptions &
  THttpGetOrDeleteItemOptions;

declare const http: {
  urls: Record<string, string>;
  getFilterValues: (filters: TFilters | undefined) => any;
  getUrl: (url_name: string, id?: number) => string;
  catchError: (error: any, options: THttpOptions) => boolean;
  getHeaders: () => Record<string, string>;
  getList: <T>(
    url_name: string,
    options?: THttpGetListOptions
  ) => Promise<AxiosResponse<T>>;
  getItem: <T>(
    url_name: string,
    options?: THttpGetOrDeleteItemOptions
  ) => Promise<AxiosResponse<T>>;
  createItem: <T>(
    url_name: string,
    options: THttpCreateItemOptions
  ) => Promise<AxiosResponse<T>>;
  partialUpdateItem: <T>(
    url_name: string,
    options: THttpUpdateItemOptions
  ) => Promise<AxiosResponse<T>>;
  updateItem: <T>(
    url_name: string,
    options: THttpUpdateItemOptions
  ) => Promise<AxiosResponse<T>>;
  deleteItem: <T>(
    url_name: string,
    options: THttpGetOrDeleteItemOptions
  ) => Promise<AxiosResponse<T>>;
};

export default http;
