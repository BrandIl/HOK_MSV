import Credit from '../models/credit.model'
import CreditMSVService from '../services/creditMSV.service';
import '../components/credits.component'
import '../components/fileinput.component'

export default {
    data: function () {
        return {
            data: [],
            fileName: '',
            mapping: {
                bankID: 'מס\' בנק',
                accountNumber: 'מס\' חשבון',
                branchID: 'מס\' סניף',
                sum: 'סכום',
                lastName: 'שם משפחה',
                firstName: 'שם פרטי',
                id: 'ת.ז.'
            }



        }
    },
    methods: {
        loadCreditRows(fileName, data) {
            this.data = data.map(dt => {
                return new Credit(dt)
            });
            this.fileName = `${fileName}.MSV`;
        },
        downloadFile(file) {
            const { fileName, content } = file;
            const blob = new Blob([new Uint8Array(content.data)]);
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = this.fileName;
            a.click();
        },
        getMsvFile() {
            return new CreditMSVService()
                .uploadFile(this.data)
                .then(this.downloadFile)
        }
    },
    render() {

        const { data } = this;
        const isInvalid = data.some(act => !!act.validate());

        return <div>
            <div class="buttons">
                <file-input load={this.loadCreditRows} mapping={this.mapping} />
                <button on-click={this.getMsvFile} disabled={isInvalid} >הפק קובץ מ.ס.ב.</button>
            </div>
            <credits credits={this.data}></credits>

        </div >

    }
}