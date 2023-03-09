import {
    updateRaceData
} from '../../../../../utils/database/database';

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send({
            message: 'Only POST requests allowed'
        })
        return
    }

    const body = req.body
    const response = updateRaceData(body);
    if (typeof (response) != Object && response.Error != null) {
        res.send({
            message: 'DB Error'
        })
        return
    }
    res.status(200).json(response);
    return
}