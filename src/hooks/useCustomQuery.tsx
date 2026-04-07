import {
  useQuery,
  UseQueryResult,
  UndefinedInitialDataOptions,
  QueryKey,
  UseMutationOptions,
  useMutation,
  UndefinedInitialDataInfiniteOptions,
  UseInfiniteQueryResult,
  InfiniteData,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { axios } from '../lib';

type API = any;

// ===================================================useInfiniteQuery start=================================================================
type USE_INFINITE_QUERY_TYPE = {
  api: API;
  latestPage: (lastPage: any, pages: any) => any;
  options: Partial<
    UndefinedInitialDataInfiniteOptions<
      unknown,
      Error,
      unknown,
      string[],
      number
    >
  >;
  key?: string;
  value?: any[];
  config?: {
    [key: string]: any;
  };
};

export type INFINITE_QUERY_RESULT<T> = UseInfiniteQueryResult<
  InfiniteData<T, unknown>
>;

export function useInfiniteApiPost<T>({
  key,
  api,
  value,
  config,
  options,
  latestPage,
}: USE_INFINITE_QUERY_TYPE) {
  const result = useInfiniteQuery({
    queryKey: [key ?? api, ...(value ?? [])],
    queryFn: async ({ pageParam }) => {
      const res = await axios.post(api, {
        page: pageParam,
        ...config,
      });
      return res.data;
    },
    initialPageParam: 1,
    // getNextPageParam: (lastPage, pages) => {
    //   if (lastPage.products.length >= lastPage.total) return undefined;
    //   return pages.length + 1;
    // },
    getNextPageParam: latestPage,
    ...options,
  });
  return result as UseInfiniteQueryResult<InfiniteData<T, unknown>>;
}

// useGet api

export const apiFetcherInfinite = async (
  url: string,
  pageParam?: number,
  config?: any,
) => {
  const res = await axios.get(url, {
    params: {
      offset: pageParam,
      ...config,
    },
  });
  return res.data;
};

export function useInfiniteApi<T>({
  key,
  api,
  latestPage,
  value,
  config,
  options,
}: USE_INFINITE_QUERY_TYPE) {
  const result = useInfiniteQuery({
    queryKey: [key ?? api, ...(value ?? [])],
    queryFn: async ({ pageParam }) =>
      apiFetcherInfinite(api, pageParam, config),
    initialPageParam: 1,
    // getNextPageParam: (lastPage, pages) => {
    //   if (lastPage.photos.length >= lastPage.total_photos) return undefined;
    //   return pages.length + 1;
    // },
    getNextPageParam: latestPage,
    refetchOnWindowFocus: false,
    ...options,
  });
  return result as UseInfiniteQueryResult<InfiniteData<T, unknown>>;
}
// ===================================================useInfiniteQuery end=================================================================

// useGet api

// ===================================================useQuery start=================================================================
type USE_QUERY_TYPE = {
  api: any;
  options: Partial<
    UndefinedInitialDataOptions<unknown, Error, unknown, QueryKey>
  >;
  key?: string;
  value?: any[];
  config?: {
    [key: string]: any;
  };
};

export const apiFetcher = async (
  url: string,
  pageParam?: number,
  config?: any,
) => {
  const res = await axios.get(url, {
    params: {
      offset: pageParam,
      ...config,
    },
  });
  return res.data;
};
export type QUERY_RESULT<T> = UseQueryResult<T, Error>;
// ==================== fetch data via get method ====================

export const apiFetcherGet = async (url: string, config?: any) => {
  try {
    const res = await axios.get(url, {
      ...config,
    });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export function useApi<T>({
  key,
  api,
  options,
  value,
  config,
}: USE_QUERY_TYPE) {
  const result = useQuery({
    queryKey: [key ?? api, ...(value ?? [])],
    queryFn: async () => apiFetcherGet(api, config),
    refetchOnReconnect: 'always',
    refetchOnWindowFocus: false,
    ...options,
  });
  return result as UseQueryResult<T, Error>;
}

// ==================== fetch data via post method ====================
export function useApiPost<T>({
  key,
  api,
  options,
  value,
  config,
}: USE_QUERY_TYPE) {
  const result: UseQueryResult<any, Error> = useQuery<any, Error>({
    queryKey: [key ?? api, ...(value ?? [])],
    queryFn: async () => {
      const res = await axios.post(api, {
        ...config,
      });
      return res.data;
    },
    refetchOnReconnect: 'always',
    refetchOnWindowFocus: false,
    ...options,
  });
  return result as UseQueryResult<T, Error>;
}
// ===================================================useQuery end=================================================================

// ==================== useMutation method start ====================
const postApi = (api: API, data: object) => {
  // try catch and also formData
  try {
    if (data instanceof FormData) {
      return axios.post(api, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } else {
      return axios.post(api, data);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export type USE_MUTATION_TYPE = {
  options?: UseMutationOptions<AxiosResponse<any, any>, Error, void, unknown>;
};

export const usePostMutation = ({ options }: USE_MUTATION_TYPE) => {
  return useMutation<AxiosResponse<any, any>, Error, any, unknown>({
    mutationFn: ({ api, data }: { api: API; data: object }) =>
      postApi(api, data),
    ...options,
  });
};
// ==================== useMutation method end ====================

export const usePostMutationWitFormData = ({ options }: USE_MUTATION_TYPE) => {
  return useMutation<AxiosResponse<any, any>, Error, any, unknown>({
    mutationFn: ({ api, data }: { api: API; data: FormData }) =>
      axios.post(api, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    ...options,
  });
};

// ==================== useMutation put method start ====================
const putApi = (api: API, data: object) => {
  return axios.put(api, data);
};

export const usePutMutation = ({ options }: USE_MUTATION_TYPE) => {
  return useMutation<AxiosResponse<any, any>, Error, any, unknown>({
    mutationFn: ({ api, data }: { api: API; data: object }) =>
      putApi(api, data),
    ...options,
  });
};

// ==================== useMutation patch method end ====================
const patchApi = (api: API, data: object) => {
  return axios.patch(api, data);
};

export const usePatchMutation = ({ options }: USE_MUTATION_TYPE) => {
  return useMutation({
    mutationFn: ({ api, data }: any) => patchApi(api, data),
    ...options,
  });
};

// ==================== useMutation patch method end ====================

export const useGetMutation = () => {
  return useMutation({
    mutationFn: ({ api }: any) => axios.get(api),
  });
};

// delete api
const deleteApi = (api: any) => {
  return axios.delete(api);
};

export const useDeleteMutation = ({ options }: any) => {
  return useMutation({
    mutationFn: ({ api }: any) => deleteApi(api),
    ...options,
  });
};
