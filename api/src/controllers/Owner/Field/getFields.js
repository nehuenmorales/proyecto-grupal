const {Field} = require('../../../db');

async function getFields(req,res) {
    try {
        const fields = await Field.findAll();
    
    return res.send(fields);
    
    } catch (error) {
        res.send(error)
    }
    
}

module.exports = {getFields};