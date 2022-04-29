import { CardModel } from '*/models/card.model'
import { ColumnModel } from '*/models/column.model'

const createNew = async (data) => {
    try {
        const newCard = await CardModel.createNew(data)
        const getNewCard = await CardModel.findOneById(newCard.insertedId.toString())

        await ColumnModel.pushCardOrder(getNewCard.columnId.toString(), getNewCard._id.toString())
        return getNewCard
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (id, data) => {
    try {
        const updateData = {
            ...data,
            updateAt: Date.now()
        }
        const result = await CardModel.update(id, updateData)
        return result
    } catch (error) {
        throw new Error(error)
    }
}

export const cardService = { createNew, update }