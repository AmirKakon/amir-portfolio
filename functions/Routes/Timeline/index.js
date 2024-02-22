const { app, logger, db } = require("../../setup");
const { authenticate } = require("../Auth");
const { checkRequiredParams } = require("../Utilities");

const baseDB = "timeline";

// create a timeline event
app.post("/api/timeline/create", authenticate, async (req, res) => {
  try {
    checkRequiredParams(["id", "title", "location", "date", "image"], req.body);

    await db.collection(baseDB).doc(req.body.id).set({
      title: req.body.title,
      location: req.body.location,
      date: req.body.date,
      image: req.body.image,
    });

    return res
      .status(200)
      .send({ status: "Success", msg: "Timeline Event Saved" });
  } catch (error) {
    logger.error(error);
    return res.status(400).send({ status: "Failed", msg: error });
  }
});

// get a single timeline event using specific id
app.get("/api/timeline/get/:id", authenticate, async (req, res) => {
  try {
    checkRequiredParams(["id"], req.params);
    const id = req.params.id;
    const itemRef = db.collection(baseDB).doc(id);
    const doc = await itemRef.get(); // gets doc
    const data = doc.data(); // the actual data of the item

    if (!data) {
      throw new Error(`No project found with id: ${id}`);
    }

    const event = {
      id: doc.id,
      ...data,
    };
    return res.status(200).send({ status: "Success", data: event });
  } catch (error) {
    logger.error(error);
    return res.status(400).send({ status: "Failed", msg: error });
  }
});

app.get("/api/timeline/getAll", authenticate, async (req, res) => {
  try {
    const itemsRef = db.collection(baseDB);
    const snapshot = await itemsRef.get();

    if (snapshot.empty) {
      throw new Error("No timeline events found");
    }

    const events = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .sort((a, b) => a.id.localeCompare(b.id));

    // Send the events as a response
    return res.status(200).send({
      status: "Success",
      data: events,
    });
  } catch (error) {
    logger.error(error);
    return res.status(400).send({ status: "Failed", msg: error.message });
  }
});

// update timeline event
app.put("/api/timeline/update/:id", authenticate, async (req, res) => {
  try {
    checkRequiredParams(["id"], req.params);
    checkRequiredParams(["title", "location", "date", "image"], req.body);

    const reqDoc = db.collection(baseDB).doc(req.params.id);
    await reqDoc.update({
      title: req.body.title,
      location: req.body.location,
      date: req.body.date,
      image: req.body.image,
    });

    return res
      .status(200)
      .send({ status: "Success", msg: "Timeline Event Updated" });
  } catch (error) {
    logger.error(error);
    return res.status(400).send({ status: "Failed", msg: error });
  }
});

// delete timeline event
app.delete("/api/timeline/delete/:id", authenticate, async (req, res) => {
  try {
    checkRequiredParams(["id"], req.params);

    const reqDoc = db.collection(baseDB).doc(req.params.id);
    const doc = await reqDoc.get();

    if (!doc.exists) {
      throw new Error("Timeline event not found");
    }

    await reqDoc.delete();

    return res
      .status(200)
      .send({ status: "Success", msg: "Timeline Event Deleted" });
  } catch (error) {
    logger.error(error);
    return res.status(400).send({ status: "Failed", msg: error });
  }
});

module.exports = { app };
