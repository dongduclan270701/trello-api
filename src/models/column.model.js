import Joi from 'joi'
import { getDB } from '*/config/mongodb.js'
import { ObjectID } from 'mongodb'

// Define columns collection
const columnCollectionName = 'columns'
const columnCollectionSchema = Joi.object({
    boardId: Joi.string().required(),
    title: Joi.string().required().min(3).max(20).trim(),
    cardOrder: Joi.array().items(Joi.string()).default([]),
    createAt: Joi.date().timestamp().default(Date.now()),
    updateAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
    return await columnCollectionSchema.validateAsync(data, { abortEarly: false }) // Hiển thị đầy đủ lỗi nếu trong trường data có 2 field trở lên bị lỗi
}

const createNew = async (data) => {
    try {
        const value = await validateSchema(data)
        const result = await getDB().collection(columnCollectionName).insertOne(value)
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (id, data) => {
    try {
        const result = await getDB().collection(columnCollectionName).findOneAndUpdate(
            { _id: ObjectID(id) },
            { $set: data }
            // { new: true, upsert: true } // mặc đinh là true khi update sẽ trả về bản gốc, chuyển false để trả về bản sau khi update
        )
        console.log(result.value)
        return result.value
    } catch (error) {
        throw new Error(error)
    }
}

export const ColumnModel = { createNew, update }