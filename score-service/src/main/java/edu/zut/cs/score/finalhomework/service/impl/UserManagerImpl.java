package edu.zut.cs.score.finalhomework.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import edu.zut.cs.score.base.service.impl.GenericManagerImpl;
import edu.zut.cs.score.finalhomework.dao.UserDao;
import edu.zut.cs.score.finalhomework.domain.User;
import edu.zut.cs.score.finalhomework.service.UserManager;

@Component
public class UserManagerImpl extends GenericManagerImpl<User, Long> implements UserManager{
	UserDao userDao;
	
	@Autowired
	public void setUserDao(UserDao userDao) {
		this.userDao=userDao;
		this.dao=this.userDao;
	}
	
	@Override
	public User findbyUsername(String username) {
		// TODO Auto-generated method stub
		return null;
	}
	
}
