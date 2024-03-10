const { dev, logger, db } = require("../../setup");
const { authenticate } = require("../Auth");
const { checkRequiredParams } = require("../Utilities");

const baseDB = "certificates_dev";

// create a certificate
dev.post("/api/certificates/create", authenticate, async (req, res) => {
  try {
    checkRequiredParams(["id", "image", "alt"], req.body);

    await db.collection(baseDB).doc(req.body.id).set({
      image: req.body.image,
      alt: req.body.alt,
    });

    return res
      .status(200)
      .send({ status: "Success", msg: "Certificate Saved" });
  } catch (error) {
    logger.error(error);
    return res.status(400).send({ status: "Failed", msg: error });
  }
});

// get a single certificate using specific id
dev.get("/api/certificates/get/:id", authenticate, async (req, res) => {
  try {
    checkRequiredParams(["id"], req.params);
    const id = req.params.id;
    const itemRef = db.collection(baseDB).doc(id);
    const doc = await itemRef.get(); // gets doc
    const data = doc.data(); // the actual data of the item

    if (!data) {
      throw new Error(`No certificate found with id: ${id}`);
    }

    const certificate = {
      id: doc.id,
      ...data,
    };
    return res.status(200).send({ status: "Success", data: certificate });
  } catch (error) {
    logger.error(error);
    return res.status(400).send({ status: "Failed", msg: error });
  }
});

dev.get("/api/certificates/getAll", authenticate, async (req, res) => {
  try {
    const itemsRef = db.collection(baseDB);
    const snapshot = await itemsRef.get();

    if (snapshot.empty) {
      throw new Error("No certificates found");
    }

    const certificates = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .sort((a, b) => a.id.localeCompare(b.id));

    // Send the certificates as a response
    return res.status(200).send({
      status: "Success",
      data: certificates,
    });
  } catch (error) {
    logger.error(error);
    return res.status(400).send({ status: "Failed", msg: error.message });
  }
});

// update certificates
dev.put("/api/certificates/update/:id", authenticate, async (req, res) => {
  try {
    checkRequiredParams(["id"], req.params);
    checkRequiredParams(["image", "alt"], req.body);

    const reqDoc = db.collection(baseDB).doc(req.params.id);
    await reqDoc.update({
      image: req.body.image,
      alt: req.body.alt,
    });

    return res
      .status(200)
      .send({ status: "Success", msg: "Certificate Updated" });
  } catch (error) {
    logger.error(error);
    return res.status(400).send({ status: "Failed", msg: error });
  }
});

// delete certificate
dev.delete("/api/certificates/delete/:id", authenticate, async (req, res) => {
  try {
    checkRequiredParams(["id"], req.params);

    const reqDoc = db.collection(baseDB).doc(req.params.id);
    const doc = await reqDoc.get();

    if (!doc.exists) {
      throw new Error("Certificate not found");
    }

    await reqDoc.delete();

    return res
      .status(200)
      .send({ status: "Success", msg: "Certificate Deleted" });
  } catch (error) {
    logger.error(error);
    return res.status(400).send({ status: "Failed", msg: error });
  }
});

module.exports = { dev };
