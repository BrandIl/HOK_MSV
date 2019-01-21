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
        loadFile(event) {
            var file = event.target.files[0];
            var fileName = file.name.replace(/\.[^/.]+$/, "");
            xlsxReader.read(file, this.mapping).then(data => {
                return this.load(fileName,data);
            })
        }
    },
    render() {
        return <form  >
            <input type="file" required class="form-control" on-input={this.loadFile} />
        </form >



    }

})