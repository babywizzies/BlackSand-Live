import {
    promises as fs
} from 'fs';
import {
    getAllPonies,
    getPonyByID
} from '../../database/database';

module.exports = async function handler(req, res) {
    const ponies = await getAllPonies;
    res.status(200).json(ponies);
};