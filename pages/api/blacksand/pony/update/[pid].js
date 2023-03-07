import {
    updatePony
} from '../../../../../utils/database/database';

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send({
            message: 'Only POST requests allowed'
        })
        return
    }
    const {
        pid
    } = req.query
    const body = req.body
    const response = updatePony(body, pid);
    if (typeof (response) != object) {
        res.status(response.code).send({
            message: 'DB Error'
        })
    }
    res.status(200).json(response);
}