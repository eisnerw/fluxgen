var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var WidgetConstants = require('../constants/WidgetConstants');
var assign = require('object-assign');
var ActionTypes = WidgetConstants.ActionTypes;
var Immutable = require('immutable');

var CHANGE_EVENT = 'change';

var _widgets = Immutable.Map({});
var _currentWidget = {};

function _addWidgets(widgets) {
   widgets.forEach(function(widget) {
      _widgets = _widgets.set(widget._id, widget );
   });
}

/**
* Create a widgets
* @param {widget} the content of the widget
*/
function _createWidget(widget) {
   _widgets = _widgets.set(widget._id, widget);
}

var WidgetStore = assign({}, EventEmitter.prototype, {

   getAllWidgets: function() {
      return _widgets;
   },
   
   /**
   * Get selected widget
   * @return {object}
   */
   getCurrentWidget: function() {
      return _currentWidget;
   },

   emitChange: function() {
      this.emit(CHANGE_EVENT);
   },

   /** 
   * @param {function} callback
   */
   addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
   },

   /**
   * @param {function} callback
   */
   removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
   },

   dispatcherIndex: AppDispatcher.register(function(action) {
      
      switch(action.type) {
         case ActionTypes.RECEIVE_ALL_WIDGETS:
            _addWidgets(action.widgets);
            WidgetStore.emitChange();
            break;

         case ActionTypes.SELECT_WIDGET:
            _currentWidget = _widgets.get(action.widgetId);
            WidgetStore.emitChange();
            break;

         default:
            break;
      }

      return true; // No errors. Needed by promise in Dispatcher.
   })
});

module.exports = WidgetStore;