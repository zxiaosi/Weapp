package com.zxiaosi.backend.controller;

import com.zxiaosi.backend.common.utils.Result;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author : zxiaosi
 * @date : 2022/11/24 17:25
 */
@RestController
@RequestMapping("/")
public class HelloWorld {

    @GetMapping("/")
    public Result<String> hello() {
        return Result.success("Hello World");
    }

}
