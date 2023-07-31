import { API } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { MouseEvent, useCallback, useMemo, useState } from "react";

import useLoginModal from "./useLoginModal";
import { errorToast } from "@/lib/utils";
import { useUserContext } from "@/components/providers/UserProvider";

interface IUseFavorite {
  listingId: string;
}

const useFavorite = ({ listingId }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { currentUser } = useUserContext();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [listingId, currentUser]);

  const [isFavorite, setIsFavorite] = useState(hasFavorited);

  const toggleFavorite = useCallback(
    async (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!currentUser) return loginModal.onOpen();
      setIsFavorite(prev => !prev);

      try {
        await API.patch(`/api/favorites/${listingId}`);
        router.refresh();
      } catch (error) {
        setIsFavorite(prev => !prev);
        errorToast(error, "Failed to perform action on favorites");
      }
    },
    [currentUser, listingId, loginModal, router]
  );

  return {isFavorite, toggleFavorite};
};

export default useFavorite;
