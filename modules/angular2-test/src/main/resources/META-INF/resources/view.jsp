<%@ include file="/init.jsp" %> 


<div id="<portlet:namespace/>">
  <div ng-controller="MyController">
    Hello {{greetMe}}!
  </div>
</div>
  
<script>
bootstrapAngular("<portlet:namespace/>");
</script>

