---
title: "cURL 실습"
description: "curl  -k sftp83.46.38.2322CurlPutTesttestfile.xml --user testusertestpassword -o Ctesttestfile.xml --ftp-create-dirscurl  -k sftp"
date: 2022-01-26T12:46:11.678Z
tags: []
---

### 네트워크 확인
```bash
 curl -v telnet://ip:port
```

### JSON POST REQUEST
```bash
curl -d '{argument={question=경영, type=hybridqa}, access_key=000000-000000-000000-000000-000000}' -H 'Content-Type: application/json' http://aiopen.etri.re.kr:8000/WikiQA
```

### SFTP 서버로 접속 및 파일 목록 호출 
```bash
curl -k sftp://ip:port//dirPath/path/ --user "id:pwd"
```

### Upload using curl on SFTP
```bash
curl  -k "sftp://83.46.38.23:22/CurlPutTest/" --user "testuser:testpassword" -T "C:\test\testfile.xml" --ftp-create-dirs
 ```

### Download using curl on SFTP
```bash
curl  -k "sftp://83.46.38.23:22/CurlPutTest/testfile.xml" --user "testuser:testpassword" -o "C:\test\testfile.xml" --ftp-create-dirs

# DIR 구조도 제약 없이 자동 생성
curl  -k "sftp://83.46.38.23:22/CurlPutTest/testfile.xml" --user "testuser:testpassword" -o "C:\test\testfile.xml" --create-dirs
```

### Rename using curl on SFTP
```bash
curl  -k "sftp://83.46.38.23:22/CurlPutTest/" --user "testuser:testpassword" -Q "-RENAME
  ‘/CurlPutTest/testfile.xml’  ‘/CurlPutTest/testfile.xml.tmp’"   --ftp-create-dirs
 ```

### Delete using curl on SFTP
```bash
curl  -k "sftp://83.46.38.23:22/CurlPutTest/ " --user "testuser:testpassword" -Q "–RM /CurlPutTest/testfile.xml" --ftp-create-dirs
 ```

### Make directory using curl on SFTP
```bash
curl  -k "sftp://83.46.38.23:22/CurlPutTest/test " --user "testuser:testpassword" -Q "–MKDIR /CurlPutTest/Test" --ftp-create-dirs
 ```

### Remove directory using curl on SFTP
```bash
curl  -k "sftp://83.46.38.23:22/CurlPutTest/test " --user "testuser:testpassword" -Q "–RMDIR /CurlPutTest/Test" --ftp-create-dirs
```

### 멀티라인 필요시
```bash
# \ - 사용해서 멀티라인 
curl  -k "sftp://ip:port/lookupPath/file.UTF-8" --user "username:pwd" \
-o "C:/downloadPath/file.UTF-8" --ftp-create-dirs
```
멀티라인으로 putty에 넣어서 실행하는 가능하지만 sh파일을 원도우에서 수정해서 올리면 작동 안하는 경우가 있다. 대표적으로
'\r': command not found
그런 경우 gitbash로 열어서 
```bash
# dos에서 unix 포맷으로 바꿔줘야 한다. 
# REPLACE
dos2unix run.sh    

# NEW
dos2unix -n input.txt output.txt
dos2unix --newfile input.txt output.txt

# UNIX TO DOS
unix2dos myfile.txt
```

### 결과
![](/velogimages/5370c3d5-d6ce-4984-9a58-660321ac1638-image.png)

### REF
http://www.mukeshkumar.net/articles/curl/how-to-use-curl-command-line-tool-with-ftp-and-sftp
https://www.cyberciti.biz/faq/howto-unix-linux-convert-dos-newlines-cr-lf-unix-text-format/