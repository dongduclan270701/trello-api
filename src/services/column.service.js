import { ColumnModel } from '*/models/column.model'
import { BoardModel } from '*/models/board.model'
import { CardModel } from '*/models/card.model'

const createNew = async (data) => {
    try {
        // transaction mongodb
        const newColumn = await ColumnModel.createNew(data)
        const getNewColumn = await ColumnModel.findOneById(newColumn.insertedId.toString())
        getNewColumn.cards = []
        //update columnOrder Array in board collection
        await BoardModel.pushColumnOrder(getNewColumn.boardId.toString(), getNewColumn._id.toString())

        return getNewColumn
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
        if (updateData._id) delete updateData._id
        if (updateData.cards) delete updateData.cards
        const updatedColumn = await ColumnModel.update(id, updateData)
        if (updatedColumn._destroy) {
            //delete cards
            CardModel.deleteMany(updatedColumn.cardOrder)
        }
        return updatedColumn
    } catch (error) {
        throw new Error(error)
    }
}

export const columnService = { createNew, update }