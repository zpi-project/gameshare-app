package com.zpi.backend.utils;

import java.util.Calendar;
import java.util.Date;

public class DateUtils {

    public static int getYear(Date date){
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        return calendar.get(Calendar.YEAR);
    }
    public static int getMonth(Date date){
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        return calendar.get(Calendar.MONTH)+1;
    }


    public static int getDuration(Date date1, Date date2){
        return (int) ((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24))+1;
    }
}
