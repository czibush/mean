var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompanySchema = new Schema({
    name: {
        type: String
    },

    Created_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: {
            type: String,
            enum: ['pending', 'ongoing', 'completed']
        },
        default: ['pending']
    },
    address: {
        type: String
    }
});

module.exports = mongoose.model('Company', CompanySchema);
