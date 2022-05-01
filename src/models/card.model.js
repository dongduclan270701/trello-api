import Joi from 'joi'
import { getDB } from '*/config/mongodb.js'
import { ObjectId } from 'mongodb'

// Define cards collection
const cardCollectionName = 'cards'
const cardCollectionSchema = Joi.object({
    boardId: Joi.string().required(), // also ObjectId when create new
    columnId: Joi.string().required(), // also ObjectId when create new
    title: Joi.string().required().min(3).max(20).trim(),
    cover: Joi.string().default(null),
    createAt: Joi.date().timestamp().default(Date.now()),
    updateAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
    return await cardCollectionSchema.validateAsync(data, { abortEarly: false }) // Hiển thị đầy đủ lỗi nếu trong trường data có 2 field trở lên bị lỗi
}

const findOneById = async (id) => {
    try {
        const result = await getDB().collection(cardCollectionName).findOne({ _id: ObjectId(id) })
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const createNew = async (data) => {
    try {
        const validatedValue = await validateSchema(data)
        const insertValue = {
            ...validatedValue,
            boardId: ObjectId(validatedValue.boardId),
            columnId: ObjectId(validatedValue.columnId)
        }
        const result = await getDB().collection(cardCollectionName).insertOne(insertValue)
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const deleteMany = async (ids) => {
    try {
        const transfromIds = ids.map(i => ObjectId(i))
        const result = await getDB().collection(cardCollectionName).updateMany(
            { _id: { $in: transfromIds } },
            { $set: { _destroy: true } }
        )
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (id, data) => {
    try {
        const result = await getDB().collection(cardCollectionName).findOneAndUpdate(
            { _id: ObjectId(id) },
            { $set: data },
            { returnDocument: 'after' }
        )
        console.log(result.value)
        return result.value
    } catch (error) {
        throw new Error(error)
    }
}

export const CardModel = { createNew, findOneById, update, cardCollectionName, deleteMany }
