import { baseApi } from '@/redux/services/base-api';

export const patentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchPatentFromUSPTO: builder.mutation({
      query: (patentId) => ({
        url: '/fetch-patent-from-uspto',
        method: 'POST',
        body: { patentId },
      }),
      invalidatesTags: ['Patents', 'Cases'],
    }),
  }),
});

export const { useFetchPatentFromUSPTOMutation } = patentApi;
