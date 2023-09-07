import React, { useState } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { TiMicrophone } from "react-icons/ti";
import { BsYoutube, BsCameraVideo, BsBell } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoAppsSharp } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { changeSearchTerm, clearSearchTerm, clearVideos } from "../store";
import { getSearchParamsForLocation } from "react-router-dom/dist/dom";
import { getSearchPageVideos } from "../store/reducers/getSearchPageVideos";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm);
  const handleSearch = () => {
    if (location.pathname != "/search") navigate("/search");
    else {
      dispatch(clearVideos());
      dispatch(getSearchPageVideos(false));
    }
  };

  return (
    <div className="flex justify-between items-center px-14 h-14 bg-[#181818] opacity-95 sticky top-0">
      <div className="flex gap-8 items-center text-2xl">
        <div className="flex items-center gap-6 cursor-pointer">
          <GiHamburgerMenu className="cursor-pointer text-gray-400" />
        </div>
        <Link to="/">
          <div className="flex gap-1 items-center justify-center cursor-pointer">
            {/* <BsYoutube className="text-3xl text-red-600" /> */}
            <img
              className="w-10 h-10"
              src="https://www.iconpacks.net/icons/2/free-youtube-logo-icon-2431-thumb.png"
              alt="img"
            />
            <span className="text-xl font-medium text-white">YouTube</span>
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-center gap-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          action=""
        >
          <div className="flex bg-zinc-900 items-center h-10 px-4 pr-0 rounded-full border-[1px] border-[#65656573]">
            <div className="flex gap-4 items-center pr-5">
              <div>
                <AiOutlineSearch className="text-xl text-white" />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="w-96 bg-zinc-900 text-white focus:outline-none border-none"
                value={searchTerm}
                onChange={(e) => dispatch(changeSearchTerm(e.target.value))}
              />
              <AiOutlineClose
                className={`text-xl cursor-pointer text-white ${
                  !searchTerm ? "invisible" : "visible"
                }`}
                onClick={() => dispatch(clearSearchTerm())}
              />
            </div>
            <button className="h-10 w-16 flex items-center justify-center bg-zinc-800 rounded-r-full border-[1px] border-[#65656573]">
              <AiOutlineSearch className="text-2xl text-white" />
            </button>
          </div>
        </form>

        <div className="text-xl p-3 bg-zinc-800 rounded-full cursor-pointer">
          <TiMicrophone />
        </div>
      </div>
      <div className="flex gap-5 items-center text-xl">
        <BsCameraVideo />
        {/* <IoAppsSharp /> */}
        <div className="relative">
          <BsBell />
          <span className="absolute bottom-2 left-2 text-xs bg-red-600 rounded-full px-2">
            9+
          </span>
        </div>
        <div>
          <img
            src="https://www.imgcorporations.com/images/bg-img.jpg"
            className="w-7 h-7 rounded-full cursor-pointer"
            alt="logo"
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
