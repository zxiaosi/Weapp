package com.zxiaosi.backend.common.utils;

import com.zxiaosi.backend.common.constants.ResponseConstants;
import lombok.Data;

import java.io.Serializable;

/**
 * 返回结果工具类
 *
 * @author : zxiaosi
 * @date : 2022/12/02 10:11
 */
@Data
public class Result<T> implements Serializable {
    /**
     * 状态码
     */
    private int code;

    /**
     * 描述
     */
    private String msg;

    /**
     * 数据体
     */
    private T data;

    /**
     * 数据总条数
     */
    private long total;

    private Result() {

    }

    public Result(int code, String msg, T data, long total) {
        this.code = code;
        this.msg = msg;
        this.data = data;
        this.total = total;
    }

    public static <T> Result<T> success() {
        return new Result<>(ResponseConstants.SUCCESS_CODE, ResponseConstants.SUCCESS_MESSAGE, null, 0L);
    }

    public static <T> Result<T> success(T data) {
        return new Result<>(ResponseConstants.SUCCESS_CODE, ResponseConstants.SUCCESS_MESSAGE, data, 0L);
    }

    public static <T> Result<T> success(String msg, T data) {
        return new Result<>(ResponseConstants.SUCCESS_CODE, msg, data, 0L);
    }

    public static <T> Result<T> success(T data, long total) {
        return new Result<>(ResponseConstants.SUCCESS_CODE, ResponseConstants.SUCCESS_MESSAGE, data, total);
    }

    public static <T> Result<T> success(String msg, T data, long total) {
        return new Result<>(ResponseConstants.SUCCESS_CODE, msg, data, total);
    }

    public static <T> Result<T> fail() {
        return new Result<>(ResponseConstants.FAIL_CODE, ResponseConstants.FAIL_MESSAGE, null, 0L);
    }

    public static <T> Result<T> fail(String msg) {
        return new Result<>(ResponseConstants.FAIL_CODE, msg, null, 0L);
    }

    public static <T> Result<T> fail(int code, String msg) {
        return new Result<>(code, msg, null, 0L);
    }

}
