const { DBSubscriber, isValidSubscriber } = require("../models/Subscriber");

const getSubscriber = async (req, res) => {
  try {
    const subscribers = await DBSubscriber.findAll({
      where: {
        userTo: req.params.userId,
      },
    });

    if (!subscribers) {
      return res.json({ message: "no subscribers found for this id!" });
    }
    return res.json(subscribers);
  } catch (err) {
    res.json({ message: "unable to find Subscribers.", error: err.message });
  }
};

const addSubscriber = async (req, res) => {
  const error = await isValidSubscriber(req.body);
  if (error) return res.json(error.message);

  try {
    const subscriber = await DBSubscriber.create({
      ...req.body,
    });

    if (!subscriber) return res.json({ message: "Unable to subscribe." });

    return res.json({
      message: "successfully Subscribed!",
      payload: subscriber,
    });
  } catch (err) {
    return res.json({ message: "Unable to add Subscriber" });
  }
};

const dropSubscriber = async (req, res) => {
  const error = await isValidSubscriber(req.body);
  if (error) return res.json(error.message);

  try {
    const deleted = await DBSubscriber.destroy({
      where: {
        ...req.body,
      },
    });

    if (!deleted) return res.json({ message: "failed to delete!" });

    return res.json({ message: "successfully deleted" });
  } catch (err) {
    return res.json({ message: "unable to delete!", error: err.message });
  }
};

module.exports.dropSubscriber = dropSubscriber;
module.exports.getSubscriber = getSubscriber;
module.exports.addSubscriber = addSubscriber;
