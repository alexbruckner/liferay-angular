<%@ include file="/init.jsp" %> 


<div id="<portlet:namespace/>">
  <div ng-controller="MyController">
    <div>{{greetMe}}</div>
    <div>
  		<button type="button" class="btn btn-primary" ng-click="go('route1')">Route 1</button>
  		<button type="button" class="btn btn-success" ng-click="go('route2')">Route 2</button>
  	</div>
  	
  	 <div ui-view="view">Click on Route 1 or Route 2.</div>
  	
  </div>
</div>

<script>
bootstrapAngular("<portlet:namespace/>");
</script>

