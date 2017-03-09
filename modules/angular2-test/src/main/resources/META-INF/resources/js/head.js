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
	    }])
	  .factory('MyService', ['$http', function($http) {
		  var url = "https://jsonplaceholder.typicode.com/users";
		  return {
		    users: function() {
		      return $http.get(url);  
		    },
		    user: function(id) {
		      return $http.get(url + "/" + id); 	
		    },
		    foos: function()  {
		    	return new Promise(function(resolve, reject){
		    		Liferay.Service('/foo.foo/list-foos', function(data){
		    			resolve(data);
			    	});    
		    	});
		    }
		  };
	  }])
	  .controller('MyController', ['$scope', '$state', function ($scope, $state) {
		$scope.greetMe = 'World (' + portletId + ')';
		$scope.go = function(route){
		    $state.go(route);
		}
	  }])
	  .controller('Route1Controller', ['$scope', 'MyService', function ($scope, MyService) {
		$scope.greetMe = 'Route1 Controller';
		$scope.users = [];
		MyService.users().then(function(data) { // or user(1) for id = 1.
		    $scope.users = data.data;
		    $scope.$apply();
		});
	  }])
	  .controller('Route2Controller', ['$scope', 'MyService', function ($scope, MyService) {
		$scope.greetMe = 'Route2 Controller';
		$scope.foos = [];
		MyService.foos().then(function(data) { 
		    $scope.foos = data;
		    $scope.$apply();
		});
	  }]);
	  
	angular.element(function() {
	  angular.bootstrap(document.getElementById(portletId), [portletId]);
	});
	  
}