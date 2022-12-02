package com.zxiaosi.backend.domain;

import lombok.Data;

import java.io.Serializable;

/**
 * 微信用户实体类
 *
 * @author : zxiaosi
 * @date : 2022/12/02 10:11
 */
@Data
public class WxUser implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 用户昵称
     */
    private String nickName;

    /**
     * 性别
     */
    private Short gender;

    /**
     * 语言
     */
    private String language;

    /**
     * 城市
     */
    private String city;

    /**
     * 省份
     */
    private String province;

    /**
     * 国家
     */
    private String country;

    /**
     * 头像
     */
    private String avatarUrl;
}
