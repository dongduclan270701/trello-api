import express from 'express'
import { boardController } from '*/controllers/board.controller'
import { BoardValidation } from '*/validations/board.validation'

const router = express.Router()

router.route('/')
    // .get((req, res) => console.log('GET list of Board'))
    .post(BoardValidation.createNew, boardController.createNew)

router.route('/:id')
    // .get((req, res) => console.log('GET list of Board'))
    .get(boardController.getFullBoard)
    .put(BoardValidation.update, boardController.update)

export const boardRoutes = router