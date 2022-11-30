package com.zxiaosi.backend.controller;

import com.alibaba.fastjson2.JSONObject;
import com.zxiaosi.backend.common.holder.CurrentLoginUserHolder;
import com.zxiaosi.backend.common.utils.Result;
import com.zxiaosi.backend.domain.User;
import com.zxiaosi.backend.domain.vo.EncryptedDataVo;
import com.zxiaosi.backend.service.UserService;
import com.zxiaosi.backend.service.WxUserService;
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
    private UserService userService;

    @Autowired
    private WxUserService wxUserService;

    @PostMapping("/wxLogin")
    public Result<String> wxLogin(String code, String appId) {
        userService.checkAppId(appId);
        String token = wxUserService.createTokenService(code);
        return Result.success(token);
    }

    @PostMapping("/decryptPhone")
    public Result<?> decryptPhone(@RequestBody EncryptedDataVo entity) {
        String accessToken = wxUserService.byCodeGetPhoneTokenService(entity.getCode());
        JSONObject userInfo = wxUserService.decryptPhoneService(accessToken, entity.getCode());
        // 这里建议可以保存手机号
        return Result.success(userInfo);
    }

    @PostMapping("/updateUserInfo")
    public Result<?> updateUserInfo(@RequestBody User entity) {
        userService.updateUserInfoService(entity);
        return Result.success();
    }

    @GetMapping("/getUserInfo")
    public Result<User> getUserInfo() {
        User user = userService.getUserInfoService();
        return Result.success(user);
    }
}
