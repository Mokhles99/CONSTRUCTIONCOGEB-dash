const Cart = require('../models/cart.model');

exports.createCart = async (req, res) => {
    try {
        const cart = new Cart({
            // userInfo: req.body.userInfo,
            items: req.body.items,
            total: req.body.total
        });
        
        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        res.status(400).json({ message: "Error creating cart", error: error.message });
    }
};

exports.updateCart = async (req, res) => {
    try {
        const { cartId } = req.params;
        const updatedCart = await Cart.findByIdAndUpdate(cartId, {
            $set: {
                userInfo: req.body.userInfo
            }
        }, { new: true });

        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(400).json({ message: "Error updating cart", error: error.message });
    }
};

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id).populate('items.product');
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Compute the total number of items in the cart
        const itemCount = cart.items.reduce((total, item) => total + item.quantity, 0);

        // Include itemCount in the response
        res.json({ cart, itemCount });
    } catch (error) {
        res.status(400).json({ message: "Error fetching cart", error: error.message });
    }
};


exports.deleteCart = async (req, res) => {
    try {
        const cart = await Cart.findByIdAndRemove(req.params.id);
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.json({ message: "Cart deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error deleting cart", error: error.message });
    }
};
