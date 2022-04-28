import express from 'express'
import { boardController } from '*/controllers/board.controller'
import { BoardValidation } from '*/validations/board.validation'

const router = express.Router()

router.route('/')
    .get((req, res) => console.log('GET Board'))
    .post(BoardValidation.createNew, boardController.createNew)

export const boardRoutes = router