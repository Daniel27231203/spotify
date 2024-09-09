"use client";
import { useGetMeQuery } from "@/redux/api/me";
import scss from "./Header.module.scss";
import { FaSpotify } from "react-icons/fa";
import Link from "next/link";
import { BiSolidHome } from "react-icons/bi";
import { IoMdSearch } from "react-icons/io";
import { MdOutlinePreview } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { CiSaveDown1 } from "react-icons/ci";
import { useState } from "react";
import SearchTracks from "@/components/shared/SearchTracks";

const Header = () => {
  const { data: session } = useGetMeQuery();
  console.log("🚀 ~ Header ~ session:", session);
  const [modalUser, setModalUser] = useState(false);

  const hanleLogIn = () => {
    window.open(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/auth/login`,
      "_self"
    );
  };
  const hanleLogOut = () => {
    window.open(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/auth/logout`,
      "_self"
    );
  };
  return (
    <header className={scss.Header}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.logo}>
            <Link href="/">
              <FaSpotify />
            </Link>
          </div>
          <div className={scss.search}>
            <button className={scss.searchHomeIcon}>
              <BiSolidHome />
            </button>
            <div className={scss.search_inputBlock}>
              <SearchTracks />
              <button className={scss.search_inputBlock__btnLeft}>
                <IoMdSearch />
              </button>
              <button className={scss.search_inputBlock__btnRight}>
                <div className={scss.searchLine}></div>
                <MdOutlinePreview />
              </button>
            </div>
          </div>
          <div className={scss.auth}>
            <button>Узнать больше о Premium</button>
            <button>
              <CiSaveDown1 />
              установить приложения
            </button>
            <button className={scss.authNotation}>
              <IoIosNotifications />
            </button>
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
              alt="img"
              onClick={() => setModalUser(!modalUser)}
            />
            {modalUser ? (
              <div className={scss.modalUser}>
                <h4>Аккаунт</h4>
                <h4>Профиль</h4>
                <h4>вход на Premium</h4>
                <h4>Настройки</h4>
                <hr />
                {session ? (
                  <button onClick={hanleLogOut}>выйти</button>
                ) : (
                  <button onClick={hanleLogIn}>вход</button>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
