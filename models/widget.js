var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WidgetSchema = new Schema({
      name:                   String,
      
      created_at:             Date,
      updated_at:             Date
});

WidgetSchema.pre('save', function(next) {
    //get current date
    var currentDate = new Date();

    //change the updated_at field
    this.updated_at = currentDate;

    //if created_at doesn't exist, add to that field
    if (!this.created_at) {
        this.created_at = currentDate;
    }
    
    next();
});

module.exports = mongoose.model('Widget', WidgetSchema);