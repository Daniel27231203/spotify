"use client";
import { usePlayListQuery } from "@/redux/api/playList";
import scss from "./PlayList.module.scss";
import { TbPlaylistAdd } from "react-icons/tb";
import { useRouter } from "next/navigation";

const PlayList = () => {
  const { data: play } = usePlayListQuery();
  console.log("🚀 ~ PlayList ~ data:", play);
  const router = useRouter();

  return (
    <section className={scss.playList}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.playListIcons}>
            <TbPlaylistAdd />
          </div>
          <div className={scss.playListBlock}>
            <div className={scss.playListBox}>
              {play?.items.map((el) => (
                <div
                  onClick={() => {
                    router.push(`/playList/${el.id}`);
                  }}
                  key={el.id}
                  className={scss.playListBoxBlock}
                >
                  <img src={el.images[0].url} alt="" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlayList;
