const { dev, logger, db } = require("../../../setup");
const { authenticate } = require("../../Auth");
const { checkRequiredParams } = require("../../Utilities");

const baseDB = "projects-card_dev";

// create a project card
dev.post("/api/projects/card/create", authenticate, async (req, res) => {
  try {
    checkRequiredParams(
      ["title", "technologies", "description", "image", "alt", "url"],
      req.body,
    );

    await db.collection(baseDB).add({
      title: req.body.title,
      technologies: req.body.technologies,
      description: req.body.description,
      image: req.body.image,
      alt: req.body.alt,
      url: req.body.url,
    });

    return res.status(200).send({ status: "Success", msg: "Project Saved" });
  } catch (error) {
    logger.error(error);
    return res.status(400).send({ status: "Failed", msg: error });
  }
});

// get a single project card using specific id
dev.get("/api/projects/card/get/:id", authenticate, async (req, res) => {
  try {
    checkRequiredParams(["id"], req.params);
    const id = req.params.id;
    const itemRef = db.collection(baseDB).doc(id);
    const doc = await itemRef.get(); // gets doc
    const data = doc.data(); // the actual data of the item

    if (!data) {
      throw new Error(`No project found with id: ${id}`);
    }

    const card = {
      id: doc.id,
      ...data,
    };
    return res.status(200).send({ status: "Success", data: card });
  } catch (error) {
    logger.error(error);
    return res.status(400).send({ status: "Failed", msg: error });
  }
});

dev.get("/api/projects/card/getAll", authenticate, async (req, res) => {
  try {
    const cardsRef = db.collection(baseDB);
    const snapshot = await cardsRef.get();

    if (snapshot.empty) {
      throw new Error("No projects found");
    }

    const cards = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Send the cards as a response
    return res.status(200).send({
      status: "Success",
      data: cards,
    });
  } catch (error) {
    logger.error(error);
    return res.status(400).send({ status: "Failed", msg: error.message });
  }
});

// update card
dev.put("/api/projects/card/update/:id", authenticate, async (req, res) => {
  try {
    checkRequiredParams(["id"], req.params);
    checkRequiredParams(
      ["title", "technologies", "description", "image", "alt", "url"],
      req.body,
    );

    const reqDoc = db.collection(baseDB).doc(req.params.id);
    await reqDoc.update({
      title: req.body.title,
      technologies: req.body.technologies,
      description: req.body.description,
      image: req.body.image,
      alt: req.body.alt,
      url: req.body.url,
    });

    return res.status(200).send({ status: "Success", msg: "Project Updated" });
  } catch (error) {
    logger.error(error);
    return res.status(400).send({ status: "Failed", msg: error });
  }
});

// delete card
dev.delete("/api/projects/card/delete/:id", authenticate, async (req, res) => {
  try {
    checkRequiredParams(["id"], req.params);

    const reqDoc = db.collection(baseDB).doc(req.params.id);
    const doc = await reqDoc.get();

    if (!doc.exists) {
      throw new Error("Project not found");
    }

    await reqDoc.delete();

    return res.status(200).send({ status: "Success", msg: "Project Deleted" });
  } catch (error) {
    logger.error(error);
    return res.status(400).send({ status: "Failed", msg: error });
  }
});

module.exports = { dev };
