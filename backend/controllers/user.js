const { prisma } = require("../prisma/prisma-client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async function (req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Заполните обязательные поля" });
        }

        const user = await prisma.user.findFirst({
            where: { email }
        });

        const isPasswordCorrect = user && (await bcrypt.compare(password, user.password));

        const secret = process.env.JWT_SECRET;

        if (user && isPasswordCorrect && secret) {
            return res.status(200).json({
                id: user.id,
                email: user.email,
                name: user.name,
                token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" })
            });
        } else {
            return res.status(400).json({ message: "Неверно введен логин или пароль" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Что то пошло не так" });
    }
}

const register = async function (req, res) {
    try {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({ message: "Заполните обязательные поля" });
        }

        const registredUser = await prisma.user.findFirst({
            where: { email }
        });

        if (registredUser) {
            return res.status(400).json({ message: "Пользователь с таким email уже существует" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data: { email, name, password: hashedPassword }
        });

        const secret = process.env.JWT_SECRET;

        if (user && secret) {
            return res.status(201).json({
                id: user.id,
                email: user.email,
                name: user.name,
                token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" })
            });
        } else {
            return res.status(400).json({ message: "Не удалось создать пользователя" })
        }
    } catch (error) {
        return res.status(500).json({ message: "Что то пошло не так" });
    }
}

const current = async function (req, res) {
    try {
        return res.status(200).json(req.user);
    } catch (error) {
        return res.status(500).json({ message: "Что то пошло не так" });
    }
}

module.exports = { login, register, current };