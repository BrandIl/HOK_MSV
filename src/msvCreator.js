const getHeaderRecord = (headerData) => {
    const headerRow = {
        recordId: 'K',
        institution: '',
        currency: '00',
        paymentDate: '',
        serialNumber:'001',
        filler1: '0',
        creationDate: '',
        senderInstitution: '',
        filler2: '000000',
        institutionName:'',
        filler3:'',
        titleId:'KOT'
    }
}

const getSumRecord = (sumData) => {

}


const getActionRecord = (data) => {

}

export const getMSVBytes = (data) => {
    return getHeaderRecord({}) +
        getSumRecord({}) +
        getActionRecord({});
}