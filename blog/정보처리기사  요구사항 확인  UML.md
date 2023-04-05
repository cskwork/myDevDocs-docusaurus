---
title: "정보처리기사  요구사항 확인  UML"
description: "s  UML이 뭐야h  Unifed Modeling Lanaguage의 약어이고 영어 표현 그대로 일종의 모델링 언어야. 시스템 분석, 설계부터 개발 과정에서 시스템 개발자하고 고객다른 개발자 하고 구현할 모델에 대한 직관적이고 원활한 의사소통을 위해 객체지향 모"
date: 2021-05-27T05:14:03.981Z
tags: ["정보처리기사"]
---
## UML
- Unifed Modeling Lanaguage
- 고객/개발자 사이의 **요구사항**을 시각화 (**분석** -> 설계 -> 개발)
- **사물 사이의 관계** 표현

## 사물
- 종류 : 구조, 행동, 그룹, 주해 
- 구조 : 시스템을 물리적으로 표현. 예) 클래스, 유스케이스, 컴포넌트.
- 행동 : 시간과 공간에 따른 요소의 행위를 표현. 예) 상호작용 상태머신.
- 그룹 : 요소를 그룹으로 묶음. 예) 패키지
- 주해 : 추가 설명 제약 조건. 

## 관계
- 종류 : 연관, 집합, 포함, 일반화, 의존 실체화 관계.
![](/velogimages/f8ca6f28-b9f2-4ce3-8036-132bf97a0991-image.png)

- 일반화 : A 사물이 B 사물에 비해 더 일반적인지 구체적인지 구분 
![](/velogimages/48cd8b17-02df-4ccd-bec5-fb5ef0473bc8-image.png)

- 실제화 : A 사물과 B 사물 사이에 기능으로 서로 그룹화 할 수 있는 관계 
![](/velogimages/c1217ad7-b331-463c-88c3-4fca6550424f-image.png)

- 의존 : A 사물과 B 사물 사이가 연관은 있지만 짧은 시간 동안만 그 관계를 유지. 소유 관계 X.
![](/velogimages/b2f0fbb2-28ce-47f3-a802-3fdb898b7d36-image.png)

- 연관 : 2개 이상 서로 관련
![](/velogimages/d0bec1f5-fe1e-4c54-ab6a-00a311a5cd00-image.png)
![](/velogimages/16470d22-eca8-44ea-b451-ec3e486eb80b-image.png)

- 집합 : A 사물이 B사물에 포함됨.
![](/velogimages/21d1c0a6-2498-4e57-95f8-2b8ce6b853b9-image.png)

- 포함 : A 사물이 B사물에 포함되고 해당 사물에 영향을 미침.
![](/velogimages/fbff408e-1249-4d8f-be08-976d0d59374b-image.png)

# 다이어그램
사물과 관계를 도형으로 표현. 시스템 뷰를 제공하여 의사소통에 도움을 줌. 
![](/velogimages/640f92a2-0208-4291-8c59-213a058e656a-image.png)

## 구조적 다이어그램 (정적)
### 클래스 다이어그램 : 
- 클래스 사이의 속성 관계 표현.

![](/velogimages/973fecf7-7cf6-4667-8d0b-2b31ebf64721-image.png)

### 객체 다이어그램 : 
- 객체 사이의 관계

![](/velogimages/3bff2481-5a59-4db0-8fc7-c41fb16c25be-image.png)


### 컴포넌트 다이어그램 : 
컴포넌트 : 시스템 컴포넌트 

- 시스템 기능 정의

![](/velogimages/4be1673d-48af-4ca8-adf8-3816faf45a02-image.png)

### 패키지 다이어그램
패키지 : 시스템 내부 기능에 대한 분류 

- 다이어그램의 요소를 조직화하여 패키지형태로 나타냄

![](/velogimages/1beb4283-edf4-4003-958c-0791c08406d3-image.png)

### 배포 다이어그램
배포 : 물리적인 연결

- 컴퓨터를 기반으로 하는 시스템의 물리적 구조

![](/velogimages/82331de5-481c-469b-b5a2-3d5f6115ed3f-image.png)

### 복합체 구조 다이어그램
- 클래스 모델을 만들 때 각 컴포넌트 클래스를 전체 클래스 안에 위치시켜 클래스 내부 구조 표현

![](/velogimages/a2aac79f-598d-4203-a2d5-abd7684bbf0e-image.png)

## 행위 다이어그램 (동적)
### 유즈케이스 다이어그램 : 
- 사용자 요구 분석하고 기능 모델링 작업에 사용

### 활동 다이어그램 : 
- 객체의 처리 로직과 조건에 따른 순차적인 처리 흐름을 표현을 하여 시스템 기능 수행 파악.

![](/velogimages/ba1e05f8-fed3-4a9d-bb46-3f95249c39f0-image.png)

### 통신 다이어그램
- 하나의 시스템을 구성하는 요소들은 다른 요소들과 손발을 맞추면서 시스템 전체의 목적을 이루어 나가는 것을 표현

![](/velogimages/11bde9f6-44bb-4c4f-80c8-bc9b5f48d38e-image.png)

### 시퀀스 다이어그램
- 객체끼리 주고받는 메시지의 순서를 시간의 흐름에 따라 보여줌

### 상태 다이어그램
상태 : 객체 상태 
다이어그램 : 시각적으로 상태를 표현

- 시간에 따라서 객체가 변하는 상태

![](/velogimages/448b5473-a638-4bf7-8203-d13352faf768-image.png)

![](/velogimages/1374c554-6a59-42ba-a8cb-c1f959746d4d-image.png)

### 유즈 케이스 다이어그램
유즈 : 사용자의 행위 

- 사용자의 입장에서 본 시스템의 행동

![](/velogimages/2e349928-79da-4a00-85d1-921dcf8fab4e-image.png)

# 출처
https://m.blog.naver.com/PostView.naver?blogId=hermet&logNo=220120846602&proxyReferer=http:%2F%2F222.120.192.204%2F

https://www.google.com/url?sa=i&url=https%3A%2F%2Flipcoder.tistory.com%2Fentry%2F1-1-9%25EC%259E%25A5-UMLUnified-Modeling-Language&psig=AOvVaw1eXz3_PNisbBSKS7jpko2t&ust=1622629922200000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKDD8NKd9vACFQAAAAAdAAAAABAX

https://www.nextree.co.kr/p6753/

https://myeonguni.tistory.com/752 [명우니닷컴]