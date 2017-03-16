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

package mysql.test.service.impl;

import java.util.List;

import aQute.bnd.annotation.ProviderType;
import mysql.test.model.Book;
import mysql.test.service.BookLocalServiceUtil;
import mysql.test.service.base.BookServiceBaseImpl;

/**
 * The implementation of the book remote service.
 *
 * <p>
 * All custom service methods should be put in this class. Whenever methods are added, rerun ServiceBuilder to copy their definitions into the {@link mysql.test.service.BookService} interface.
 *
 * <p>
 * This is a remote service. Methods of this service are expected to have security checks based on the propagated JAAS credentials because this service can be accessed remotely.
 * </p>
 *
 * @author Brian Wing Shun Chan
 * @see BookServiceBaseImpl
 * @see mysql.test.service.BookServiceUtil
 */
@ProviderType
public class BookServiceImpl extends BookServiceBaseImpl {
	/*
	 * NOTE FOR DEVELOPERS:
	 *
	 * Never reference this class directly. Always use {@link mysql.test.service.BookServiceUtil} to access the book remote service.
	 */
	
	public List<Book> listBooks(){
		return BookLocalServiceUtil.listBooks();
	}
	
	public Book addBook(String title) {
		return BookLocalServiceUtil.addBook(title);
	}
	
}