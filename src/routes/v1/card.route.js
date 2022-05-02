import express from 'express'
import { cardController } from '*/controllers/card.controller'
import { CardValidation } from '*/validations/card.validation'

const router = express.Router()

router.route('/')
    .post(CardValidation.createNew, cardController.createNew)

router.route('/:id')
    // .get((req, res) => console.log('GET list of Board'))
    .put(CardValidation.update, cardController.update)

export const cardRoutes = router