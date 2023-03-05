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
    console.log(created);

    res.status(201).send({
        message: 'Created'
    })
}