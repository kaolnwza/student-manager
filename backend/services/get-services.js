const db = require("../db/get-queries")
const ErrorHandling = require("./error")

const GetAll = async (table) => {

    var resp = await db.GetAllQueries(table)
    if (resp.err != 200) {
        return ErrorHandling(500, resp.msg)
    }
    return ErrorHandling(500, resp.msg.rows)

}

const GetByAny = async (table, column, values) => {

    var resp = await db.GetByAnyQueries(table, column, values)
    if (resp.err != 200) {
        return ErrorHandling(500, resp.msg)
    }
    if (resp.rowCount > 1) {
        return ErrorHandling(200, resp.msg.rows)
    }

    return ErrorHandling(200, resp.msg.rows[0])

}

const GetByAnyTwoValues = async (table, column_1, values_1, column_2, values_2) => {

    var resp = await db.GetByAnyTwoValuesQueries(table, column_1, values_1, column_2, values_2)
    if (resp.err != 200) {
        return ErrorHandling(500, resp.msg)
    }

    if (resp.rowCount > 1) {
        return ErrorHandling(200, resp.rows)
    }

    return ErrorHandling(200, resp.msg.rows[0])

}

const Eiei = (n1, n2) => {
    console.log(n1 + n2)
    return n1 + n2
}

module.exports = { GetAll, GetByAny, GetByAnyTwoValues }