const Joi = require('joi');

/*
module.exports = Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    status: Joi.number()
})
*/

const createRec = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    status: Joi.number()
});


const updateRec = Joi.object().keys({
    id: Joi.number().required(),
    name: Joi.string(),
    description: Joi.string(),
    status: Joi.number()
});

const deleteRec = Joi.object().keys({
    id: Joi.number().required()
});

const todoUser = Joi.object().keys({
    todo_id: Joi.number().required()
});
    


module.exports = {createVld:createRec, updateVld:updateRec, deleteVld:deleteRec, todoVld:todoUser};