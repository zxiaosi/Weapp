package com.zxiaosi.backend.service;

import com.alibaba.fastjson2.JSONObject;
import com.baomidou.mybatisplus.extension.service.IService;
import com.zxiaosi.backend.domain.WxUser;

/**
 * 微信用户Service
 *
 * @author : zxiaosi
 * @date : 2022/12/02 10:11
 */
public interface WxUserService extends IService<WxUser> {

    /**
     * 获取用户 Token
     *
     * @param code 登录 code
     * @return Token
     */
    String createTokenService(String code);


    /**
     * 根据手机号 Code 获取 换取能够解密手机号的 Token
     *
     * @param code 能够获取解密手机号的 code
     * @return Access_Token
     */
    String byCodeGetPhoneTokenService(String code);

    /**
     * 根据 手机号的 Token 和 Code 获取解密后的手机号
     *
     * @param accessToken 能够获取解密手机号的 access_token
     * @param code        能够获取解密手机号的 code
     * @return Phone
     */
    JSONObject decryptPhoneService(String accessToken, String code);
}
