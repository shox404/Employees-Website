const { prisma } = require("../prisma/prisma-client");

const all = async (_, res) => {
    try {
        const employees = await prisma.employee.findMany();

        return res.status(200).json(employees);
    } catch {
        return res.status(500).json({ message: "Не удалось получить сотрудников" });
    }
}

const one = async (req, res) => {
    try {
        const employee = await prisma.employee.findUnique({
            where: { id: req.params.id }
        });

        return res.status(200).json(employee);
    } catch {
        return res.status(500).json({ message: "Не удалось получить сотрудника" });
    }
}

const add = async (req, res) => {
    try {
        const { firstName, lastName, address, age } = req.body;

        if (!firstName || !lastName || !address || !age) {
            return res.status(400).json({ message: "Заполните обязательные поля" });
        }

        const employee = await prisma.employee.create({ data: { ...req.body, userId: req.user.id } });

        return res.status(201).json(employee);
    } catch {
        return res.status(500).json({ message: "Не удалось добавить сотрудника" });
    }
}

const edit = async (req, res) => {
    try {
        await prisma.employee.update({ where: { id: req.params.id }, data: req.body });

        return res.status(204).json("OK");
    } catch {
        return res.status(500).json({ message: "Не удалось редактировать сотрудника" });
    }
}

const remove = async (req, res) => {
    try {
        await prisma.employee.delete({ where: { id: req.params.id } });

        return res.status(204).json("OK");
    } catch {
        return res.status(500).json({ message: "Не удалось удалить сотрудника" });
    }
}

module.exports = { all, one, add, remove, edit };