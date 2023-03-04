import {
    getPonyByID
} from '../../database/database';

module.exports = async function handler(req, res) {
    const {
        pid
    } = req.query
    const ponies = await getPonyByID(pid);
    res.status(200).json(ponies);
};