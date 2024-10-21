import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import path from 'path';

const prisma = new PrismaClient();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');  
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); 
    }
  });
  
export const upload = multer({ storage: storage });

export const getBook = async (req, res) => {
  try {
    const books = await prisma.book.findMany();
    res.status(200).json(books);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: error.message });
  }
};

export const addBook = async (req, res) => {
    try {
        const { name, price, category, title } = req.body;
        const imagePath = req.file ? req.file.filename : null;
      const newBook = await prisma.book.create({
        data: {
          name,
          price:parseFloat(price),
          category,
          image:imagePath,
          title,
        },
      });
  
      res.status(201).json({
        message: "Book added successfully",
        book: newBook,
      });
    } catch (error) {
      console.log("Error: ", error);
      res.status(500).json({ error: error.message });
    }
  };
  export const updateBook = async (req, res) => {
    try {
      const { id } = req.params;   
      const { name, price, category, image, title } = req.body;
    
      const updatedBook = await prisma.book.update({
        where: { id: parseInt(id) },
        data: {
          name,
          price:parseFloat(price),
          category,
          image,
          title,
        },
      });
  
      res.status(200).json({
        message: "Book updated successfully",
        book: updatedBook,
      });
    } catch (error) {
      console.log("Error: ", error);
      res.status(500).json({ error: error.message });
    }
  };

  export const deleteBook = async (req, res) => {
    try {
      const { id } = req.params;
      const book = await prisma.book.findUnique({
        where: { id: Number(id) },
      });
  
      if (!book) {
        return res.status(404).json({
          message: "Book not found",
        });
      }
  
      await prisma.book.delete({
        where: { id: Number(id) },
      });
  
      res.status(200).json({
        message: "Book deleted successfully",
      });
    } catch (error) {
      console.log("Error: ", error);
      res.status(500).json({ error: error.message });
    }
  };