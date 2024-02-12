const { app, logger, db } = require("../../../setup");

const baseDB = "projects-card";

// create a project card
app.post("/api/projects/card/create", (req, res) => {
  // async waits for a response
  (async () => {
    try {
      await db.collection(baseDB).doc().create({
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        alt: req.body.alt,
        url: req.body.url,
      });

      return res.status(200).send({ status: "Success", msg: "Project Saved" });
    } catch (error) {
      logger.error(error);
      return res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

// get a single project card using specific id
app.get("/api/projects/card/get/:id", (req, res) => {
  (async () => {
    try {
      const itemRef = db.collection(baseDB).doc(req.params.id);
      const doc = await itemRef.get(); // gets doc
      const card = doc.data(); // the actual data of the item

      if (!card) {
        logger.error(`Error - No project found with id: ${req.params.id}`);
        return res.status(404).send({
          status: "Failed",
          msg: `No project found with id: ${req.params.id}`,
        });
      }

      return res.status(200).send({ status: "Success", data: card });
    } catch (error) {
      logger.error(error);
      return res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

app.get("/api/projects/card/getAll", async (req, res) => {
  try {
    const cardsRef = db.collection(baseDB);
    const snapshot = await cardsRef.get();

    if (snapshot.empty) {
      logger.error("No projects found");
      return res
        .status(404)
        .send({ status: "Failed", msg: "No projects found" });
    }

    const cards = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Send the cards as a response
    return res.status(200).send({ status: "Success", data: cards });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ status: "Failed", msg: error.message });
  }
});

// update card
app.put("/api/projects/cards/update/:id", (req, res) => {
  // async waits for a response
  (async () => {
    try {
      const reqDoc = db.collection(baseDB).doc(req.params.id);
      await reqDoc.update({
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        alt: req.body.alt,
        url: req.body.url,
      });

      return res
        .status(200)
        .send({ status: "Success", msg: "Project Updated" });
    } catch (error) {
      logger.error(error);
      return res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

// delete card
app.delete("/api/projects/cards/delete/:id", (req, res) => {
  // async waits for a response
  (async () => {
    try {
      const reqDoc = db.collection(baseDB).doc(req.params.id);
      await reqDoc.delete();

      return res
        .status(200)
        .send({ status: "Success", msg: "Project Deleted" });
    } catch (error) {
      logger.error(error);
      return res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

module.exports = { app };
