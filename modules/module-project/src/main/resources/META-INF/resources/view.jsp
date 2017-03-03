<%@ include file="/init.jsp" %>

<p>
	<b><liferay-ui:message key="module-project.caption"/></b>
</p>



<liferay-ui:search-container delta="10" emptyResultsMessage="There are no foos to display">
      <liferay-ui:search-container-results results="<%= (List<Foo>) renderRequest.getAttribute("foos") %>" />
      
      <liferay-ui:search-container-row className="module.project.services.model.Foo" modelVar="foo">
           <liferay-ui:search-container-column-text name="field1" value="<%=foo.getField1()%>" /> 
       </liferay-ui:search-container-row>
       
       <liferay-ui:search-iterator />
  </liferay-ui:search-container>
  
<portlet:actionURL name="addFoo" var="addFooURL" />
<aui:form name="addDetails" action="<%=addFooURL.toString() %>" method="post" >
        <aui:input type="text" label="field1: " name="field1" value="" />
        <aui:button type="submit" value="addFoo" />
</aui:form>