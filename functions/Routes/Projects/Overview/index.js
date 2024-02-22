const { app, logger, db } = require("../../../setup");
const { authenticate } = require("../../Auth");
const { checkRequiredParams } = require("../../Utilities");

const baseDB = "projects-overview";

// create a project overview
app.post("/api/projects/overview/create", authenticate, async (req, res) => {
  try {
    checkRequiredParams(
      [
        "title",
        "technologies",
        "description",
        "image",
        "features",
        "url",
      ],
      req.body,
    );

    await db.collection(baseDB).doc(req.body.url).set({
      title: req.body.title,
      technologies: req.body.technologies,
      description: req.body.description,
      image: req.body.image,
      features: req.body.features,
      reference: req.body.reference,
    });

    return res.status(200).send({ status: "Success", msg: "Project Saved" });
  } catch (error) {
    logger.error(error);
    return res.status(400).send({ status: "Failed", msg: error });
  }
});

// get a single project overview using specific id
app.get("/api/projects/overview/get/:id", authenticate, async (req, res) => {
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

app.get("/api/projects/overview/getAll", authenticate, async (req, res) => {
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

    // Send the overviews as a response
    return res.status(200).send({
      status: "Success",
      data: cards,
    });
  } catch (error) {
    logger.error(error);
    return res.status(400).send({ status: "Failed", msg: error.message });
  }
});

// update overview
app.put("/api/projects/overview/update/:id", authenticate, async (req, res) => {
  try {
    checkRequiredParams(["id"], req.params);
    checkRequiredParams(
      [
        "title",
        "technologies",
        "description",
        "image",
        "features",
      ],
      req.body,
    );

    const reqDoc = db.collection(baseDB).doc(req.params.id);
    await reqDoc.update({
      title: req.body.title,
      technologies: req.body.technologies,
      description: req.body.description,
      image: req.body.image,
      features: req.body.features,
      reference: req.body.reference,
    });

    return res.status(200).send({ status: "Success", msg: "Project Updated" });
  } catch (error) {
    logger.error(error);
    return res.status(400).send({ status: "Failed", msg: error });
  }
});

// delete overview
app.delete(
  "/api/projects/overview/delete/:id",
  authenticate,
  async (req, res) => {
    try {
      checkRequiredParams(["id"], req.params);

      const reqDoc = db.collection(baseDB).doc(req.params.id);
      const doc = await reqDoc.get();

      if (!doc.exists) {
        throw new Error("Project not found");
      }

      await reqDoc.delete();

      return res
        .status(200)
        .send({ status: "Success", msg: "Project Deleted" });
    } catch (error) {
      logger.error(error);
      return res.status(400).send({ status: "Failed", msg: error });
    }
  });

module.exports = { app };
