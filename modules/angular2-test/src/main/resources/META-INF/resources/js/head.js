function bootstrapAngular(portletId) {

	angular.module(portletId, ['ui.router'])
	   .config(['$locationProvider', '$stateProvider', function ($locationProvider, $stateProvider) {
	        $stateProvider
	        .state('route1', {
	            url: '/' + portletId + '/route1',
	            views: {
	                'view': {
	                    templateUrl: '/o/angular2test/html/route1.html',
	                    controller  : 'Route1Controller'
	                }
	            }
	        })
	        .state('route2', {
	            url: '/' + portletId + '/route2',
	            views: {
	                'view': {
	                    templateUrl: '/o/angular2test/html/route2.html',
	                    controller  : 'Route2Controller'
	                }
	            }
	        })
	    }])
	  .controller('MyController', ['$scope', '$state', function ($scope, $state) {
		$scope.greetMe = 'World (' + portletId + ')';
		$scope.go = function(route){
		    $state.go(route);
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