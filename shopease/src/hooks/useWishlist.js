
import { useMemo } from 'react';
import useLocalStorage from './useLocalStorage';

export default function useWishlist() {
  const [wishlist, setWishlist] = useLocalStorage(
    'shopease_wishlist',
    []
  );

  // Add a product if it is not already saved.
  const addToWishlist = (product) => {
    if (product?.id == null) return;

    setWishlist((previousWishlist) => {
      const alreadyExists = previousWishlist.some(
        (item) => item.id === product.id
      );

      if (alreadyExists) {
        return previousWishlist;
      }

      return [...previousWishlist, product];
    });
  };

  // Remove a product from the wishlist.
  const removeFromWishlist = (productId) => {
    if (productId == null) return;

    setWishlist((previousWishlist) =>
      previousWishlist.filter(
        (item) => item.id !== productId
      )
    );
  };

  // Toggle wishlist status.
  const toggleWishlist = (product) => {
    if (product?.id == null) return false;

    const alreadyExists = wishlist.some(
      (item) => item.id === product.id
    );

    setWishlist((previousWishlist) =>
      previousWishlist.some((item) => item.id === product.id)
        ? previousWishlist.filter((item) => item.id !== product.id)
        : [...previousWishlist, product]
    );

    return !alreadyExists;
  };

  // Check whether a product is saved.
  const isWishlisted = (productId) => {
    if (productId == null) return false;

    return wishlist.some(
      (item) => item.id === productId
    );
  };

  // Calculate the total number of wishlist products.
  const wishlistCount = useMemo(
    () => wishlist.length,
    [wishlist]
  );

  return {
    wishlist,
    setWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isWishlisted,
    wishlistCount
  };
}
