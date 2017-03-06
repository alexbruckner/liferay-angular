<%@ include file="/init.jsp" %> 


<div id="<portlet:namespace/>">
  <div ng-controller="MyController">
    <div>Hello {{greetMe}}!</div>
    <div>
  		<a ng-click="go('route1')">Route 1</a>
  		<a ng-click="go('route2')">Route 2</a>
  	</div>
  	
  	 <div ui-view="view">content</div>
  	
  </div>
</div>

<script>
bootstrapAngular("<portlet:namespace/>");
</script>

