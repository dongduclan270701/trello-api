import express from 'express'
import { cardController } from '*/controllers/card.controller'
import { CardValidation } from '*/validations/card.validation'

const router = express.Router()

router.route('/')
    .post(CardValidation.createNew, cardController.createNew)

export const cardRoutes = router