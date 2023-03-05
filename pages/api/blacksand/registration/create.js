import {
    insertRegistration
} from '../../../../utils/database/database';

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send({
            message: 'Only POST requests allowed'
        })
        return
    }

    const body = req.body
    let created = await insertRegistration(body);

    if (created.error) {
        res.status(404).send({
            message: created.error
        })
    }

    res.status(201).send({
        message: created.success
    })
}