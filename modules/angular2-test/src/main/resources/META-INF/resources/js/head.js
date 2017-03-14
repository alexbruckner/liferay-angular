function bootstrapAngular(portletId) {

	angular.module(portletId, ['ui.router', 'zingchart-angularjs'])
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
	        .state('route4', {
	            url: '/' + portletId + '/route4',
	            views: {
	                'view': {
	                    templateUrl: '/o/angular2test/html/route4.html',
	                    controller  : 'Route4Controller'
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
    				try {
    					angular.fromJson(data);
    			        deferred.resolve(data);
    			    } catch (e) {
    			    	console.error(data);
    			    	if(data.startsWith("No JSON web service action")){
	    			    	alert("Not found");
	    			    	//TODO case for 403 errors to ask for page reload.
	    			    	//or other action like automatic token recreation.
    			    	} else {
    			    		alert(data); // or use deferred.reject(data);
    			    	}
    			    }
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
		$scope.chartId = portletId + "_chart1";
		function getRandomInt(min, max) {
		  min = Math.ceil(min);
		  max = Math.floor(max);
		  return Math.floor(Math.random() * (max - min)) + min;
		}
		var arr = [];
		for (i=0; i < 10; i++) {
			arr.push(getRandomInt(0,100));
		}
		$scope.myJson = {
			    type : 'line',
			    series : [
			      { values : arr.slice(0,5) },
			      { values : arr.slice(5,10) }
			    ]
			};
	  }])
	  .controller('Route4Controller', ['$scope', 'MyService', function ($scope, MyService) {
		$scope.greetMe = 'Heatmap test!';
		$scope.chartId = portletId + "_chart2";
		$scope.myJson = {
				  "type": "heatmap",
				  "plot": {
				    "aspect": "none",
				    
				    "rules": [
				      {
				        "rule": "%v >= 50",
				        "background-color": "green"
				      },
				      {
				        "rule": "%v < 50 && %v >= 30",
				        "background-color": "yellow"
				      },
				      {
				        "rule": "%v < 30",
				        "background-color": "red"
				      }
				    ]
				  },
				  "scale-x": {
				    "guide": {
				      "visible": false
				    }
				  },
				  "scale-y": {
				    "guide": {
				      "visible": false
				    }
				  },
				  "series": [
				    {"values": [59,15,5,30,60,99,28,33,34,51,12,30,15,39,15,71,23,51,29,20]},
				    {"values": [34,32,87,65,9,17,40,12,17,22,13,42,46,27,42,33,17,63,47,42]},
				    {"values": [90,19,50,39,12,49,14,61,59,60,23,42,52,12,34,23,16,45,32,31]},
				    {"values": [23,45,12,37,31,35,64,71,63,26,12,36,37,21,74,35,26,41,23,21]},
				    {"values": [43,50,59,60,61,49,23,14,51,46,21,63,24,12,42,31,33,25,12,15]},
				    {"values": [51,59,12,15,29,31,52,32,41,23,15,63,12,23,51,41,23,32,31,17]},
				    {"values": [12,23,26,35,54,34,35,36,37,38,23,18,48,54,52,56,60,70,43,62]},
				    {"values": [15,59,60,61,15,79,11,21,6,19,3,28,17,34,5,20,13,15,16,31]},
				    {"values": [61,54,37,41,36,58,42,21,12,17,32,41,64,27,48,35,42,9,41,11]},
				    {"values": [24,45,12,71,60,23,33,41,53,27,35,52,23,46,42,64,35,37,51,23]},
				    {"values": [63,62,23,63,54,73,26,36,47,63,23,45,75,32,45,16,35,24,52,3]},
				    {"values": [22,30,11,56,85,34,75,54,76,45,36,23,74,86,88,56,49,28,34,31]},
				    {"values": [23,82,68,46,58,47,68,63,43,12,36,75,77,56,45,31,90,89,31,35]},
				    {"values": [16,85,86,74,54,65,73,47,30,31,34,35,58,51,64,26,23,12,43,40]},
				    {"values": [12,87,36,53,62,84,45,65,73,52,34,28,25,19,30,33,37,34,63,77]}
				  ]
				};
			
	  }]);
	  
	angular.element(function() {
	  angular.bootstrap(document.getElementById(portletId), [portletId]);
	});
	  
}