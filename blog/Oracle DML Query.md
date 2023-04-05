---
title: "Oracle DML Query"
description: "LoginUnlock PrivilegeView Schmea ObjectsShow Table PropertiesSelect Table DataAlias ColumnsOrdered DataOperations on SelectionDates Extraction from Ti"
date: 2021-12-29T00:18:05.991Z
tags: ["oracle","sql"]
---
### try ... catch ...
- sqlplus 접속시 암호에 특수문자가 들어가면 실행오류가 발생할 수 있어 escape처리 해야하는 경우가 있음
- 권한이 없으면 조회하려는 테이블 조회가 안된다. 
- sql 문법 오류

### FREQ USE
-- 2개 항목만 조회
select * from table where rownum <= 2
## 1 연결
- Login
```bash
> sqlplus
SQL*Plus: Release 12.1.0.1.0 Production on Thu Dec 27 07:43:41 2012
 
Copyright (c) 1982, 2012, Oracle.  All rights reserved.
 
Enter user-name: your_user_name
Enter password: your_password
```
- Unlock Privilege
```sql
ALTER USER HR ACCOUNT UNLOCK IDENTIFIED BY password;
User altered.
```
- View Schmea Objects
```sql
SELECT OBJECT_NAME, OBJECT_TYPE FROM USER_OBJECTS
ORDER BY OBJECT_TYPE, OBJECT_NAME;
```
- Show Table Properties
```sql
DESCRIBE EMPLOYEES
```
## 2 테이블 조회
- Select Table Data
```sql
SELECT select_list FROM source_list
```
- Alias Columns
```sql
SELECT FIRST_NAME First, LAST_NAME last, DEPARTMENT_ID DepT
FROM EMPLOYEES;
SELECT FIRST_NAME "Given Name", LAST_NAME "Family Name"
FROM EMPLOYEES;
```
- Ordered Data
```sql
SELECT FIRST_NAME, LAST_NAME, HIRE_DATE
FROM EMPLOYEES
ORDER BY LAST_NAME;
```
- Operations on Selection
```sql
SELECT LAST_NAME,
SALARY "Monthly Pay",
SALARY * 12 "Annual Pay",
ROUND (((SALARY * 12)/365), 2) "Daily Pay",
TRUNC ((SALARY * 12)/365) "Daily Pay",
FIRST_NAME || ' ' || LAST_NAME "Name",
UPPER(LAST_NAME) "Last",
INITCAP(FIRST_NAME) "First",
LOWER(EMAIL) "E-Mail"
```
- Dates Extraction from Timestamp
```sql
SELECT EXTRACT(HOUR FROM SYSTIMESTAMP) || ':' ||
EXTRACT(MINUTE FROM SYSTIMESTAMP) || ':' ||
ROUND(EXTRACT(SECOND FROM SYSTIMESTAMP), 0) || ', ' ||
EXTRACT(MONTH FROM SYSTIMESTAMP) || '/' ||
EXTRACT(DAY FROM SYSTIMESTAMP) || '/' ||
EXTRACT(YEAR FROM SYSTIMESTAMP) "System Time and Date"
FROM DUAL;
```
- Date Conversion
```sql
SELECT LAST_NAME,
TO_CHAR(HIRE_DATE, 'FMMonth DD YYYY') "Date Started"
TO_NUMBER(POSTAL_CODE) + 1 "New Code" -- Char To Number
```
- Convert NULL with String
```sql
SELECT LAST_NAME,
NVL(TO_CHAR(COMMISSION_PCT), 'Not Applicable') "COMMISSION"
FROM EMPLOYEES
WHERE LAST_NAME LIKE 'B%'
ORDER BY LAST_NAME; 
```
- Set different expression for NULL and not NULL values
```sql
SELECT LAST_NAME, SALARY,
NVL2(COMMISSION_PCT, SALARY + (SALARY * COMMISSION_PCT), SALARY) INCOME
FROM EMPLOYEES WHERE LAST_NAME LIKE 'B%'
ORDER BY LAST_NAME;
```
## 3 태이블 조회 (조건 포함)
- Select Conditional Data
```sql
SELECT FIRST_NAME, LAST_NAME, SALARY, COMMISSION_PCT "%"
FROM EMPLOYEES
WHERE DEPARTMENT_ID IN (100, 110, 120);
WHERE LAST_NAME LIKE '%ma%';
WHERE DEPARTMENT_ID = 90;
WHERE (SALARY >= 11000) AND (COMMISSION_PCT IS NOT NULL);
```
- Use Simple Case
```sql
SELECT UNIQUE COUNTRY_ID ID,
       CASE COUNTRY_ID
         WHEN 'AU' THEN 'Australia'
         WHEN 'BR' THEN 'Brazil'
       ELSE 'Unknown'
       END COUNTRY
FROM LOCATIONS
ORDER BY COUNTRY_ID;
```
- Use IF Case
```sql
SELECT LAST_NAME "Name",
HIRE_DATE "Started",
SALARY "Salary",
CASE
  WHEN HIRE_DATE < TO_DATE('01-Jan-03', 'dd-mon-yy')
    THEN TRUNC(SALARY*1.15, 0)
  ELSE SALARY
END "Proposed Salary"
FROM EMPLOYEES
WHERE DEPARTMENT_ID = 100
ORDER BY HIRE_DATE;
```
- Value Searching
```sql
SELECT LAST_NAME, JOB_ID, SALARY,
DECODE(JOB_ID,
  'PU_CLERK', SALARY * 1.10,
  'SH_CLERK', SALARY * 1.15,
  'ST_CLERK', SALARY * 1.20,
  SALARY) "Proposed Salary"
FROM EMPLOYEES
WHERE JOB_ID LIKE '%_CLERK'
AND LAST_NAME < 'E'
ORDER BY LAST_NAME;
```
## 4 테이블 다중 조회
- Multi Table 
```sql
SELECT e.FIRST_NAME "First",
e.LAST_NAME "Last",
d.DEPARTMENT_NAME "Dept. Name"
FROM EMPLOYEES e, DEPARTMENTS d
WHERE e.DEPARTMENT_ID = d.DEPARTMENT_ID
ORDER BY d.DEPARTMENT_NAME, e.LAST_NAME;
```
- Count Rows in Each Group
```sql
SELECT MANAGER_ID "Manager",
COUNT(*) "Number of Reports"
FROM EMPLOYEES
GROUP BY MANAGER_ID
ORDER BY MANAGER_ID;
```
- Add Conditional to aggregate rows
```sql
SELECT DEPARTMENT_ID "Department",
SUM(SALARY*12) "All Salaries"
FROM EMPLOYEES
HAVING SUM(SALARY * 12) >= 1000000
GROUP BY DEPARTMENT_ID;
```
- Statistical Info. Usage on aggregate
```sql
SELECT JOB_ID,
COUNT(*) "#",
MIN(SALARY) "Minimum",
ROUND(AVG(SALARY), 0) "Average",
MEDIAN(SALARY) "Median",
MAX(SALARY) "Maximum",
ROUND(STDDEV(SALARY)) "Std Dev"
FROM EMPLOYEES
GROUP BY JOB_ID
ORDER BY JOB_ID;
```

### 스트링에 조건 값 담아서 한번에 조회
```sql
 SELECT * FROM SCHEMA.table list 
		  WHERE list.name IN 
				(Select regexp_substr(:s_id,'[^,]+', 1,level)
				From dual
				Connect by regexp_substr(:s_id,'[^,]+', 1, level) is not null);
```