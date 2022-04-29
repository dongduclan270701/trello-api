import { BoardModel } from '*/models/board.model'

const createNew = async (data) => {
    try {
        const result = await BoardModel.createNew(data)
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const getFullBoard = async (boardId) => {
    try {
        const board = await BoardModel.getFullBoard(boardId)
        if (!board || !board.columns) {
            throw new Error('not Found')
        }
        //Add card to each column
        board.columns.forEach(column => {
            column.cards = board.cards.filter(c => c.columnId.toString() === column._id.toString())
        })

        //Sort columns by columnOrder, sort cards by cardOrder, this step will apass to front-end Dev

        // Remove cards data from board
        delete board.cards

        return board
    } catch (error) {
        throw new Error(error)
    }
}

export const boardService = { createNew, getFullBoard }