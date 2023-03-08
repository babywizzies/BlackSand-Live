import {
    getAllMechas
} from '../../../../utils/database/database';

module.exports = async function handler(req, res) {
    const ponies = await getAllMechas;
    res.status(200).json(ponies);
};