// services/userService.js
import User from "../models/User.js";

export const addToWishlistService = async (userId, productId) => {
  return User.findByIdAndUpdate(
    userId,
    { $addToSet: { wishlist: productId } },
    { new: true }
  );
};

export const removeFromWishlistService = async (userId, productId) => {
  return User.findByIdAndUpdate(
    userId,
    { $pull: { wishlist: productId } },
    { new: true }
  );
};

export const addAddressService = async (userId, address) => {
  return User.findByIdAndUpdate(
    userId,
    { $push: { addresses: address } },
    { new: true }
  );
};