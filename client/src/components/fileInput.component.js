import Vue from 'vue';
import xlsxReader from '../common/xlsxReader';

Vue.component('file-input', {
    data: function () {
        return {
            file: undefined
        }
    },

    props: ['load', 'mapping'],
    methods: {


        uploadFile() {
            xlsxReader.read(this.file, this.mapping).then(data => {
                return this.load(data);
            })

        },
        loadFile(event) {
            this.file = event.target.files[0];
        }
    },
    render() {
        return <form onSubmit: prevent={this.uploadFile} >
            <div class="input-group">
                <input type="file" required class="form-control" on-input={this.loadFile} />
                <div class="input-group-append">
                    <button type="submit" class="btn btn-outline-secondary" >   <i class="fas fa-angle-left"></i>  </button>
                </div>
            </div>
        </form >



    }

})