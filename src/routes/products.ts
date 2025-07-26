import express from 'express';
import Product from '../models/Product';
import Chef from '../models/Chef';

const router = express.Router();

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, cuisine, search, limit = 20, page = 1 } = req.query;
    const filter: any = { isActive: true, 'availability.isAvailable': true };

    // Apply filters
    if (category && category !== 'All') {
      filter.category = category;
    }
    if (cuisine && cuisine !== 'All') {
      filter.cuisine = cuisine;
    }
    if (search) {
      filter.$text = { $search: search as string };
    }

    // Calculate pagination
    const skip = (Number(page) - 1) * Number(limit);

    // Get products with chef information
    const products = await Product.find(filter)
      .populate('chefId', 'businessName rating')
      .sort({ 'rating.average': -1, createdAt: -1 })
      .limit(Number(limit))
      .skip(skip);

    const total = await Product.countDocuments(filter);

    return res.json({
      success: true,
      data: {
        products,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit))
        }
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching products'
    });
  }
});

// @route   GET /api/products/:id
// @desc    Get product by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('chefId', 'businessName rating serviceArea');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    return res.json({
      success: true,
      data: { product }
    });
  } catch (error) {
    console.error('Get product error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching product'
    });
  }
});

// @route   POST /api/products
// @desc    Create new product
// @access  Private (Chef only)
router.post('/', async (req, res) => {
  try {
    const {
      chefId,
      name,
      description,
      category,
      cuisine,
      images,
      price,
      servings,
      cookTime,
      prepTime,
      difficulty,
      ingredients,
      nutritionalInfo,
      tags,
      dietary,
      spiceLevel,
      instructions,
      availability
    } = req.body;

    // Verify chef exists
    const chef = await Chef.findById(chefId);
    if (!chef) {
      return res.status(404).json({
        success: false,
        message: 'Chef not found'
      });
    }

    // Create new product
    const product = new Product({
      chefId,
      name,
      description,
      category,
      cuisine,
      images,
      price,
      servings,
      cookTime,
      prepTime,
      difficulty,
      ingredients,
      nutritionalInfo,
      tags,
      dietary,
      spiceLevel,
      instructions,
      availability
    });

    await product.save();

    return res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: { product }
    });
  } catch (error) {
    console.error('Create product error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error creating product'
    });
  }
});

// @route   PUT /api/products/:id
// @desc    Update product
// @access  Private (Chef only)
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    return res.json({
      success: true,
      message: 'Product updated successfully',
      data: { product }
    });
  } catch (error) {
    console.error('Update product error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error updating product'
    });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete product
// @access  Private (Chef only)
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    return res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error deleting product'
    });
  }
});

export default router; 