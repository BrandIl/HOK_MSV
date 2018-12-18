import XLSX from 'xlsx';

const read = (file, mapping) => {

    const promise = new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.onload = function (e) {
            var data = e.target.result;
            data = new Uint8Array(data);
            var workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const json = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

            const mappedJson = json.map(row => {

                return Object.keys(mapping).reduce((mappedRow, key) => {
                    return Object.assign({}, mappedRow, {
                        [key]: row[mapping[key]] ? `${row[mapping[key]]}` : undefined
                    })
                }, {})

            })
       
            resolve(mappedJson);

        };
        reader.readAsArrayBuffer(file);
    });

    return promise;

}
export default { read };