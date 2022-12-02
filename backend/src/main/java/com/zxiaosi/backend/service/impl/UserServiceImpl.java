package com.zxiaosi.backend.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.bean.copier.CopyOptions;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zxiaosi.backend.common.exception.CustomException;
import com.zxiaosi.backend.common.holder.CurrentLoginUserHolder;
import com.zxiaosi.backend.domain.User;
import com.zxiaosi.backend.mapper.UserMapper;
import com.zxiaosi.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Objects;

/**
 * 用户服务实现类
 *
 * @author : zxiaosi
 * @date : 2022/12/02 10:11
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    @Value("${config.weixin.appid}")
    private String appid;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private CurrentLoginUserHolder currentLoginUserHolder;

    @Override
    public void checkAppId(String appId) {
        if (!Objects.equals(appId, appid)) {
            throw new CustomException("小程序AppId不一致");
        }
    }

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
    public void updateUserInfoService(User entity) {
        User user = currentLoginUserHolder.getUser();
        BeanUtil.copyProperties(entity, user, CopyOptions.create().setIgnoreNullValue(true).setIgnoreError(true));
        updateById(user);
    }

    @Override
    public User getUserInfoService() {
        User user = currentLoginUserHolder.getUser();
        return userMapper.selectById(user.getId());
    }


}
