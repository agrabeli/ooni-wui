var angular = require("angular");
var uiRouter = require("angular-ui-router");
var statusComponent = require("./status.component");
var statusPollerFactory = require('./status.poller');

var notificationsDirective = require('./directives/notifications.js');

var statusModule = angular.module("status", [
  uiRouter,
  notificationsDirective
])
.factory('StatusPoller', ['$interval', '$q', '$http', statusPollerFactory])
.component("status", statusComponent)
.name;

module.exports = statusModule;
