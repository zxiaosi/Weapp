package com.zxiaosi.backend.common.interceptor;

import cn.hutool.core.date.DateUtil;
import cn.hutool.core.exceptions.ValidateException;
import cn.hutool.jwt.JWTValidator;
import com.zxiaosi.backend.common.exception.CustomException;
import com.zxiaosi.backend.common.holder.CurrentLoginUserHolder;
import com.zxiaosi.backend.common.utils.JwtUtils;
import com.zxiaosi.backend.domain.User;
import com.zxiaosi.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author : zxiaosi
 * @date : 2022/12/02 10:11
 */
@Component
public class AuthInterceptor implements HandlerInterceptor {

    @Value("${config.jwt.header}")
    private String authorization;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserService userService;

    @Autowired
    private CurrentLoginUserHolder currentLoginUserHolder;


    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String token = request.getHeader(authorization);

        if (ObjectUtils.isEmpty(token)) {
            throw new CustomException(authorization + "不能为空!", HttpStatus.UNAUTHORIZED.value());
        }

        if (!jwtUtils.jwtVerify(token)) {
            throw new CustomException(authorization + "解密错误!", HttpStatus.UNAUTHORIZED.value());
        }

        try {
            JWTValidator.of(token).validateDate(DateUtil.date());
        } catch (ValidateException e) {
            throw new CustomException(authorization + "失效，请重新登录!", HttpStatus.UNAUTHORIZED.value());
        }

        // 校验appId
        String appId = jwtUtils.jwtParse(token, "appId");
        userService.checkAppId(appId);

        // 存储用户信息
        String userId = jwtUtils.jwtParse(token, "userId");
        User user = new User();
        user.setId(Long.valueOf(userId));
        currentLoginUserHolder.setUser(user);

        return true;
    }

    /**
     * 方法处理后
     */
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
    }

    /**
     * 请求处理完成后的回调, 即渲染试图后
     */
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        currentLoginUserHolder.removeUser();
    }
}
