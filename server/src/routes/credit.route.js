import express from 'express';
import CreditService from '../services/credit.service';
import DataModel from '../models/data.model';
import dateformat from 'dateformat';

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

creditRoute.route('/data')
    .post(function (req, res, next) {
        const data = req.body;
        const _data = new DataModel({
            institution: {
                name: '-',
                code: '00000000'
            },
            creationDate: dateformat(Date.now(), 'yymmdd'),
            paymentDate: dateformat(Date.now(), 'yymmdd'),
            senderInstitution: '00000',
            actions: data.map(dt => {
                const { bankID, branchID, accountNumber, id, lastName, firstName, sum } = dt;
                return {
                    entitledAccount: { bankID, branchID, accountNumber },
                    entitledID: ('0'.repeat(9) + id).slice(-9),
                    entitledName: `${lastName} ${firstName}`.slice(-16),
                    entitledKey: '1',
                    sum: {
                        shekel: JSON.stringify(parseInt(sum)),
                        agorot: JSON.stringify((Number(sum) - parseInt(sum)))
                    }
                }
            })
        })

        const file = _creditService.getMSVCreditsFileByData(_data);
        res.send(file);
        

    });


export default creditRoute;