---
title: "DoorayAPI-messenger-send-text"
description: "================================================================https&#x3A;helpdesk.dooray.comsharepages9wWo-xwiR66BO5LGshgVTg293998764763138441"
date: 2022-06-07T05:48:36.086Z
tags: []
---
API 문서
https://helpdesk.dooray.com/share/pages/9wWo-xwiR66BO5LGshgVTg/2939987647631384419


### 1 인증 토큰 생성
![](/velogimages/caf0cd76-11ec-4dbb-9234-5626cbb61fe3-image.png)

### 2 인증 토큰으로 CURL 호출
```bash
# 프로젝트 조회
curl -H 'Authorization: dooray-api {인증토큰}' https://api.dooray.com/project/v1/projects/3183341111111110182

# 이메일로 ID 검색 
curl -H 'Authorization: dooray-api {인증토큰}' -H 'Content-Type: application/json' https://api.dooray.com/common/v1/members?externalEmailAddresses=email@company.com&page=0&size=20

# 사용자 ID로 검색
 curl -H 'Authorization: dooray-api {인증토큰}' -H 'Content-Type: application/json' https://api.dooray.com/common/v1/members?userCode=사용자ID

# 대화방 목록 조회
curl -H 'Authorization: dooray-api {인증토큰}' -H 'Content-Type: application/json'
https://api.dooray.com/messenger/v1/channels
```

### 3 인증 토큰 CURL 검색으로 찾은 ID를 메시지 발송 API에 추가
```bash
# 메시지 발송 
curl -H 'Authorization: dooray-api {인증토큰}' -X POST -H 'Content-Type: application/json' -d '{"text":"hello world","organizationMemberId":"3051342344554254793"}' https://api.dooray.com/messenger/v1/channels/direct-send

# 채널에 발송
curl -H 'Authorization: dooray-api {인증토큰}' -X POST -H 'Content-Type: application/json' -d '{"text":"hello world"}' https://api.dooray.com/messenger/v1/channels/319011111164957344/logs

# 한글 메시지 발송
# 한글은 Unicode escape로만 가능, header utf-8은 작동안함
# https://dencode.com/string/unicode-escape

curl -H 'Authorization: dooray-api {인증토큰}' -X POST -H 'Content-Type: application/json' -d '{"text":"\u005B\uC790\uB3D9\uBC1C\uC1A1\u005D\u0020\uC8FC\uAC04\uBCF4\uACE0\u0020\u0031\u0030\uC2DC\uAE4C\uC9C0\u0020\uCD5C\uC2E0\uD654\u0020\uBD80\uD0C1\uB4DC\uB824\uC694\u0021"}' https://api.dooray.com/messenger/v1/channels/{projectId}/logs
```

### 4 원도우 작업 스케줄러
![](/velogimages/599f07f5-de13-465b-8570-b1dd5a3933f1-image.png)

![](/velogimages/ef698752-30e5-493b-9cdd-8db8b1e53621-image.png)
