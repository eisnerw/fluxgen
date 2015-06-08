var context = require.context('./app/__tests__/', true, /-test\.jsx?$/); 

context.keys().forEach(context);