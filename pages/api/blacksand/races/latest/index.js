import {
    getLatestRace
} from '../../../../../utils/database/database';

module.exports = async function handler(req, res) {
    const race = await getLatestRace();
    res.status(200).json(race);
};