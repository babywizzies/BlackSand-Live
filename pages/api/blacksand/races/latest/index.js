import {
    getLatestRacePonies
} from '../../../../../utils/database/database';

module.exports = async function handler(req, res) {
    const {
        pid
    } = req.query
    const ponies = await getLatestRacePonies(pid);
    res.status(200).json(ponies);
};