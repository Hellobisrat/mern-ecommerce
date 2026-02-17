
import Order from "../models/Order.js";

export const createOrder = async (req,res)=>{
  try {
    const {
      userId,
      items,
      shippingAddress,
      payment,
      totals
    } = req.body;

    if (!userId || !items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid order data" });
    }

    const order = await Order.create({
      userId,
      items,
      shippingAddress,
      payment,
      totals,
      status: "pending",
      history: [{ status: "pending" }]
    });

    return res.status(201).json({success:true,order})
  } catch (error) {
    res.status(500).json({success:false,message:error.message})
  }
}

export const getUserOrder = async (req,res)=>{
  try {
   const userId = req.user?._id || req.params.userId;

    const orders = await Order.find({ userId })
      .populate("userId", "name email")
      .populate("items.productId")
      .populate("items.variantId");

    res.status(200).json({ success: true, orders });

  } catch (error) {
    console.error("ADMIN ORDER ERROR:", error);
    res.status(500).json({success:false,message:error.message})
  }
}

export const updateOrderStatus = async (req,res)=>{
  try {
    const order = await Order.findById(req.params.id);

    if (!order)
      return res.status(404).json({ success: false, message: "Order not found" });

    order.status = req.body.status;
    order.history.push({ status: req.body.status });

    await order.save();

    res.json({ success: true, order });


  } catch (error) {
    res.status(500).json({success:false,message:error.message})
  }
}

export const deleteOrder =  async(req,res)=>{
  try {
   const order = await Order.findByIdAndDelete(req.params.id);

    if (!order)
      return res.status(404).json({ success: false, message: "Order not found" });

    return res.status(200).json({ success: true, message: "Order deleted" });

  } catch (error) {
    res.status(500).json({success:false,message:error.message})
  }
}