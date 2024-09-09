import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getCategorySeveral: build.query<
      CATEGORY.GetCategoriesResponse,
      CATEGORY.GetCategoriesRequest
    >({
      query: (query) => ({
        url: "/browse/categories",
        method: "GET",
        params: {
          q: query,
          limit: 50,
        },
      }),
    }),
  }),
});

export const { useGetCategorySeveralQuery } = api;
