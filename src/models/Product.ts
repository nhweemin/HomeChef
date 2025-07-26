import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  chefId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  category: string;
  cuisine: string;
  images: string[];
  price: number;
  servings: number;
  cookTime: number; // in minutes
  prepTime: number; // in minutes
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: {
    name: string;
    quantity: string;
    allergens?: string[];
  }[];
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
  };
  tags: string[];
  dietary: string[]; // vegetarian, vegan, gluten-free, etc.
  spiceLevel: 'Mild' | 'Medium' | 'Hot' | 'Very Hot';
  instructions: string[];
  availability: {
    isAvailable: boolean;
    maxOrdersPerDay: number;
    advanceOrderDays: number;
  };
  rating: {
    average: number;
    count: number;
  };
  orders: {
    total: number;
    thisWeek: number;
    thisMonth: number;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>({
  chefId: {
    type: Schema.Types.ObjectId,
    ref: 'Chef',
    required: [true, 'Chef ID is required']
  },
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'Appetizers', 'Main Course', 'Desserts', 'Soups', 'Salads', 
      'Beverages', 'Snacks', 'Breakfast', 'Lunch', 'Dinner'
    ]
  },
  cuisine: {
    type: String,
    required: [true, 'Cuisine type is required'],
    enum: [
      'Italian', 'Chinese', 'Indian', 'Malay', 'Mexican', 'American', 'Japanese',
      'Thai', 'French', 'Korean', 'Mediterranean', 'Greek', 'Spanish',
      'Vietnamese', 'Lebanese', 'Moroccan', 'Indonesian', 'Hong Kong', 'Taiwanese', 
      'Health Food', 'Fusion', 'Other'
    ]
  },
  images: {
    type: [String],
    required: [true, 'At least one image is required'],
    validate: {
      validator: function(v: string[]) {
        return v && v.length > 0;
      },
      message: 'At least one image is required'
    }
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0.01, 'Price must be greater than 0']
  },
  servings: {
    type: Number,
    required: [true, 'Number of servings is required'],
    min: [1, 'Must serve at least 1 person']
  },
  cookTime: {
    type: Number,
    required: [true, 'Cook time is required'],
    min: [1, 'Cook time must be at least 1 minute']
  },
  prepTime: {
    type: Number,
    required: [true, 'Prep time is required'],
    min: [1, 'Prep time must be at least 1 minute']
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: [true, 'Difficulty level is required']
  },
  ingredients: [{
    name: {
      type: String,
      required: [true, 'Ingredient name is required']
    },
    quantity: {
      type: String,
      required: [true, 'Ingredient quantity is required']
    },
    allergens: [String]
  }],
  nutritionalInfo: {
    calories: {
      type: Number,
      min: [0, 'Calories cannot be negative']
    },
    protein: {
      type: Number,
      min: [0, 'Protein cannot be negative']
    },
    carbs: {
      type: Number,
      min: [0, 'Carbs cannot be negative']
    },
    fat: {
      type: Number,
      min: [0, 'Fat cannot be negative']
    },
    fiber: {
      type: Number,
      min: [0, 'Fiber cannot be negative']
    },
    sugar: {
      type: Number,
      min: [0, 'Sugar cannot be negative']
    }
  },
  tags: [String],
  dietary: {
    type: [String],
    enum: [
      'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free',
      'Soy-Free', 'Egg-Free', 'Keto', 'Paleo', 'Low-Carb', 'High-Protein'
    ]
  },
  spiceLevel: {
    type: String,
    enum: ['Mild', 'Medium', 'Hot', 'Very Hot'],
    default: 'Mild'
  },
  instructions: {
    type: [String],
    required: [true, 'Cooking instructions are required']
  },
  availability: {
    isAvailable: {
      type: Boolean,
      default: true
    },
    maxOrdersPerDay: {
      type: Number,
      required: [true, 'Max orders per day is required'],
      min: [1, 'Must allow at least 1 order per day']
    },
    advanceOrderDays: {
      type: Number,
      required: [true, 'Advance order days is required'],
      min: [0, 'Advance order days cannot be negative'],
      max: [7, 'Cannot require more than 7 days advance notice']
    }
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be negative'],
      max: [5, 'Rating cannot exceed 5']
    },
    count: {
      type: Number,
      default: 0,
      min: [0, 'Rating count cannot be negative']
    }
  },
  orders: {
    total: {
      type: Number,
      default: 0,
      min: [0, 'Total orders cannot be negative']
    },
    thisWeek: {
      type: Number,
      default: 0,
      min: [0, 'This week orders cannot be negative']
    },
    thisMonth: {
      type: Number,
      default: 0,
      min: [0, 'This month orders cannot be negative']
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
productSchema.index({ chefId: 1 });
productSchema.index({ category: 1 });
productSchema.index({ cuisine: 1 });
productSchema.index({ tags: 1 });
productSchema.index({ dietary: 1 });
productSchema.index({ 'rating.average': -1 });
productSchema.index({ price: 1 });
productSchema.index({ 'availability.isAvailable': 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ name: 'text', description: 'text', tags: 'text' });

export default mongoose.model<IProduct>('Product', productSchema); 