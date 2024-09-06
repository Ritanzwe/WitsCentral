const express = require('express');
const router = express.Router();
const Shops = require('../models/shop.models');
const Product = require('../models/product.model');
const User = require('../models/user.model');
const upload = require('../middlewares/upload');
const { authenticate } = require('../middlewares/authprotect');

router.post('/',authenticate, upload.single('image'), async (req, res) => {
  try {
    const { name, location, description, contactInfo } = req.body;
    const userId = req.user.id; // Assuming user is logged in and req.user exists

    // Get the image URL
    const image = req.file ? `/uploads/${req.file.filename}` : ''; 

    const shop = new Shops({
      owner: userId,
      name,
      location,
      description,
      contactInfo,
      image,
    });

    await shop.save();

    // Update user model to reference the new shop
    await User.findByIdAndUpdate(userId, { shop: shop._id, isShopOwner: true });

    res.status(201).json({ shop });
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Failed to create shop' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const shop = await Shops.findById(req.params.id).populate('products');
    if (!shop) return res.status(404).json({ error: 'Shop not found' });

    res.status(200).json(shop);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch shop details' });
  }
});

// Delete a shop
router.delete('/:shopId', authenticate, async (req, res) => {
  try {
    const { shopId } = req.params;

    // Remove the shop and its associated products
    await Product.deleteMany({ shop: shopId });
    const shop = await Shops.findByIdAndDelete(shopId);
    
    if (!shop) return res.status(404).json({ success: false, error: 'Shop not found' });

    // Remove the shop reference from the user model
    await User.findByIdAndUpdate(shop.owner, { $unset: { shop: '' }, isShopOwner: false });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete shop' });
  }
});

router.get('/', async (req, res) => {
  try {
    const shops = await Shops.find({}).populate("owner");

    res.status(200).json(shops);
  } catch (error) {
    console.error('Error fetching shops:', error);
    res.status(500).json({ error: 'Failed to fetch shop details' });
  }
});


router.post('/:shopId/products', authenticate, upload.single('image'), async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const shopId = req.params.shopId;

    // Handle image URL
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    const product = new Product({
      name,
      description,
      price,
      image, // Save image URL
      shop: shopId,
    });

    await product.save();

    // Add the product to the shop's products array
    await Shops.findByIdAndUpdate(shopId, { $push: { products: product._id } });

    res.status(201).json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// Edit an existing product (stock item)
router.put('/:shopId/products/:productId',authenticate, upload.single('image'), async (req, res) => {
    try {
      const { name, description, price, imageUrl } = req.body;
      const productId = req.params.productId;
  
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { name, description, price, imageUrl },
        { new: true }
      );
  
      if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });
  
      res.status(200).json({ success: true, product: updatedProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update product' });
    }
});

// Delete a product (stock item)
router.delete('/:shopId/products/:productId',authenticate, async (req, res) => {
    try {
      const productId = req.params.productId;
  
      const product = await Product.findByIdAndDelete(productId);
  
      if (!product) return res.status(404).json({ error: 'Product not found' });
  
      // Remove product reference from the shop's products array
      await Shops.findByIdAndUpdate(product.shop, { $pull: { products: product._id } });
  
      res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete product' });
    }
});


module.exports = router;

