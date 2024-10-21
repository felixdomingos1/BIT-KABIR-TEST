import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import bookRoute from './route/book.route.js';
import userRoute from './route/user.route.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use("/book", bookRoute);
app.use("/user", userRoute); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));   

app.listen(PORT, () => {
  console.log(`Servidor está rodando na Porta : ${PORT}`);
});
