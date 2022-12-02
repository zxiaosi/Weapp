package com.zxiaosi.backend.common.holder;

import com.zxiaosi.backend.domain.User;
import org.springframework.stereotype.Component;

/**
 * 用户本地线程池
 *
 * @author : zxiaosi
 * @date : 2022/12/02 10:11
 */
@Component
public class CurrentLoginUserHolder {

    /**
     * 用户线程本地
     */
    private final ThreadLocal<User> userThreadLocal = new ThreadLocal<>();

    /**
     * 设置用户
     *
     * @param user 本地线程用户类
     */
    public void setUser(User user) {
        userThreadLocal.set(user);
    }

    /**
     * 获取用户
     *
     * @return {@link User}
     */
    public User getUser() {
        return userThreadLocal.get();
    }

    /**
     * 删除用户
     */
    public void removeUser() {
        userThreadLocal.remove();
    }

}
