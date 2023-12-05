package com.zpi.backend.test_utils;

import com.zpi.backend.email_type.EmailType;

public class EmailTypeTestUtils {
    public static EmailType createEmailType(String name) {
        EmailType emailType = new EmailType();
        emailType.setType(name);
        return emailType;
    }
}
