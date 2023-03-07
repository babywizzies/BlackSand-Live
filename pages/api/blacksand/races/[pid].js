import {
    getRaceByID
} from '../../../../utils/database/database';

module.exports = async function handler(req, res) {
    const {
        pid
    } = req.query
    console.log("PID", pid);
    const race = await getRaceByID(pid);
    res.status(200).json(race);
};