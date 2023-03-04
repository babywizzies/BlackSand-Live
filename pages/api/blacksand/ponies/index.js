import path from 'path';
import {
    promises as fs
} from 'fs';
import {
    getAllPonies,
    getPonyByID
} from '../../database/database';

module.exports = async function handler(req, res) {
    // const ponies = await getAllPonies;
    const ponies = await getPonyByID(2);
    res.status(200).json(ponies);
};