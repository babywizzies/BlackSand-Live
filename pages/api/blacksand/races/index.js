import {
    getAllRaceData
} from '../../../../utils/database/database';

module.exports = async function handler(req, res) {
    const {
        pid
    } = req.query
    const ponies = await getAllRaceData();
    res.status(200).json(ponies);
};