const express = require('express')
const router = express.Router()
const services = require("../services/get-services")

//simple get for every table
router.get('/:table/getall', async (req, res) => {
    const table = req.params['table']

    const resp = await services.GetAll(table)

    return res.status(resp.err).send(resp.msg)
})
router.get('/getbyany/:table/:column/:values', async (req, res) => {
    const table = req.params['table']
    const column = req.params['column']
    const values = req.params['values']

    const resp = await services.GetByAny(table, column, values)

    return res.status(resp.err).send(resp.msg)
})

router.get('/getbyanytwovalues/:table/:column/:values/:column2/:values2', async (req, res) => {
    const table = req.params['table']
    const column = req.params['column']
    const values = req.params['values']
    const column2 = req.params['column2']
    const values2 = req.params['values2']


    const resp = await services.GetByAnyTwoValues(table, column, values, column2, values2)

    return res.status(resp.err).send(resp.msg)
})

module.exports = router