"use client";

import React, { useCallback } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import { Popover } from "@mantine/core";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { errorToast } from "@/lib/utils";
import useRentModal from "@/hooks/useRentModal";
import { useUserContext } from "../providers/UserProvider";
import { useRouter } from "next/navigation";

const UserMenu = () => {
  const {currentUser} = useUserContext();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      errorToast(error, "Failed to sign out");
    }
  }

  const onRent = useCallback(() => {
    if (!currentUser) return loginModal.onOpen();

    rentModal.onOpen();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  return (
    <section className="relative">
      <div className="flex items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-clampSm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          AirTnT your home
        </div>
        <Popover width={200} position="bottom-end">
          <Popover.Target>
            <div className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
              <AiOutlineMenu />
              <div className="hidden md:block">
                <Avatar sessionImg={currentUser?.image} />
              </div>
            </div>
          </Popover.Target>

          <Popover.Dropdown className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm p-2">
            <div className="flex flex-col">
              {currentUser ? (
                <>
                  <MenuItem onClick={() => router.push("/trips")} label="My trips" />
                  <MenuItem onClick={() => router.push("/favorites")} label="My favorites" />
                  <MenuItem onClick={() => router.push("/reservations")} label="My Reservations" />
                  <MenuItem onClick={() => router.push("/properties")} label="My properties" />
                  <MenuItem onClick={rentModal.onOpen} label="AirTnT My home" />

                  <hr />
                  <MenuItem onClick={handleSignOut} label="Log out" />
                </>
              ) : (
                <>
                  <MenuItem onClick={registerModal.onOpen} label="Sign up" />
                  <MenuItem onClick={loginModal.onOpen} label="Login" />
                </>
              )}
            </div>
          </Popover.Dropdown>
        </Popover>
      </div>
    </section>
  );
};

export default UserMenu;
