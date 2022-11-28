package com.zxiaosi.demo6.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zxiaosi.demo6.common.exception.CustomException;
import com.zxiaosi.demo6.domain.User;
import com.zxiaosi.demo6.mapper.UserMapper;
import com.zxiaosi.demo6.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Objects;

/**
 * @author : zxiaosi
 * @date : 2022/11/23 15:52
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Value("${config.weixin.appid}")
    private String appid;

    @Override
    public User byOpenIdGetUserService(String openId) {
        LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(User::getOpenId, openId);
        User user = userMapper.selectOne(queryWrapper);

        if (user == null) {
            user = new User();
            user.setOpenId(openId);
            userMapper.insert(user);
        }

        return user;
    }

    @Override
    public void checkAppId(String appId) {
        if (!Objects.equals(appId, appid)) {
            throw new CustomException("小程序AppId不一致");
        }
    }


}
