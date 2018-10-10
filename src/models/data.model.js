import Action from './action.model';
import Institution from './institution.model';
import Joi from 'joi';

const schema = {
    institution: Joi.object().required().keys({
        name: Joi.string().required(),
        code: Joi.string().required()
    }),
    serialNumber: Joi.string().required(),
    creationDate: Joi.string().required(),
    paymentDate: Joi.string().required(),
    senderInstitution: Joi.string().required(),
    actions: Joi.array().required().items(Joi.object({
        entitledAccount: Joi.object().required().keys({
            bankID: Joi.string().required(),
            branchID: Joi.string().required(),
            accountType: Joi.string().required(),
            accountNumber: Joi.string().required()
        }),
        entitledID: Joi.string().required(),
        entitledName: Joi.string().required(),
        sum: Joi.object().required().keys({
            shekel: Joi.string().required(),
            agorot: Joi.string().required()
        }),
        entitledKey: Joi.string()
    }))
};


export default class Data {
    constructor(data) {

        const result = Joi.validate(data, schema);

        if (result.error)
            throw new Error(result.error);

        const { institution, senderInstitution, serialNumber, creationDate, paymentDate, actions } = data;

        this.institution = institution;
        this.serialNumber = serialNumber;
        this.creationDate = creationDate;
        this.paymentDate = paymentDate;
        this.senderInstitution = senderInstitution;
        this.actions = actions;


    }

}
