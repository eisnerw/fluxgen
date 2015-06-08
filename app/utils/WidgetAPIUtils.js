var WidgetActionCreators = require('../actions/WidgetActionCreators');
var Promise = require('bluebird');

module.exports = {
   getAllWidgets: function() {
      return new Promise(function(resolve, reject) {
         $.ajax({
            url: '/api/widgets',
            dataType: 'json',
            success: function(data) {
               resolve(data);
            },

            error: function(xhr, status, err) {
               // console.log(url, status, err.toString());
               reject('Error');
            }
         });
      });
   },

   saveWidget: function(widget) {
      return new Promise(function(resolve, reject) {
         $.ajax({
            url: '/api/widgets/' + widget._id,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            type: 'PUT',
            data: JSON.stringify(widget),
            success: function(data) {
               resolve(data);
            },
            error: function(xhr, status, err) {
               reject(url, status, err.toString());
            },
         });
      })
   },

   destroyWidget: function(widgetId) {
      return new Promise(function(resolve, reject) {
         $.ajax({
            url: '/api/widgets/' + id,
            dataType: 'json',
            type: 'DELETE',
            success: function(data) {
               resolve(data);
            },
            error: function(xhr, status, err) {
               reject(err.toString());
            }
         });
      });
   } 
}