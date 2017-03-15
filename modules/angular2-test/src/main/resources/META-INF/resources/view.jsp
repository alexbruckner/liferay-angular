<%@ include file="/init.jsp" %> 


<div id="<portlet:namespace/>">
  <div ng-controller="MyController">
    <div>{{greetMe}}</div>
    <div>
  		<button type="button" class="btn btn-primary" ng-click="go('route1')">Route 1</button>
  		<button type="button" class="btn btn-success" ng-click="go('route2')">Route 2</button>
  		<button type="button" class="btn btn-warning" ng-click="go('route3')">Route 3</button>
  		<button type="button" class="btn btn-danger" ng-click="go('route4')">Route 4</button>
  		<button type="button" class="btn btn-info" ng-click="go('route5')">Route 5</button>
  	</div>
  	
  	 <div ui-view="view">Click on Route 1 or Route 2 or Route 3.</div>
  	
  </div>
</div>

<script>
bootstrapAngular("<portlet:namespace/>");
</script>

