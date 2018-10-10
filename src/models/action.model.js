import Joi from 'joi';

const schemaEntitledAccount = Joi.object({
    bankID: Joi.string().required(),
    branchID: Joi.string().required(),
    accountType: Joi.string().required(),
    accountNumber: Joi.string().required(),
});

const schema = {
    entitledAccount: schemaEntitledAccount,
    entitledID: Joi.string().required(),
    entitledName: Joi.string().required(),
    sum: {
        shekel: Joi.string().required(),
        agorot: Joi.string().required()
    },
    entitledKey: Joi.string()
};

class Action {
    constructor(data) {

        Joi.validate(data, schema, function (err, value) {
            console.log(err);
        });
        
        const { entitledAccount, entitledID, entitledName, sum, entitledKey } = data;
        this.entitledAccount = entitledAccount;
        this.entitledID = entitledID;
        this.entitledName = entitledName;
        this.sum = sum;
        this.entitledKey = entitledKey;
    }

}

