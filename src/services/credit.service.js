
import msvFormator from '../core/msvFormator';
import msvForamt from '../core/msvFormat'
import Data from '../models/data.model'
export default class CreditService {
    constructor() {

    }

    getEntitledOrganizations(date) {
        const data = [new Data({
            institution: {
                name: 'aa',
                code: '55555555'
            },
            serialNumber: '00',
            creationDate: '180101',
            paymentDate: '180101',
            senderInstitution: '99999',
            actions: [{
                entitledAccount: {
                    bankID: '52',
                    branchID: '188',
                    accountNumber: '123456789'
                },
                entitledID: '000000018',
                entitledName: 'ddddd',
                entitledKey: '222',
                sum: {
                    shekel: '55',
                    agorot: '55'
                }
            }, {
                entitledAccount: {
                    bankID: '52',
                    branchID: '188',
                    accountNumber: '123456789'
                },
                entitledID: '000000018',
                entitledName: 'hhhh',
                entitledKey: '222',
                sum: {
                    shekel: '55',
                    agorot: '55'
                }
            }]
        })];
        return new Promise(function (resolve, reject) {
            resolve(data);
        });

    }

    getMSVCreditsFile(date) {

        const _msvForamtor = new msvFormator(msvForamt);
        const getDataPromise = this.getEntitledOrganizations(date);
        return getDataPromise.then(data => {
            return `${data.map(org => _msvForamtor.getMSVRows(org)).join()}${_msvForamtor.getLastRowInFile()}`;
        })
    }

}