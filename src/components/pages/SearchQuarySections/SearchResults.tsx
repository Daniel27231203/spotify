"use client";
import { useParams } from "next/navigation";
import scss from "./SearchResults.module.scss";
import { useSearchTracksQuery } from "@/redux/api/search";
import { usePlayerStore } from "@/stores/usePlayerStore";

const SearchResults = () => {
  const { searchQuery } = useParams();
  const decodeText = decodeURIComponent(String(searchQuery));
  const { data, isLoading } = useSearchTracksQuery(decodeText);
  const { setTrackUris, setTrackIndex, activeUri, setActiveUri } =
    usePlayerStore();

  const playMusic = async (index: number) => {
    const tracksUrisFilter = data?.tracks.items.map((item) => item.uri);
    setTrackUris(tracksUrisFilter!);
    setTrackIndex(index);
  };

  const filterActiveTrack = (uri: string) => {
    const activeTrack = data?.tracks.items.find((el) => el.uri === uri);
    setActiveUri(activeTrack?.uri!);
  };

  return (
    <section className={scss.SearchResults}>
      <div className="container">
        <div className={scss.content}>
          {isLoading ? (
            <div className={scss.loadering}>
              <div className={scss.loader}></div>
            </div>
          ) : (
            <div className={scss.SearchResultsBlocks}>
              <div className={scss.SearchResultsBlock}>
                <div className={scss.SearchResultsBlockBox}>
                  {data?.tracks.items.map((track, index) => (
                    <>
                      {index === 0 && (
                        <div
                          key={track.id}
                          className={scss.SearchResultsBLockBoxLeft}
                          onClick={() => {
                            playMusic(index);
                          }}
                        >
                          <h1>Лучший результат</h1>
                          <div className={scss.SearchResultsBlockBoxLeftBox}>
                            <img
                              src={track.album.images[0].url}
                              alt={track.name}
                            />
                            <h3>{track.name}</h3>
                            <p>{track.artists[0].name}</p>
                          </div>
                        </div>
                      )}
                    </>
                  ))}

                  <div className={scss.SearchResultsBlockBoxRight}>
                    <h1>Треки</h1>
                    <div className={scss.SearchResultsBlockRightBox}>
                      {data?.tracks.items.map((track, index) => (
                        <>
                          {index >= 0 && (
                            <div
                              key={track.id}
                              className={
                                activeUri === track.uri
                                  ? `${scss.SearchResultsBlockBoxRightBox} ${scss.active}`
                                  : `${scss.SearchResultsBlockBoxRightBox}`
                              }
                              onClick={() => {
                                filterActiveTrack(track.uri);
                                playMusic(index);
                              }}
                            >
                              <div
                                className={
                                  scss.SearchResultsBlockBoxRightBoxTrack
                                }
                              >
                                <div
                                  className={
                                    scss.SearchResultsBlockBoxRightBoxTrackBo
                                  }
                                >
                                  <img
                                    src={track.album.images[0].url}
                                    alt={track.name}
                                  />
                                  <div
                                    className={
                                      scss.SearchResultsBlockBoxRightBoxTrackTitle
                                    }
                                  >
                                    <h3>{track.name}</h3>
                                    <p>{track.artists[0].name}</p>
                                  </div>
                                </div>
                                <div
                                  className={
                                    scss.SearchResultsBlockBoxRightBoxTrackTime
                                  }
                                >
                                  <span>
                                    {String(+track.duration_ms / 1000 / 60)
                                      .slice(0, 4)
                                      .split(".")
                                      .join(":")}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {data?.tracks.items.length === 0 && (
                <p>No results found for: {decodeText}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchResults;
