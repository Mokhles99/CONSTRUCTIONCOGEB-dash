const Product = require('../models/product.model');
const Carttwo = require('../models/carttwo.model');

// exports.addToCarttwo = async (req, res) => {
//     console.log("Request received for addToCarttwo with body:", req.body);
//   const { productId, quantity } = req.body;

//   try {
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     let cart = await Carttwo.findOne(); // Find any existing cart
//     if (!cart) {
//       // If no cart exists, create a new one with only the product and quantity
//       cart = new Carttwo({
//         items: [{ product: productId, quantity }]
//       });
//     } else {
//       // Check if product is already in the cart
//       const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
//       if (itemIndex > -1) {
//         // Update quantity if product is already in the cart
//         cart.items[itemIndex].quantity += quantity;
//       } else {
//         // Add new product to the cart if it's not already there

//         cart.items.push({ product: productId, quantity });
//       }
//     }

//     await cart.save();
//     res.status(200).json(cart);
//   } catch (error) {
//     console.error("Error in addToCarttwo:", error);
//     res.status(500).json({ message: "Error adding to cart", error: error.message });
//   }
// };

const mongoose = require('mongoose');

// exports.addToCarttwo = async (req, res) => {
//   const { cartId } = req.params; // Récupération de cartId depuis les paramètres de route
//   const { productId, quantity } = req.body;

//   if (!mongoose.Types.ObjectId.isValid(productId)) {
//     return res.status(400).json({ message: "Invalid product ID format." });
//   }

//   try {
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     let cart = await Carttwo.findOne({ cartId: cartId });
//     if (!cart) {
//       // Si le panier n'existe pas, en créer un nouveau avec cet ID
//       cart = new Carttwo({
//         cartId: cartId,
//         items: [{ product: productId, quantity }]
//       });
//     } else {
//       // Si le produit est déjà dans le panier, augmenter la quantité
//       const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
//       if (itemIndex > -1) {
//         cart.items[itemIndex].quantity += quantity;
//       } else {
//         cart.items.push({ product: productId, quantity });
//       }
//     }

//     await cart.save();
//     res.status(200).json(cart);
//   } catch (error) {
//     console.error("Error in addToCarttwo:", error);
//     res.status(500).json({ message: "Error adding to cart", error: error.message });
//   }
// };


// exports.addToCarttwo = async (req, res) => {
//   const { cartId } = req.params; // Récupération de cartId depuis les paramètres de route
//   const { productId, price, quantity } = req.body; // Récupération de productId, price, et quantity depuis le corps de la requête

//   // Vérification si le productId est valide
//   if (!mongoose.Types.ObjectId.isValid(productId)) {
//     return res.status(400).json({ message: "Invalid product ID format." });
//   }

//   try {
//     // Recherche du produit dans la base de données
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // Recherche du panier avec l'ID spécifié
//     let cart = await Carttwo.findOne({ cartId: cartId });
//     if (!cart) {
//       // Si le panier n'existe pas, en créer un nouveau avec cet ID
//       cart = new Carttwo({
//         cartId: cartId,
//         items: [{ product: productId, quantity, price }]
//       });
//     } else {
//       // Si le produit est déjà dans le panier, augmenter la quantité
//       const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
//       if (itemIndex > -1) {
//         cart.items[itemIndex].quantity += quantity;
//       } else {
//         cart.items.push({ product: productId, quantity, price });
//       }
//     }

//     // Sauvegarder les modifications dans la base de données
//     await cart.save();
//     res.status(200).json(cart); // Répondre avec le panier mis à jour
//   } catch (error) {
//     console.error("Error in addToCarttwo:", error);
//     res.status(500).json({ message: "Error adding to cart", error: error.message }); // Gérer les erreurs
//   }
// };

exports.addToCarttwo = async (req, res) => {
  const { cartId } = req.params;
  const { productId, quantity } = req.body;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid product ID format." });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Carttwo.findOne({ cartId: cartId });
    if (!cart) {
      cart = new Carttwo({
        cartId: cartId,
        items: [{ product: productId, quantity }]
      });
    } else {
      const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error in addToCarttwo:", error);
    res.status(500).json({ message: "Error adding to cart", error: error.message });
  }
};






exports.getCarttwo = async (req, res) => {
  const { cartId } = req.params; // Récupérer l'ID de panier à partir des paramètres de la route

  try {
    const cart = await Carttwo.findOne({ cartId: cartId }).populate('items.product');
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error: error.message });
  }
};

exports.updateCartWithUserInfo = async (req, res) => {
  const { cartId } = req.params;
  const { userInfo } = req.body;

  try {
    const updatedCart = await Carttwo.findOneAndUpdate(
      { cartId: cartId },  // Utiliser findOneAndUpdate avec un filtre sur cartId
      { userInfo: userInfo },
      { new: true, runValidators: true }
    ).populate('items.product');

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(updatedCart);
  } catch (error) {
    console.error("Error in updateCartWithUserInfo:", error);
    res.status(500).json({ message: "Error updating cart with user info", error: error.message });
  }
};

exports.updateItemQuantity = async (req, res) => {
  const { cartId, itemId } = req.params;
  const { quantity } = req.body;

  if (typeof quantity !== 'number' || quantity < 1) {
    return res.status(400).json({ message: "Invalid quantity. Must be a positive number." });
  }

  try {
    const cart = await Carttwo.findOne({ cartId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    cart.items[itemIndex].quantity = quantity;

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error updating item quantity:", error);
    res.status(500).json({ message: "Error updating item quantity", error: error.message });
  }
};


exports.removeItemFromCart = async (req, res) => {
  const { cartId, itemId } = req.params; 

  try {
      const cart = await Carttwo.findById(cartId); 
      if (!cart) {
          return res.status(404).json({ message: "Cart not found" }); 
      }

      // Filtrer les éléments pour enlever l'article spécifié
      cart.items = cart.items.filter(item => item._id.toString() !== itemId);

      await cart.save(); 
      res.status(200).json(cart); 
  } catch (error) {
      console.error("Error in removeItemFromCart:", error);
      res.status(500).json({ message: "Error removing item from cart", error: error.message }); 
  }
};




exports.getAllCarts = async (req, res) => {
  try {
    const carts = await Carttwo.find().populate('items.product');

    if (!carts.length) {
      return res.status(404).json({ message: "No carts found" });
    }

    res.status(200).json(carts);
  } catch (error) {
    console.error("Error in getAllCarts:", error);
    res.status(500).json({ message: "Error fetching carts", error: error.message });
  }
};

exports.countCarts = async (req, res) => {
  try {
    const cartCount = await Carttwo.countDocuments();
    res.status(200).json({ cartCount });
  } catch (error) {
    console.error("Error counting carts:", error);
    res.status(500).json({ message: "Error counting carts", error: error.message });
  }
};

// exports.getCarttwo = async (req, res) => {
//     try {
//         const cart = await Carttwo.findOne().populate('items.product');
//         if (!cart) {
//             return res.status(404).json({ message: "Cart not found" });
//         }
//         res.status(200).json(cart);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching cart", error: error.message });
//     }
// };






  