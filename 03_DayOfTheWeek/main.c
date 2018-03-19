//
//  main.c
//  DayOfTheWeek
//
//  Created by Mathis Boultoureau on 07/03/2018.
//  Copyright © 2018 Mathis Boultoureau. All rights reserved.
//

#include <stdio.h>

int main(int argc, const char * argv[]) {
    int day = 0, month = 0, year = 0, numberDays = 0, leapYear = 0;
    printf("Enter a date (MM/DD/YYYY) : ");
    scanf("%d/%d/%d", &month, &day, &year);
    
    numberDays += 365 * (year - 1);
    if(year > 1582){
        numberDays += (year - 1) / 4;
        numberDays -= (year - 1) / 100;
        numberDays += (year - 1) / 400;
        numberDays += 2;
    } else {
        numberDays += (year - 1) / 4;
    }
    
    if(year > 1582 && ((year % 4 == 0 && (year % 100 != 0 || year % 400 == 0))))
    {
        leapYear = 1;
    } else if(year <= 1582 && year % 4 == 0) {
        leapYear = 1;
    }
    
    numberDays += (month - 1) * 31;
    switch (month) {
        case 12:
            numberDays--;
        case 11:
        case 10:
            numberDays--;
        case 9:
        case 8:
        case 7:
            numberDays--;
        case 6:
        case 5:
            numberDays--;
        case 4:
        case 3:
            if(leapYear == 1)
            {
                numberDays -= 2;
            } else {
                numberDays -= 3;
            }
            break;
    }
    
    numberDays += day;
    
    switch (numberDays % 7) {
        case 1:
            printf("It's a Saturday!\n");
            break;
            
        case 2:
            printf("It's a Sunday!\n");
            break;
            
        case 3:
            printf("It's a Monday!\n");
            break;
            
        case 4:
            printf("It's a Tuesday!\n");
            break;
            
        case 5:
            printf("It's a Wednesday!\n");
            break;
            
        case 6:
            printf("It's a Thursday!\n");
            break;
            
        case 0:
            printf("It's a Friday!\n");
            break;
    }
    
    printf("%d days have elapsed since January 1, 0001.\n\n", numberDays);
    return 0;
}
