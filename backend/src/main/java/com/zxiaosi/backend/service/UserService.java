package com.zxiaosi.backend.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.zxiaosi.backend.domain.User;

/**
 * @author : zxiaosi
 * @date : 2022/11/23 15:50
 */
public interface UserService extends IService<User> {

    /**
     * 校验 appId 是否一致
     *
     * @param appId 小程序 appId
     */
    void checkAppId(String appId);

    /**
     * 根据 openId 得到用户信息
     *
     * @param openId 用户 openId
     * @return 用户信息
     */
    User byOpenIdGetUserService(String openId);

    /**
     * 更新用户信息
     *
     * @param entity 用户实体类
     */
    void updateUserInfoService(User entity);


    /**
     * 得到用户信息
     *
     * @return 用户信息
     */
    User getUserInfoService();

}
