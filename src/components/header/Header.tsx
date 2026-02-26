"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import CloseIcon from "../../../public/assets/icons/CloseIcon";
import MenuIcon from "../../../public/assets/icons/MenuIcon";
import SocialHeader from "./SocialHeader";

const Header = () => {
  //
  const [menuOpen, setMenuOpen] = useState(false);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [menuOpen]);

  return (
    <>
      {/* social icons header */}
      <div className="w-full bg-[#DBDBDB] py-5 px-3">
        <SocialHeader />
      </div>

      {/* main header */}
      <header className="bg-white w-full">
        <div className="flex items-center justify-between p-3 w-[95%] mx-auto">
          <div className="w-full flex items-center justify-between lg:justify-start gap-5 lg:gap-36">
            {/* Left section - Logo */}
            <Link href="/" className="min-w-20 aspect-square relative block">
              <Image
                quality={75}
                src="/assets/bluelogo.webp"
                alt="meow aesthetics"
                sizes="80px"
                decoding="async"
                fill
                priority={true}
              />
            </Link>

            {/* Desktop navbar */}
            <div className="hidden lg:flex">
              <Navbar />
            </div>

            {/* Mobile menu icon */}
            <div className="flex lg:hidden">
              {menuOpen ? (
                <CloseIcon onClick={() => setMenuOpen(!menuOpen)} />
              ) : (
                <MenuIcon onClick={() => setMenuOpen(!menuOpen)} />
              )}
            </div>
          </div>
        </div>

        {/* Mobile dropdown nav */}
        {menuOpen && (
          <div className="lg:hidden bg-white shadow-2xl w-80 h-svh absolute top-0 right-0 z-50 flex flex-col p-5">
            <div className="flex items-center justify-end p-1">
              <CloseIcon onClick={() => setMenuOpen(!menuOpen)} />
            </div>

            <Navbar onLinkClick={() => setMenuOpen(false)} />
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
