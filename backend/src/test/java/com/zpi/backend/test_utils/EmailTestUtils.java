package com.zpi.backend.test_utils;

import org.thymeleaf.context.Context;

public class EmailTestUtils {
    public static Context createContext() {
        Context context = new Context();
        context.setVariable("pl_title", "pl_title");
        return context;
    }
}
