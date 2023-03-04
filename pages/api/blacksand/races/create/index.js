import {
    insertRace
} from '../../database/database';

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send({
            message: 'Only POST requests allowed'
        })
        return
    }

    const body = JSON.parse(req.body)
    const response = inserRace(body)
    if (typeof (response) != object) {
        res.status(response.code).send({
            message: 'DB Error'
        })
    }
    res.status(200).json(response);
}