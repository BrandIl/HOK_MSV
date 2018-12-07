import express from 'express';
import CreditService from '../services/credit.service';
import path from 'path';

const creditRoute = express.Router();
const _creditService = new CreditService();

creditRoute.route('/organization')
    .get(function (req, res, next) {
        const { date } = req.query;
        _creditService.getEntitledOrganizations(date)
            .then(data => res.send(data))
            .catch(next);
    });

creditRoute.route('/')
    .get(function (req, res, next) {
        const { date } = req.query;
        _creditService.getMSVCreditsFile(date)
            .then(data => res.send(data))
            .catch(next);
    });



export default creditRoute;