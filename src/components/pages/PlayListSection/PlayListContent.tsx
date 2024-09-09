// components/PlayListContent.tsx
"use client";

import { useParams } from "next/navigation";
import React, { useState } from "react";
import scss from "./PlayListContent.module.scss";
import { usePlayListContentQuery } from "@/redux/api/playList";
import { MdPlayCircle } from "react-icons/md";
import { RxDotsHorizontal } from "react-icons/rx";
import { IoIosList } from "react-icons/io";
import { HiMiniClock } from "react-icons/hi2";
import { usePlayerStore } from "@/stores/usePlayerStore";
// @ts-ignore
import { ColorExtractor } from "react-color-extractor";

const PlayListContent: React.FC = () => {
  const params = useParams();
  const { data } = usePlayListContentQuery(String(params.playListQuery));
  const { setTrackUris, setTrackIndex, activeUri, setActiveUri } =
    usePlayerStore();
  const [bgColor, setBgColor] = useState("#ffffff");

  const timeCode = data?.tracks.items.map(
    (el) => el.track.duration_ms / 1000 / 60
  );
  const time = timeCode?.reduce((acc, el) => acc + +el, 0);
  const min = String(time).slice(0, 2);
  const sec = String(time).slice(3, 5);

  const playMusic = async (index: number) => {
    const tracksUrisFilter = data?.tracks.items.map((item) => item.track.uri);
    setTrackUris(tracksUrisFilter!);
    setTrackIndex(index);
  };

  const filterActiveTrack = (uri: string) => {
    const activeTrack = data?.tracks.items.find((el) => el.track.uri === uri);
    setActiveUri(activeTrack?.track.uri!);
  };

  const handleColors = (colors: string[]) => {
    if (colors.length > 0) {
      setBgColor(colors[0]);
    }
  };

  return (
    <section className={scss.PlayListContent}>
      <div className="container">
        <div
          style={{
            background: `linear-gradient(180deg, ${bgColor} 11%, rgba(44,44,45,1) 61%)`,
          }}
          className={scss.content}
        >
          <div className={scss.playListContentHeader}>
            <ColorExtractor getColors={handleColors}>
              <img src={data?.images[0]?.url} alt="" />
            </ColorExtractor>
            <div className={scss.playListContentHeaderTitle}>
              <p>Плейлист</p>
              <h1>{data?.name}</h1>
              <div className={scss.playListContentHeaderTitleName}>
                <h5>{data?.owner.display_name}</h5>
                <p>
                  {data?.tracks.items.length} треков, {min} минут. {sec} сек.
                </p>
              </div>
            </div>
          </div>
          <div className={scss.playListHero}>
            <div className={scss.playListHeroUp}>
              <div className={scss.playListHeroUpBox}>
                <button className={scss.playListHeroUpBoxBtn}>
                  <MdPlayCircle />
                </button>
                <button>
                  <RxDotsHorizontal />
                </button>
              </div>
              <div className={scss.playListHeroUpBoxTwo}>
                <p>Список</p>
                <button>
                  <IoIosList />
                </button>
              </div>
            </div>
            <div className={scss.playListHeroBlock}>
              <div className={scss.playListHeroBlockTitle}>
                <div className={scss.playListHeroBlockTitleF}>
                  <p>#</p>
                  <p>название</p>
                </div>
                <p>Альбом</p>
                <p>Дата добавление</p>
                <p>
                  <HiMiniClock />
                </p>
              </div>
            </div>
            <div className={scss.playListHeroBoxes}>
              {data?.tracks.items.map((el, index) => (
                <div
                  onClick={() => {
                    playMusic(index);
                    filterActiveTrack(el.track.uri);
                  }}
                  key={index}
                  className={
                    activeUri === el.track.uri
                      ? `${scss.active} ${scss.playListHeroBox}`
                      : scss.playListHeroBox
                  }
                >
                  <div className={scss.playListHeroBoxF}>
                    <p>{index + 1}</p>
                    <div className={scss.playListHeroBoxFBox}>
                      <img src={el.track.album.images[0].url} alt="" />
                      <div className={scss.playListHeroBoxFBoxTitle}>
                        <h6>{el.track.name}</h6>
                        <p>{el.track.artists[0].name}</p>
                      </div>
                    </div>
                  </div>
                  <p className={scss.name}>{el.track.album.name}</p>
                  <p className={scss.added_at}>
                    {el.added_at.split("T")[1].slice(1, 2)} часов назад
                  </p>
                  <p>
                    {String(+el.track.duration_ms / 1000 / 60)
                      .slice(0, 4)
                      .split(".")
                      .join(":")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlayListContent;
