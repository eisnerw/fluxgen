var React = require('react');
var Router = require('react-router'); 
var { Route, Redirect, RouteHandler, Link, DefaultRoute } = Router;
// var Subscriptions = require('./subscriptions');

var HomePage = require('./components/pages/Home.jsx');

//Get data and start listening on socket for updates to data
// Subscriptions.getWidgets();


//Create app
var App = React.createClass({
  render: function () {
    return (
      <div>
         <RouteHandler {...this.props}/>
      </div>
    );
  }
});

var routes = (
   <Route handler={App} path="/">
      <DefaultRoute handler={HomePage}/>
   </Route>
);

Router.run(routes, function (Handler, state) {
   var params = state.params;
   React.render(<Handler params={params}/>, document.getElementById('ReactContainer'));
});
