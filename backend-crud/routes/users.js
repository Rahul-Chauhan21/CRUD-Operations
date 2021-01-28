const router = require("express").Router();

const { User } = require("../models/user");

router.get("/", async (req, res) => {
  const users = await User.find().sort("name");
  res.send(users);
});

router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
    phone: req.body.phone,
    isPremium: req.body.isPremium,
    address: req.body.address,
  });

  await user.save();
  res.send(user);
});

router.put("/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      isPremium: req.body.isPremium,
    },
    { new: true }
  );

  if (!user) {
    return res
      .status(404)
      .send(
        `The user with the given ID ${req.params.id} doesn't exist within the list of users`
      );
  }
  res.send(user);
});

router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user) {
    return res
      .status(404)
      .send(
        `The user with the given ID ${req.params.id} doesn't exist within the list of users`
      );
  }

  res.send(user);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res
      .status(404)
      .send(
        `The user with the given ID ${req.params.id} doesn't exist within the list of users`
      );
  }
  res.send(user);
});

module.exports = router;
