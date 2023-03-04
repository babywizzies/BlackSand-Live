import {
    promises as fs
} from 'fs';
import {
    getAllPonies
} from '../../../../utils/database/database';

module.exports = async function handler(req, res) {
    const ponies = await getAllPonies;
    res.status(200).json(ponies);
};