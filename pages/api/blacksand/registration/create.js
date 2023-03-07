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

    if (!created.success) {
        res.status(500).send({
            error: "Error registering",
            message: created.message
        });
        return
    }

    res.status(201).send({
        message: created.message
    })
    return
}