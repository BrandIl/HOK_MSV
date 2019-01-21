import FetchHandler from './fetchHandler';

export default class CreditMSVService {
    constructor() {
        this._serviceAddress = '/api/credit/data';

        if (window.location.hostname == 'localhost')
            this._serviceAddress = 'http://localhost:3033/api/credit/data';

        this._fetchHandler = new FetchHandler();
    }



    uploadFile(file) {
        console.log(`${JSON.stringify(file)}`);
        return this._fetchHandler.fetch(`${this._serviceAddress}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(file)
        });
        //.then(this._downloadFile);


    }
}