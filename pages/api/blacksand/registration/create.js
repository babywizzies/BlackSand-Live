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
        'collection': body[0].Collection,
        'discord_id': body[0]['Discord ID'],
        'wallet': body[0].wallet,
    })
    insertTreats({
        'pony_id': body[0].id,
        'treat': body[0]['Treat #1'],
    });
    insertTreats({
        'pony_id': body[0].id,
        'treat': body[0]['Treat #2'],
    });
    insertTreats({
        'pony_id': body[0].id,
        'treat': body[0]['Treat #3'],
    });

    res.status(201).send({
        message: 'Created'
    })
}