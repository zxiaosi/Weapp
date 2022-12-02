package com.zxiaosi.backend.domain.vo;

import lombok.Data;

/**
 * 加密视图类
 *
 * @author : zxiaosi
 * @date : 2022/12/02 10:11
 */
@Data
public class EncryptedDataVo {

    /**
     * 敏感数据对应的云 ID，开通云开发的小程序才会返回，可通过云调用直接获取开放数据，详细见
     * <a href="https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/signature.html#method-cloud">
     * 云调用直接获取开放数据
     * </a>
     */
    private String cloudID;

    /**
     * 换取手机号的动态令牌【与换取OpenId的code不一样】
     */
    private String code;

    /**
     * 包括敏感数据在内的完整用户信息的加密数据，详细见
     * <a href="https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/signature.html#%E5%8A%A0%E5%AF%86%E6%95%B0%E6%8D%AE%E8%A7%A3%E5%AF%86%E7%AE%97%E6%B3%95">
     * 加密数据解密算法
     * </a>
     */
    private String encryptedData;

    /**
     * 加密算法的初始向量，详细见
     * <a href="https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/signature.html#%E5%8A%A0%E5%AF%86%E6%95%B0%E6%8D%AE%E8%A7%A3%E5%AF%86%E7%AE%97%E6%B3%95">
     * 加密数据解密算法
     * </a>
     */
    private String iv;
}
