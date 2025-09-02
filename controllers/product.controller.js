import Product from '../models/product.model.js';
import {v2 as cloudinary} from 'cloudinary';


export const addProduct = async(req,res)=>{
    try{
        const {name,price,offerPrice,description,category} = req.body;
        const image = req.files?.map((file) => `${file.filename}`);
        // const image = req.files?.map((file) => file.filename);
        if (
          !name ||
          !price ||
          !offerPrice ||
          !description ||
          !category ||
          !image ||
          image.length === 0
        ) {
          return res.status(400).json({
            success: false,
            message: "All fields including images are required",
          });
        }
            
        await Product.create({
            name,
            price,
            offerPrice,
            description,
            category,
            image
        })
        res.status(200).json({message:"Product Added Successfully",success: true});
    }
    catch(error){
        res.status(500).json({message:"server error",error:error.message});
    }
    
}

export const getProducts = async (req, res) => {
    try {
      const products = await Product.find({});
      res.status(200).json({ success: true, products });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  // get single product :/api/product/id
  export const getProductById = async (req, res) => {
    try {
      const { id } = req.body;
      const product = await Product.findById(id);
      res.status(200).json({ success: true, product });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  // change stock  :/api/product/stock
  export const changeStock = async (req, res) => {
    try {
      const { id, inStock } = req.body;
      const product = await Product.findByIdAndUpdate(
        id,
        { inStock },
        { new: true }
      );
      res
        .status(200)
        .json({ success: true, product, message: "Stock updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };