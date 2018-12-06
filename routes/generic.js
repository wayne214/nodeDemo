const genericRouter = (dataAccessObject, router )=> {
    router.get("/", async (req, res) => {
        try {
            const docs = await dataAccessObject.getAll();
            res.status(200).json(docs);
        } catch (e) {
            res.sendStatus(404);
        }
    });

    router.get("/:id", async (req, res) => {
        try {
            const doc = await dataAccessObject.getById(req.params.id);
            res.status(200).json(doc);
        } catch (e) {
            res.sendStatus(404);
        }
    });

    router.post("/", async (req, res) => {
        const doc = req.body;
        try {
            const newDoc = await dataAccessObject.save(doc);
            res.status(201).json(newDoc);
        } catch (e) {
            res.sendStatus(500);
        }
    });

    router.put("/:id", async (req, res) => {
        const doc = req.body;
        const id = req.params.id;
        if (!doc._id) doc._id = id;
        try {
            const updatedDoc = await dataAccessObject.update(doc);
            res.status(200).json(updatedDoc);
        } catch (e) {
            res.sendStatus(500);
        }
    });

    router.delete("/:id", async (req, res) => {
        const id = req.params.id;
        try {
            await dataAccessObject.remove(id);
            res.sendStatus(204);
        } catch (e) {
            res.sendStatus(500);
        }
    });

    return router;
};

module.exports = genericRouter;