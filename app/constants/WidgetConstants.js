var keyMirror = require('react/lib/keyMirror');

module.exports = {
   ActionTypes: keyMirror({
      RECEIVE_ALL_WIDGETS: null,
      SELECT_WIDGET: null,
      CREATE_WIDGET: null,
      DESTROY_WIDGET: null,
   })
};