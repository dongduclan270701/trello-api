import Joi from 'joi'
import { getDB } from '*/config/mongodb.js'
import { ObjectId } from 'mongodb'

// Define columns collection
const columnCollectionName = 'columns'
const columnCollectionSchema = Joi.object({
    boardId: Joi.string().required(), // also ObjectId when create new
    title: Joi.string().required().min(3).max(20).trim(),
    cardOrder: Joi.array().items(Joi.string()).default([]),
    createAt: Joi.date().timestamp().default(Date.now()),
    updateAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
    return await columnCollectionSchema.validateAsync(data, { abortEarly: false }) // Hiển thị đầy đủ lỗi nếu trong trường data có 2 field trở lên bị lỗi
}

const findOneById = async (id) => {
    try {
        const result = await getDB().collection(columnCollectionName).findOne({ _id: ObjectId(id) })
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const pushCardOrder = async (columnId, cardId) => {
    try {
        const result = await getDB().collection(columnCollectionName).findOneAndUpdate(
            { _id: ObjectId(columnId) },
            { $push: { cardOrder: cardId } }
        )
        return result.value
    } catch (error) {
        throw new Error(error)
    }
}

const createNew = async (data) => {
    try {
        const validatedValue = await validateSchema(data)
        const insertValue = {
            ...validatedValue,
            boardId: ObjectId(validatedValue.boardId)
        }
        const result = await getDB().collection(columnCollectionName).insertOne(insertValue)
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (id, data) => {
    try {
        const updateData = {
            ...data
        }
        if (data.boardId) {
            updateData.boardId = ObjectId(data.boardId)
        }
        const updateColumn = await getDB().collection(columnCollectionName).findOneAndUpdate(
            { _id: ObjectId(id) },
            { $set: updateData },
            { returnDocument: 'after' }
        )
        return updateColumn.value
    } catch (error) {
        throw new Error(error)
    }
}

export const ColumnModel = { createNew, findOneById, pushCardOrder, update, columnCollectionName }