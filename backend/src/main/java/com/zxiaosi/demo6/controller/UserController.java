package com.zxiaosi.demo6.controller;

import com.alibaba.fastjson2.JSONObject;
import com.zxiaosi.demo6.common.utils.Result;
import com.zxiaosi.demo6.domain.vo.EncryptedDataVo;
import com.zxiaosi.demo6.service.UserService;
import com.zxiaosi.demo6.service.WxUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author : zxiaosi
 * @date : 2022/11/23 15:55
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    WxUserService wxUserService;

    @PostMapping("/wxLogin")
    public Result<String> wxLogin(String code, String appId) {
        userService.checkAppId(appId);
        String token = wxUserService.createTokenService(code);
        return Result.success(token);
    }

    @PostMapping("/updatePhone")
    public Result<?> updatePhone(@RequestBody EncryptedDataVo entity) {
        String accessToken = wxUserService.byCodeGetPhoneTokenService(entity.getCode());
        JSONObject userInfo = wxUserService.decryptPhoneService(accessToken, entity.getCode());
        return Result.success(userInfo);
    }

    @GetMapping("/getUserInfo")
    public Result<String> getUserInfo() {
        return Result.success("getUserInfo");
    }
}
