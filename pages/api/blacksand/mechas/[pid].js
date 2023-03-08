import {
    getMechaByID
} from '../../../../utils/database/database';

module.exports = async function handler(req, res) {
    const {
        pid
    } = req.query
    console.log("PID", pid);
    const race = await getMechaByID(pid);
    res.status(200).json(race);
};