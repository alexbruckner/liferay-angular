function bootstrapAngular(portletId) {

	angular.module(portletId, ['ngRoute'])
	  .config(function($routeProvider) {
		    $routeProvider
			    .when("/" + portletId + "/route1", {
			        templateUrl : "/o/angular2test/html/route1.html",
			        controller  : 'Route1Controller' 
			    })
			    .when("/" + portletId + "/route2", {
			        templateUrl : "/o/angular2test/html/route2.html",
			        controller  : 'Route2Controller' 
			    })
		    
		})
	  .controller('MyController', ['$scope', '$location', function ($scope, $location) {
		$scope.greetMe = 'World (' + portletId + ')';
		$scope.go = function(route){
		    $location.path(route);
		}
	  }])
	  .controller('Route1Controller', ['$scope', function ($scope) {
		$scope.greetMe = 'Route1 Controller';
	  }])
	  .controller('Route2Controller', ['$scope', function ($scope) {
		$scope.greetMe = 'Route2 Controller';
	  }]);
	  
	angular.element(function() {
	  angular.bootstrap(document.getElementById(portletId), [portletId]);
	});
	  
}