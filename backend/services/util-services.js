const db1 = require("../db/util-queries")

const GetAll = async (req, res) => {
    const table_name = req.params['table']
    try {
        var result = await db1.GetAllQueries(table_name)
        res.status(200).send(result.rows)
    } catch (error) {
        res.status(500).send(error)
    }
}

const GetById = async (req, res) => {
    const table_name = req.params['table']
    const id = req.params['id']
    try {
        var result = await db1.GetById(table_name, id)
        res.status(200).send(result.rows[0])
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = { GetAll, GetById }