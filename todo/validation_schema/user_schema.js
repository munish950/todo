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
    email: Joi.string().required(),
    password: Joi.string().required(),
    status: Joi.number()
});


const updateRec = Joi.object().keys({
    id: Joi.number().required(),
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    status: Joi.number()
});

const deleteRec = Joi.object().keys({
    id: Joi.number().required()
});

const userTodo = Joi.object().keys({
    user_id: Joi.number().required(),
    todo_id: Joi.number().required(),
    todo_text: Joi.string().empty(''),
    document: Joi.empty('')
}).unknown();
    


module.exports = {createVld:createRec, updateVld:updateRec, deleteVld:deleteRec, userTodoVld:userTodo};