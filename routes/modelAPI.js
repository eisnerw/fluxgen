// Provides CRUD api routes to any passed-in Model.
// Pluralizes the singular model name for the plural GET call:
// model: Widget => '/widgets'

var express    = require('express');
var router     = express.Router();
var pluralize = require('pluralize');

module.exports = function(Model) {
   var name = Model.modelName.toLowerCase();
   var pathToAll = '/' + pluralize(name);
   var pathToOne = '/' + pluralize(name) + '/:id';
   
   router.route(pathToAll)
      //get all
      .get(function(req, res) {
         Model.find(function(err, items) {
            if (err)
               res.send(err);

            res.send(items);
         });
      });
   
   router.route(pathToOne)
      //get one 
      .get(function(req, res) {
         Model.findById(req.params.id, function(err, item) {
            if (err)
               res.send(err);

            res.send(item);
         });
      })
      //update 
      .put(function(req, res) {
         var obj = req.body;
         console.log(req.body);
         console.log(req.params.id);
         delete obj._id; //Don't save object ID passed in from client, managed by Mongo
         delete obj.__v; //Don't save __v passed in from client, managed by Mongo
         var query = {"_id": req.params.id};
         Model.findOneAndUpdate(query, {
            $set: obj
         }, {
            new: true,
            upsert: true
         }, function(err, obj) {
            if (err)
               res.send(err);

            res.status(200).json(obj);
         });
      })
      //delete
      .delete(function(req, res) {
         Model.remove({
            _id: req.params.id
         }, function(err, item) {
            if (err)
               res.send(err)

            res.json({message: 'Successfully deleted'});
         })
      })

   return router;
}