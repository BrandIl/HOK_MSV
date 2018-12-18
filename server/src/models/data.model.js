
import Joi from 'joi';

const schema = Joi.object().options({ abortEarly: false }).keys({
    institution: Joi.object().required().keys({
        name: Joi.string().required().max(30),
        code: Joi.string().required().min(8).max(8)
    }),
    creationDate: Joi.string().required().min(6).max(6),
    paymentDate: Joi.string().required().min(6).max(6),
    senderInstitution: Joi.string().required().min(5).max(5),
    actions: Joi.array().required().items(Joi.object({
        entitledAccount: Joi.object().required().keys({
            bankID: Joi.string().required().min(1).max(2),
            branchID: Joi.string().required().min(1).max(3),
            accountNumber: Joi.string().required().min(4).max(9)
        }),
        entitledID: Joi.string().required().min(9).max(9),
        entitledName: Joi.string().required().max(16),
        sum: Joi.object().required().keys({
            shekel: Joi.string().required().max(11),
            agorot: Joi.string().required().max(2)
        }),
        entitledKey: Joi.string().required().max(20)
    }))
});


export default class Data {
    constructor(data) {

        const result = Joi.validate(data, schema);

        if (result.error)
            throw new Error(result.error);

        const { institution, senderInstitution, serialNumber, creationDate, paymentDate, actions } = data;

        this.institution = {
            code: institution.code,
            name: (' '.repeat(30) + institution.name).slice(-30)
        };
        this.serialNumber = serialNumber;
        this.creationDate = creationDate;
        this.paymentDate = paymentDate;
        this.senderInstitution = senderInstitution;
        this.actions = actions.map(action => {
            return Object.assign({}, action, {
                entitledAccount: Object.assign({}, action.entitledAccount, {
                    bankID: ('0'.repeat(2) + action.entitledAccount.bankID).slice(-2),
                    branchID: ('0'.repeat(3) + action.entitledAccount.branchID).slice(-3),
                    accountNumber: ('0'.repeat(9) + action.entitledAccount.accountNumber).slice(-9)
                }),
                sum: {
                    shekel: ('0'.repeat(11) + action.sum.shekel).slice(-11),
                    agorot: ('0'.repeat(2) + action.sum.agorot).slice(-2)
                },
                entitledName: (' '.repeat(16) + action.entitledName).slice(-16),
                entitledKey: ('0'.repeat(20) + action.entitledKey).slice(-20)
            })
        });

        const agorot = actions.reduce((total, action) => total + Number(action.sum.agorot), 0);
        const shekel = actions.reduce((total, action) => total + Number(action.sum.shekel), 0);
        const sum = agorot + shekel * 100;

        this.sum = {
            shekel: ('0'.repeat(13) + Math.floor(sum / 100)).slice(-13),
            agorot: ('0'.repeat(2) + sum % 100).slice(-2)
        }

        this.actionsCount = ('0'.repeat(7) + actions.length).slice(-7);


    }

}
