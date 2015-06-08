var AppDispatcher = require('../dispatcher/AppDispatcher');
var WidgetConstants = require('../constants/WidgetConstants');
var ActionTypes = WidgetConstants.ActionTypes;

var WidgetActions = {
   receiveAllWidgets: function(widgets) {
      AppDispatcher.dispatch({
         type: ActionTypes.RECEIVE_ALL_WIDGETS,
         widgets: widgets
      });
   },

   selectWidget: function(widgetId) {
      AppDispatcher.dispatch({
         type: ActionTypes.SELECT_WIDGET,
         widgetId: widgetId
      });
   },
   
   createWidget: function(widget) {
      AppDispatcher.dispatch({
         type: ActionTypes.CREATE_WIDGET,
         widget: widget
      });
   },

   updateWidget: function(name, value) {
      AppDispatcher.dispatch({
         type: ActionTypes.UPDATE_WIDGET,
         name: name,
         value: value
      })
   },

   destroyWidget: function(widgetId) {
      AppDispatcher.dispatch({
         type: ActionTypes.DESTROY_WIDGET,
         widgetId: widgetId
      });
   },
};

module.exports = WidgetActions;