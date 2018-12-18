
import Joi from 'joi';

const schema = Joi.object().options({ abortEarly: false }).keys({
    bankID: Joi.string().required().error(() => 'קוד בנק לא תקין'),
    accountNumber: Joi.string().required().error(() => 'מספר חשבון לא תקין'),
    branchID: Joi.string().required().error(() => 'קוד סניף לא תקין'),
    sum: Joi.number().required().error(() => 'סכום לא תקין'),
    lastName: Joi.string().required().error(() => 'שם משפחה לא תקין'),
    firstName: Joi.string().required().error(() => 'שם פרטי לא תקין'),
    id: Joi.string().required().error(() => 'ת.ז. לא תקין'),
});

export default class Credit {

    constructor(credit) {



        const { bankID, accountNumber, branchID, sum, lastName, firstName, id } = credit;

        Object.assign(this, { bankID, accountNumber, branchID, sum, lastName, firstName, id });

    }

    validate() {
        const result = Joi.validate(this, schema);
        if (result.error)
            return result.error.details.map(err => err.message);

    }


}

