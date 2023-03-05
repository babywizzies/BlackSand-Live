import {
    getRegistrationByID
} from '../../../../utils/database/database';

module.exports = async function handler(req, res) {
    const {
        pid
    } = req.query
    console.log("PID", pid);
    const registry = await getRegistrationByID(pid);
    res.status(200).json(registry);
};