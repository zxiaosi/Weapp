package com.zxiaosi.backend.common.exception;

import cn.hutool.jwt.JWTException;
import com.zxiaosi.backend.common.utils.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

import javax.naming.AuthenticationException;

/**
 * 全局异常捕获
 *
 * @author : zxiaosi
 * @date : 2022/9/16 18:19
 */
@RestControllerAdvice
public class GlobalException {

    private final Logger LOGGER = LoggerFactory.getLogger(GlobalException.class);

    /**
     * 自定义异常
     */
    @ExceptionHandler(CustomException.class)
    public Result<String> handleCustomException(CustomException e) {
        return Result.fail(e.getCode(), e.getMsg());
    }

    @ExceptionHandler(JWTException.class)
    public Result<String> handlerJWTException(JWTException e) {
        LOGGER.error("JWT生成、解析Token异常" + e.getMessage(), e);
        return Result.fail(HttpStatus.INTERNAL_SERVER_ERROR.value(), "JWT生成、解析Token异常");
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    public Result<String> handlerNoFoundException(Exception e) {
        LOGGER.error(e.getMessage(), e);
        return Result.fail(HttpStatus.NOT_FOUND.value(), "路径不存在，请检查路径是否正确");
    }

    @ExceptionHandler(AuthenticationException.class)
    public Result<String> handleAuthenticationException(AuthenticationException e) {
        LOGGER.error(e.getMessage(), e);
        return Result.fail(HttpStatus.UNAUTHORIZED.value(), "未经授权，请联系管理员授权");
    }

    @ExceptionHandler(Exception.class)
    public Result<String> handleException(Exception e) {
        LOGGER.error(e.getMessage(), e);
        return Result.fail(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
    }

}
