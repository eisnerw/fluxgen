WidgetAPIUtils = require('./utils/WidgetAPIUtils');
WidgetActionCreators = require('./actions/WidgetActionCreators');

module.exports = {
   getData: function() {
      var socket = io.connect();
      
      socket.on('message', function(msg) {
         console.log('Message:' , msg);
      });

      socket.on('data', function(msg) {
         switch(msg) {
            case 'Fund':
               //Refresh funds list
               console.log('Refreshing funds');
               WidgetAPIUtils.getAllWidgets().then(function(resolve) {
                  WdgetActionCreators.receiveAllWidgets(resolve);
                  console.log('widgets loaded');
               });
               break;

            default:
               break;
         }

         console.log('Data received:', msg);
      });
   },

   getWidgets: function() {
      WidgetAPIUtils.getAllWidgets().then(function(widgets) {
         WidgetActionCreators.receiveAllWidgets(widgets);
      });
   },

}