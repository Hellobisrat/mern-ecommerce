import Cart from '../models/Cart.js'
import Product from '../models/Product.js'

export const addToCart = async (req, res) => {
  const { userId, productId, variantId, price, quantity } = req.body;

  try {
    // Try updating existing item
    const updated = await Cart.findOneAndUpdate(
      {
        userId,
        "items.productId": productId,
        "items.variantId": variantId
      },
      {
        $inc: { "items.$.quantity": quantity }
      },
      { new: true }
    );

    if (updated) {
      return res.status(200).json({
        message: "Quantity updated",
        cart: updated
      });
    }

    // Otherwise push new item
    const pushed = await Cart.findOneAndUpdate(
      { userId },
      {
        $push: { items: { productId, variantId, price, quantity } }
      },
      { new: true, upsert: true }
    );

    return res.status(200).json({ message: "Item added", cart: pushed });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



export const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(200).json({
        message: "Cart is empty",
        cart: { items: [], totalPrice: 0 }
      });
    }

    return res.status(200).json({ cart });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { userId, productId, variantId, quantity } = req.body;

    if (quantity < 0) {
      return res.status(400).json({ message: "Quantity cannot be negative" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedCart = await Cart.findOneAndUpdate(
      {
        userId,
        "items.productId": productId,
        "items.variantId": variantId
      },
      {
        $set: { "items.$.quantity": quantity }
      },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    return res.status(200).json({
      message: "Updated successfully",
      cart: updatedCart
    });

  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const removeFromCart = async (req, res) => {
  const { userId, productId, variantId } = req.body;

  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      {
        $pull: { items: { productId, variantId } }
      },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Item removed", cart: updatedCart });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export const clearCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const cleared = await Cart.findOneAndUpdate(
      { userId },
      { $set: { items: [] } },
      { new: true }
    );

    if (!cleared) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res.status(200).json({
      message: "Cart cleared successfully",
      cart: cleared
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};