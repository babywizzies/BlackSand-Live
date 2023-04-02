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

    const body = req.body
    const response = updatePony(body);
    if (!response.success) {
        res.status(500).send({
            error: "Error updating",
            message: response.message
        });
        return
    }

    res.status(200).send({
        message: response.message
    })
    return
}