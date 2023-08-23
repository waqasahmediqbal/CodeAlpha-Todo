const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../models/User");

// @router  GET api/todos
// @description: get all todos
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user.todos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @router  POST api/todos
// @description: add new todo
router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(400).json({ msg: "User not Found!" });
      }
      const newTodo = {
        text: req.body.text,
        date: new Date(),
      };
      user.todos.unshift(newTodo);
      await user.save();
      res.json(user.todos);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @router  PUT api/todos/:todoId
// @description: Update/edit todo
router.put(
  "/:todoId",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ msg: "User not Found!" });
      }

      const todoId = req.params.todoId;

      // Find the index of the todo to be deleted
      const todoIndex = user.todos.findIndex((todo) => todo.id === todoId);
      if (todoIndex === -1) {
        return res.status(404).json({ msg: "Todo not found" });
      }
      user.todos[todoIndex].text = req.body.text;
      await user.save();
      res.json(user.todos);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @router  DELETE api/todos/:todoId
// @description: delete todo
router.delete("/:todoId", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not Found!" });
    }

    const todoId = req.params.todoId;

    // Find the index of the todo to be deleted
    const todoIndex = user.todos.findIndex((todo) => todo.id === todoId);
    if (todoIndex === -1) {
      return res.status(404).json({ msg: "Todo not found" });
    }
    user.todos.splice(todoIndex, 1);
    await user.save();
    res.json(user.todos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
