package com.zxiaosi.demo6.common.utils;

import com.alibaba.fastjson2.JSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.*;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

/**
 * Redis工具类
 *
 * @author : zxiaosi
 * @date : 2022/10/24 23:20
 */
@Component
public class RedisUtils {
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private ValueOperations<String, String> valueOperations;

    @Autowired
    private HashOperations<String, String, Object> hashOperations;

    @Autowired
    private ListOperations<String, Object> listOperations;

    @Autowired
    private SetOperations<String, Object> setOperations;

    @Autowired
    private ZSetOperations<String, Object> zSetOperations;

    /**
     * 默认过期时长，单位：秒
     */
    @Value("${config.redis.default-expire}")
    private long defaultExpire;

    /**
     * 不设置过期时长
     */
    @Value("${config.redis.not-expire}")
    private long notExpire;

    /**
     * 设置 key-value: 使用默认过期时间
     */
    public void set(String key, Object value) {
        set(key, value, defaultExpire);
    }

    /**
     * 设置 key-value: 自定义过期时间
     */
    public void set(String key, Object value, long expire) {
        valueOperations.set(key, toJson(value));
        if (expire != notExpire) {
            redisTemplate.expire(key, expire, TimeUnit.SECONDS);
        }
    }

    /**
     * 获取 key-value: 默认不过期
     */
    public String get(String key) {
        return get(key, notExpire);
    }

    /**
     * 获取 key-value: 重新设置过期时间
     */
    public String get(String key, long expire) {
        String value = valueOperations.get(key);
        if (expire != notExpire) {
            redisTemplate.expire(key, expire, TimeUnit.SECONDS);
        }
        return value;
    }

    /**
     * 获取 key-object: 默认不过期
     */
    public <T> T get(String key, Class<T> clazz) {
        return get(key, clazz, notExpire);
    }

    /**
     * 获取 key-object: 重新设置过期时间
     */
    public <T> T get(String key, Class<T> clazz, long expire) {
        String value = valueOperations.get(key);
        if (expire != notExpire) {
            redisTemplate.expire(key, expire, TimeUnit.SECONDS);
        }
        return value == null ? null : fromJson(value, clazz);
    }

    /**
     * 删除键值对
     */
    public void delete(String key) {
        redisTemplate.delete(key);
    }

    /**
     * Object转成JSON数据
     */
    private String toJson(Object object) {
        if (object instanceof Integer || object instanceof Long || object instanceof Float ||
                object instanceof Double || object instanceof Boolean || object instanceof String) {
            return String.valueOf(object);
        }
        return JSON.toJSONString(object);
    }

    /**
     * JSON数据，转成Object
     */
    private <T> T fromJson(String json, Class<T> clazz) {
        return JSON.parseObject(json, clazz);
    }
}
