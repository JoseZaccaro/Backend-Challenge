const joi = require('joi')
const logger = require('../utils/logger')

const storeValidator = (req, res, next) => {

    const storeSchema = joi.object({
        name: joi.string().trim().required(),
        cuit: joi.string().trim().min(11).required(),
        concepts: joi.array().items(joi.string()).max(6).required(),
        currentBalance: joi.number().required(),
        active: joi.boolean().required(),
        lastSale: joi.date().required()
    })

    const validation = storeSchema.validate(req.body, { abortEarly: false })

    if (validation.error) return res.json({ success: false, errores: validation.error.details })


    next()


}

module.exports = storeValidator