import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';

const prisma = new PrismaClient();

export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    
    if (existingUser) {
      return res.status(400).json({ message: "Usuário já Existe" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    
    const user = await prisma.user.create({
      data: {
        fullname,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      message: "Cadastro feito com sucesso",
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Erro do Servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcryptjs.compare(password, user.password))) {
      return res.status(400).json({ message: "Nome ou Palavra Passe Inválidas" });
    }
    res.status(200).json({
      message: "Login Feito com sucesso",
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Erro do Servidor" });
  }
};
