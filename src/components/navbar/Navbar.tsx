"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Categories from "./Categories";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const navbarRef = useRef<HTMLElement | null>(null);
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const sticky = navbarRef?.current?.offsetTop!;

    const handleScroll = () => {
      window.scrollY > sticky ? setSticky(true) : setSticky(false)
    }

    window.addEventListener("scroll",handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav ref={navbarRef} className={cn("top-0 w-full bg-white z-10", {
      "fixed" : sticky,
    })}>
      <div className="py-4 border-b-[1px] border-gray-100">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>

      {/* categories */}
      <Categories />
    </nav>
  );
};

export default Navbar;
