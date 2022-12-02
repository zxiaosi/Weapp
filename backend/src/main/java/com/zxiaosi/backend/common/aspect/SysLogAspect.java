package com.zxiaosi.backend.common.aspect;

import com.alibaba.fastjson2.JSON;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.zxiaosi.backend.common.utils.IpUtils;
import com.zxiaosi.backend.domain.vo.SysLogVo;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.Objects;

/**
 * 日志切片类
 *
 * @author : zxiaosi
 * @date : 2022/12/02 10:11
 */
@Aspect
@Component
public class SysLogAspect {

    private static final Logger LOGGER = LoggerFactory.getLogger(SysLogAspect.class);

    /**
     * 切入点
     */
    @Pointcut("execution(public * com.zxiaosi.backend.controller.*.*(..))")
    public void sysLog() {
    }

    /**
     * 环绕通知 @Around, 当然也可以使用 @Before(前置通知) @After(后置通知)
     */
    @Around("sysLog()")
    public Object doAround(ProceedingJoinPoint point) throws Throwable {
        // 开始时间戳
        long startTime = System.currentTimeMillis();

        // 执行方法
        Object result = point.proceed();

        // 结束时间戳
        long endTime = System.currentTimeMillis();

        // 记录日志
        saveSysLog(point, endTime - startTime);

        return result;
    }

    public void saveSysLog(ProceedingJoinPoint joinPoint, long time) throws JsonProcessingException {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = Objects.requireNonNull(attributes).getRequest();

        SysLogVo sysLogVo = new SysLogVo();
        sysLogVo.setParams(joinPoint.getArgs());
        sysLogVo.setUri(request.getRequestURI());
        sysLogVo.setUrl(request.getRequestURL().toString());
        sysLogVo.setMethod(request.getMethod());
        sysLogVo.setIp(IpUtils.getIpAddress(request));
        sysLogVo.setSpendTime(time);
        sysLogVo.setCreateDate(new Date());

        LOGGER.info("{}", JSON.toJSONString(sysLogVo));
    }
}
