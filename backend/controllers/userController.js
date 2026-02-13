import User from "../models/User.js";

// =========================
// ADMIN: GET ALL USERS
// =========================
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// ADMIN: GET USER BY ID
// =========================
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// ADMIN: UPDATE USER (role, email, name)
// =========================
export const updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save();

    res.json({
      message: "User updated",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// ADMIN: DELETE USER
// =========================
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    await user.deleteOne();

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// USER: ADD ADDRESS
// =========================
export const addAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.addresses.push(req.body);
    await user.save();

    res.json({ message: "Address added", addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// USER: DELETE ADDRESS
// =========================
export const deleteAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.addresses = user.addresses.filter(
      (addr) => addr._id.toString() !== req.params.addressId
    );

    await user.save();

    res.json({ message: "Address removed", addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// USER: SET DEFAULT ADDRESS
// =========================
export const setDefaultAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.addresses.forEach((addr) => {
      addr.isDefault = addr._id.toString() === req.params.addressId;
    });

    await user.save();

    res.json({ message: "Default address set", addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// USER: ADD TO WISHLIST
// =========================
export const addToWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user.wishlist.includes(req.body.productId)) {
      return res.status(400).json({ message: "Already in wishlist" });
    }

    user.wishlist.push(req.body.productId);
    await user.save();

    res.json({ message: "Added to wishlist", wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// USER: REMOVE FROM WISHLIST
// =========================
export const removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== req.params.productId
    );

    await user.save();

    res.json({ message: "Removed from wishlist", wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};