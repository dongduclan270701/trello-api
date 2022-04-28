import express from 'express'
import { columnController } from '*/controllers/column.controller'
import { ColumnValidation } from '*/validations/column.validation'

const router = express.Router()

router.route('/')
    .post(ColumnValidation.createNew, columnController.createNew)

router.route('/:id')
    .put(ColumnValidation.update, columnController.update)

export const columnRoutes = router