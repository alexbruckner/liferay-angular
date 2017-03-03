package com.liferay.docs.example.portlet;

import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.portlet.bridges.mvc.MVCPortlet;
import com.liferay.portal.kernel.service.ServiceContext;
import com.liferay.portal.kernel.service.ServiceContextFactory;
import com.liferay.portal.kernel.util.ParamUtil;

import module.project.services.model.Foo;
import module.project.services.service.FooServiceUtil;

import java.io.IOException;
import java.util.List;

import javax.portlet.ActionRequest;
import javax.portlet.ActionResponse;
import javax.portlet.Portlet;
import javax.portlet.PortletException;
import javax.portlet.ProcessAction;
import javax.portlet.RenderRequest;
import javax.portlet.RenderResponse;

import org.osgi.service.component.annotations.Component;

@Component(
	immediate = true,
	property = {
		"com.liferay.portlet.display-category=category.sample",
		"com.liferay.portlet.instanceable=true",
		"javax.portlet.display-name=module-project Portlet",
		"javax.portlet.init-param.template-path=/",
		"javax.portlet.init-param.view-template=/view.jsp",
		"javax.portlet.resource-bundle=content.Language",
		"javax.portlet.security-role-ref=power-user,user"
	},
	service = Portlet.class
)
public class ModuleProjectMVCPortlet extends MVCPortlet {
	
	@Override
	public void render(RenderRequest request, RenderResponse response) throws IOException, PortletException {
		
		List<Foo> foos = FooServiceUtil.listFoos();
		
		request.setAttribute("foos", foos);
		
		super.render(request, response);
		
	}
	
	@ProcessAction(name = "addFoo")
	public void addFoo(ActionRequest request, ActionResponse response) throws PortalException {	
		
		ServiceContext serviceContext = ServiceContextFactory.getInstance(
		         Foo.class.getName(), request);
		
		FooServiceUtil.addFoo(ParamUtil.get(request, "field1", "?"), serviceContext);

		
		
	}

	
	
}