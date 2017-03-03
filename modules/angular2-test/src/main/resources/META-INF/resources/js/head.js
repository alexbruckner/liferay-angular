function bootstrapAngular(portletId) {

	angular.module(portletId, [])
	  .controller('MyController', ['$scope', function ($scope) {
		$scope.greetMe = 'World (' + portletId + ')';
	  }]);

	angular.element(function() {
	  angular.bootstrap(document.getElementById(portletId), [portletId]);
	});
	  
}