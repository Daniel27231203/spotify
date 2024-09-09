import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    playList: build.query<PLAYLIST.PlayListResponce, PLAYLIST.PlayListRequest>({
      query: (query) => ({
        url: "/me/playlists",
        method: "GET",
        params: {
          q: query,
          limit: 15,
        },
      }),
    }),
    playListContent: build.query<
      PLAYLIST.PlayListWithIDResponce,
      PLAYLIST.PlayListWithIDRequest
    >({
      query: (id) => ({
        url: `/playlists/${id}`,
        method: "GET",
      }),
    }),
  }),
});
export const { usePlayListQuery, usePlayListContentQuery } = api;
