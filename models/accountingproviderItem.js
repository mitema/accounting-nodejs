const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountingProviderSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = AccountingProviderItem = mongoose.model('AccountingProviderItem', accountingProviderSchema)