import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quotesApi = createApi({
  reducerPath: "quotesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.iex.cloud/v1/data/core/" }),
  endpoints: (builder) => ({
    getQuotes: builder.query<Quote[], string>({
      query: (collectionName) => ({
        url: `stock_collection/sector`,
        params: {
          collectionName,
          token: process.env.REACT_APP_SECRET_KEY,
        },
      }),
    }),
  }),
});

export const { useGetQuotesQuery } = quotesApi;

export const changeOrder = (arg: {
  collectionName: string;
  sourceIndex: number;
  destinationIndex: number;
  page: number;
  itemsPerPage: number;
}) =>
  quotesApi.util.updateQueryData(
    "getQuotes",
    arg.collectionName,
    (draftQuotes) => {
      const { destinationIndex, itemsPerPage, page, sourceIndex } = arg;
      const movedElement = draftQuotes.splice(
        page * itemsPerPage + sourceIndex,
        1
      );
      draftQuotes.splice(
        page * itemsPerPage + destinationIndex,
        0,
        movedElement[0]
      );
    }
  );
