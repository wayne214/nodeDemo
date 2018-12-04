const ObjectID = require('mongodb').ObjectID;
const genericData = collectionRef => {

    const save = async doc => {
        try {
            const collection = await collectionRef();
            const insertInfo = await collection.insertOne(doc);
            if (insertInfo.insertCount === 0) throw "添加失败";
            const newId = insertInfo.insertedId;
            return getById(newId);
        } catch (e) {
            throw e;
        }
    };

    const update = async doc => {
        if (!doc || !doc._id) throw "必须包括id";
        try {
            const collection = await collectionRef();
            const { _id, ...newDoc } = doc;
            const updateInfo = await collection.updateOne(
                {
                    _id: ObjectID(_id)
                },
                {
                    $set: { ...newDoc }
                }
            );
            if (updateInfo.modifiedCount === 0) throw "更新失败";
            return getById(_id);
        } catch (e) {
            throw e;
        }
    };

    const remove = async id => {
        if (!id) throw "必须包括id";
        try {
            const collection = await collectionRef();
            const deletedInfo = await collection.deleteOne({ _id: ObjectID(id) });
            if (deletedInfo.deletedCount === 0) throw "删除失败";
        } catch (e) {
            throw e;
        }
    };

    const getById = async id => {
        if (!id) throw "必须提供id";
        try {
            const collection = await collectionRef();
            const doc = await collection.findOne({ _id: ObjectID(id) });
            if (doc === null) throw "没有找到此document";
            return doc;
        } catch (e) {
            throw e;
        }
    };

    const getAll = async () => {
        try {
            const collection = await collectionRef();
            const docs = await collection.find().toArray();
            return docs;
        } catch (e) {
            throw e;
        }
    };

    return {
        save,
        update,
        remove,
        getById,
        getAll
    };
};

module.exports = genericData;