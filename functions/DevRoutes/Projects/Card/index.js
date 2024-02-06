const { dev, logger, db } = require("../../../setup");
const { authenticate } = require("../../Auth");

const baseDB = "projects-card_dev";

// create a project card
dev.post("/api/projects/card/create", (req, res) => {
  // async waits for a response
  (async () => {
    try {
      // Check if all required parameters are present
      const requiredParams = [
        "title",
        "languages",
        "description",
        "image",
        "alt",
        "url",
      ];
      for (const param of requiredParams) {
        if (!req.body[param]) {
          return res
            .status(400)
            .send({ status: "Failed", msg: `Missing parameter: ${param}` });
        }
      }

      await db.collection(baseDB).doc().create({
        title: req.body.title,
        languages: req.body.languages,
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
dev.get("/api/projects/card/get/:id", (req, res) => {
  (async () => {
    try {
      const itemRef = db.collection(baseDB).doc(req.params.id);
      const doc = await itemRef.get(); // gets doc
      const data = doc.data(); // the actual data of the item

      if (!data) {
        logger.error(`Error - No project found with id: ${req.params.id}`);
        return res.status(404).send({
          status: "Failed",
          msg: `No project found with id: ${req.params.id}`,
        });
      }

      const card = {
        id: doc.id,
        ...data,
      };
      return res.status(200).send({ status: "Success", data: card });
    } catch (error) {
      logger.error(error);
      return res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

dev.get("/api/projects/card/getAll", authenticate, async (req, res) => {
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
    return res
      .status(200)
      .send({
        status: "Success",
        data: cards,
      });
  } catch (error) {
    logger.error(error);
    return res.status(500).send({ status: "Failed", msg: error.message });
  }
});

// update card
dev.put("/api/projects/cards/update/:id", (req, res) => {
  // async waits for a response
  (async () => {
    try {
      // Check if all required parameters are present
      const requiredParams = [
        "title",
        "languages",
        "description",
        "image",
        "alt",
        "url",
      ];
      for (const param of requiredParams) {
        if (!req.body[param]) {
          return res
            .status(400)
            .send({ status: "Failed", msg: `Missing parameter: ${param}` });
        }
      }

      const reqDoc = db.collection(baseDB).doc(req.params.id);
      await reqDoc.update({
        title: req.body.title,
        languages: req.body.languages,
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
dev.delete("/api/projects/cards/delete/:id", (req, res) => {
  // async waits for a response
  (async () => {
    try {
      const reqDoc = db.collection(baseDB).doc(req.params.id);
      const doc = await reqDoc.get();

      if (!doc.exists) {
        return res
          .status(404)
          .send({ status: "Failed", msg: "Project not found" });
      }

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

module.exports = { dev };
