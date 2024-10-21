import express from 'express';
import { getBook, addBook, updateBook, deleteBook, upload } from '../controller/book.controller.js';

const router = express.Router();

router.get('/', getBook);           
router.post('/', upload.single('file'), addBook);      
router.put('/:id', updateBook);     
router.delete('/:id', deleteBook); 

export default router;
