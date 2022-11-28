package com.zxiaosi.backend.domain.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

/**
 * 日志视图类
 *
 * @author : zxiaosi
 * @date : 2022/11/27 23:57
 */
@Data
public class SysLogVo {
    private static final long serialVersionUID = 1L;

    /**
     * URI
     */
    private String uri;

    /**
     * URL
     */
    private String url;


    /**
     * 请求类型
     */
    private String method;

    /**
     * 请求参数
     */
    private Object params;

    /**
     * IP地址
     */
    private String ip;

    /**
     * 消耗时间
     */
    private Long spendTime;

    /**
     * 创建时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date createDate;
}
