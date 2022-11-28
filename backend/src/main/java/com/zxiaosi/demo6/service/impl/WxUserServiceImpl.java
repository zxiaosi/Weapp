package com.zxiaosi.demo6.service.impl;

import cn.hutool.core.util.StrUtil;
import cn.hutool.http.*;
import com.alibaba.fastjson2.JSON;
import com.alibaba.fastjson2.JSONObject;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zxiaosi.demo6.common.exception.CustomException;
import com.zxiaosi.demo6.common.utils.JwtUtils;
import com.zxiaosi.demo6.common.utils.RedisUtils;
import com.zxiaosi.demo6.domain.User;
import com.zxiaosi.demo6.domain.WxUser;
import com.zxiaosi.demo6.mapper.WxUserMapper;
import com.zxiaosi.demo6.service.UserService;
import com.zxiaosi.demo6.service.WxUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;

/**
 * @author : zxiaosi
 * @date : 2022/11/24 17:10
 */
@Service
public class WxUserServiceImpl extends ServiceImpl<WxUserMapper, WxUser> implements WxUserService {

    private final Logger LOGGER = LoggerFactory.getLogger(WxUserServiceImpl.class);

    @Autowired
    private RedisUtils redisUtils;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserService userService;

    @Value("${config.weixin.appid}")
    private String appid;

    @Value("${config.weixin.secret}")
    private String secret;

    @Value("${config.jwt.expire}")
    private String expire;

    /**
     * <a href="https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/login/auth.code2Session.html">
     * 官网链接【根据appid、secret、code换取session_key、openid】
     * </a>
     *
     * @param code 登录 code
     * @return token
     */
    @Override
    public String createTokenService(String code) {
        String url = "https://api.weixin.qq.com/sns/jscode2session?appid={0}&secret={1}&js_code={2}&grant_type=authorization_code";
        String replaceUrl = url.replace("{0}", appid).replace("{1}", secret).replace("{2}", code);
        String res = HttpUtil.get(replaceUrl);

        JSONObject object = JSON.parseObject(res);
        String openId = object.getString("openid");
        if (StrUtil.isEmpty(openId)) {
            throw new CustomException("向微信服务器发送请求: code换取openId请求错误!");
        }
        User user = userService.byOpenIdGetUserService(openId);
        redisUtils.set("userId-" + user.getId(), object);

        return jwtUtils.jwtCreate(user.getId(), openId, appid, Integer.parseInt(expire));
    }

    /**
     * <a href="https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/access-token/auth.getAccessToken.html">
     * 官网链接【根据appid、secret换取access_token】
     * </a>
     *
     * @param code 能够获取解密手机号的 code
     * @return 能够解密手机号的 Token
     */
    @Override
    public String byCodeGetPhoneTokenService(String code) {
        String url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={0}&secret={1}";
        String requestUrl = url.replace("{0}", appid).replace("{1}", secret);
        String res = HttpUtil.get(requestUrl);

        String accessToken = JSON.parseObject(res).getString("access_token");
        if (StrUtil.isEmpty(accessToken)) {
            throw new CustomException("向微信服务器发送请求: 获取解密手机号的token失败!");
        }

        return accessToken;
    }

    /**
     * <a href="https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/phonenumber/phonenumber.getPhoneNumber.html">
     * 官网链接【根据accessToken、code换取phone】
     * </a>
     *
     * @param accessToken 能够获取解密手机号的 access_token
     * @param code        加密数据【能够获取解密手机号的 code】
     * @return 解密后的手机号对象
     */
    @Override
    public JSONObject decryptPhoneService(String accessToken, String code) {
        try {
            String url = "https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token={0}";
            String requestUrl = url.replace("{0}", accessToken);

            HashMap<String, Object> params = new HashMap<>();
            params.put("code", code);
            String requestParams = JSON.toJSONString(params);

            HttpResponse response = HttpRequest.post(requestUrl)
                    .header(Header.CONTENT_TYPE, "application/json")
                    .body(requestParams)
                    .execute();

            JSONObject object = JSONObject.parseObject(response.body());
            Integer errcode = object.getInteger("errcode");
            if (errcode != 0) {
                throw new CustomException("向微信服务器发送请求: 格式错误, 解密手机号失败!");
            }
            return object.getJSONObject("phone_info");
        } catch (HttpException e) {
            e.printStackTrace();
            throw new CustomException("向微信服务器发送请求: 解密手机号请求出错!");
        }
    }

}
