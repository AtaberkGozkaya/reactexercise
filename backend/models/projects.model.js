const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }

});

const project = mongoose.model('project', projectSchema);
module.exports = project;