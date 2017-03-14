function bootstrapAngular(portletId) {

	angular.module(portletId, ['ui.router'])
	   .config(['$stateProvider', function ($stateProvider) {
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
	        .state('route3', {
	            url: '/' + portletId + '/route3',
	            views: {
	                'view': {
	                    templateUrl: '/o/angular2test/html/route3.html',
	                    controller  : 'Route3Controller'
	                }
	            }
	        })
	    }])
	  .factory('MyService', ['$http', '$q', function($http, $q) {
		  var url = "https://jsonplaceholder.typicode.com/users";
		  return {
		    users: function() {
		      return $http.get(url);  
		    },
		    user: function(id) {
		      return $http.get(url + "/" + id); 	
		    },
		    foos: function()  {
		    	var deferred = $q.defer();

    			Liferay.Service('/foo.foo/list-foos', function(data){
    				deferred.resolve(data);
	    		});  
    			
    			return deferred.promise;
		    }
		  };
	  }])
	  .controller('MyController', ['$scope', '$state', function ($scope, $state) {
		$scope.greetMe = 'Portlet ID: ' + portletId;
		$scope.go = function(route){
		    $state.go(route);
		}
	  }])
	  .controller('Route1Controller', ['$scope', 'MyService', function ($scope, MyService) {
		$scope.greetMe = 'List of sample users from https://jsonplaceholder.typicode.com/users';
		$scope.users = [];
		MyService.users().then(function(data) { // or user(1) for id = 1.
		    $scope.users = data.data;
		});
	  }])
	  .controller('Route2Controller', ['$scope', 'MyService', function ($scope, MyService) {
		$scope.greetMe = 'List of foos calling ServiceBuilder REST JSON API: /foo.foo/list-foos';
		$scope.foos = [];
		MyService.foos().then(function(data) { 
		    $scope.foos = data;
		});
	  }])
	  .controller('Route3Controller', ['$scope', function ($scope) {
		$scope.greetMe = 'Plotter test';
		
	  }]);
	  
	angular.element(function() {
	  angular.bootstrap(document.getElementById(portletId), [portletId]);
	});
	  
}