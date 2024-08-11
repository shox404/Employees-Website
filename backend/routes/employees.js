const express = require("express");
const router = express.Router();
const { auth } = require('../middleware/auth');
const { add, all, one, remove, edit } = require("../controllers/employees");

router.get("/", auth, all);

router.get("/:id", auth, one);

router.post("/add", auth, add);

router.post("/remove/:id", auth, remove);

router.post("/edit/:id", auth, edit);

module.exports = router;