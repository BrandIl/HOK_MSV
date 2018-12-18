
import { EOL } from 'os';

export default class MsvFormator {

    constructor(msvForamt) {
        this._msvForamt = msvForamt;
    }

    getHeaderRecord(headerData) { //{institution, paymentDate,creationDate, senderInstitution , institutionName}   
        const header = Object.assign({}, this._msvForamt.header, headerData);

        return Object
            .keys(header)
            .map(key => header[key])
            .join('');
    }

    getSumRecord(sumData) { // institution ,paymentDate , sumShekel ,sumAgorot ,actionsCount
        const sumRow = Object.assign({}, this._msvForamt.bottom, sumData);
        return Object
            .keys(sumRow)
            .map(key => sumRow[key])
            .join('');
    }

    getActionsRecord(data) { //institution ,bankID,branchID,accountNumber,entitledID,entitledName,shekel,agorot,entitledKey    
        const actions = data.map(action => Object.assign({}, this._msvForamt.action, action));
        return actions.map(action => Object
            .keys(action)
            .map(key => action[key])
            .join('')).join(EOL);
    }

    getMSVRows(data) {
        const { institution, paymentDate, creationDate, senderInstitution, actions, sum, actionsCount } = data;

        const headerReacord = this.getHeaderRecord({ institution: institution.code, paymentDate, creationDate, senderInstitution, institutionName: institution.name });

        const actionsRecords = this.getActionsRecord(actions.map(action => {
            const { entitledAccount, entitledID, entitledName, sum, entitledKey } = action;
            const { bankID, branchID, accountNumber } = entitledAccount;
            return { institution: institution.code, bankID, branchID, accountNumber, entitledID, entitledName, shekel: sum.shekel, agorot: sum.agorot, entitledKey }
        }));

        const sumRecords = this.getSumRecord({
            institution: institution.code, paymentDate, sumShekel: sum.shekel, sumAgorot: sum.agorot, actionsCount
        });

        return `${headerReacord}${EOL}${actionsRecords}${EOL}${sumRecords}${EOL}`;
    }

    getLastRowInFile() {
        return `${'9'.repeat(128)}${EOL}`;
    }
}

