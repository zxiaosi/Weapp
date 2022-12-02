package com.zxiaosi.backend.controller;

import com.zxiaosi.backend.common.utils.Result;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author : zxiaosi
 * @date : 2022/12/02 10:11
 */
@RestController
@RequestMapping("/")
public class HelloWorld {

    @GetMapping("/")
    public Result<String> hello() {
        return Result.success("Hello World");
    }

}
