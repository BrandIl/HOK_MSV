import Vue from 'vue';
import Credit from '../models/credit.model'


Vue.component('credit', {
    data: function () {
        return {

        }
    },
    methods: {

    },
    props: { 'credit': Credit, 'index': Number },
    render() {
        const { credit, index } = this;
        const { bankID, branchID, accountNumber, id, lastName, firstName, sum } = credit;

        const errors = credit.validate();
        const isVaild = !!errors;
        const errorsElement = isVaild ? errors.map(err => <span >{err}</span>) : '';

        return <div>

            <div class="credit">
                <div class="row">
                    <span class="col-md-1">{index}</span>
                    <span class="col-md-2">{id}</span>
                    <span class="col-md-3">{lastName}&nbsp;{firstName}</span>
                    <span class="col-md-2">{bankID}&nbsp;{branchID}&nbsp;{accountNumber}</span>
                    <span class="col-md-1">&#8362;{sum}</span>
                    <span class="col-md-2 error">
                        {errorsElement}
                    </span>
                </div>



            </div>

        </div>
    }
})