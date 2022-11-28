package com.zxiaosi.demo6.domain;

import lombok.Data;

import java.io.Serializable;

/**
 * @author : zxiaosi
 * @date : 2022/11/24 16:58
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
