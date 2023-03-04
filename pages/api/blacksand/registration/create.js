import {
    insertPony,
    insertTreats
} from '../../database/database';

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send({
            message: 'Only POST requests allowed'
        })
        return
    }

    const body = JSON.parse(req.body)
    insertPony({
        'pony_id': body[0].id,
    })
    insertTreats({
        'pony_id': body[0].id,
    })
    // the rest of your code
}