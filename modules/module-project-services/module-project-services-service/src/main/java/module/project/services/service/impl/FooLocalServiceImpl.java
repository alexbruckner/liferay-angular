/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

package module.project.services.service.impl;

import java.util.Date;
import java.util.List;

import com.liferay.portal.kernel.exception.NoSuchUserException;
import com.liferay.portal.kernel.model.User;
import com.liferay.portal.kernel.service.ServiceContext;

import aQute.bnd.annotation.ProviderType;
import module.project.services.model.Foo;
import module.project.services.service.base.FooLocalServiceBaseImpl;

/**
 * The implementation of the foo local service.
 *
 * <p>
 * All custom service methods should be put in this class. Whenever methods are added, rerun ServiceBuilder to copy their definitions into the {@link module.project.services.service.FooLocalService} interface.
 *
 * <p>
 * This is a local service. Methods of this service will not have security checks based on the propagated JAAS credentials because this service can only be accessed from within the same VM.
 * </p>
 *
 * @author Brian Wing Shun Chan
 * @see FooLocalServiceBaseImpl
 * @see module.project.services.service.FooLocalServiceUtil
 */
@ProviderType
public class FooLocalServiceImpl extends FooLocalServiceBaseImpl {
	/*
	 * NOTE FOR DEVELOPERS:
	 *
	 * Never reference this class directly. Always use {@link module.project.services.service.FooLocalServiceUtil} to access the foo local service.
	 */
	public Foo addFoo(String field1, ServiceContext serviceContext) throws NoSuchUserException {
		User user = userPersistence.findByPrimaryKey(serviceContext.getUserId());
		Date now = new Date();
		
		Foo foo = createFoo(counterLocalService.increment());
		foo.setGroupId(serviceContext.getScopeGroupId());
		foo.setCompanyId(user.getCompanyId());
		foo.setUserId(user.getUserId());
		foo.setUserName(user.getFullName());
		foo.setCreateDate(serviceContext.getCreateDate(now));
		foo.setModifiedDate(serviceContext.getModifiedDate(now));
		
		foo.setField1(field1);
		
		return addFoo(foo);
	}
	
	public List<Foo> listFoos() {
		return fooPersistence.findAll();
	}
}