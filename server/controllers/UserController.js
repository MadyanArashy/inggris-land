import User from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll();
    res.status(200).json(response);
  }
  catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
}
export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(response);
  }
  catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Failed to fetch the user" });
  }
}
export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({msg: `User ${user.id} Created`})
  }
  catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Failed to create user" });
  }
}
export const updateUser = async (req, res) => {
  try {
    await User.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.status(201).json({msg: "User Updated"})
  }
  catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Failed to update user" });
  }
}
export const deleteUser = async (req, res) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(201).json({msg: "User Deleted"})
  }
  catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Failed to delete users" });
  }
}