---
title: "JPA - 현재 시간으로 빌드자동 날짜 삽입"
description: "entity에서 날짜가 null로 찍혀서 nullpointer 오류 발생현재 시간으로 빌드자동 날짜 삽입수정일출처https&#x3A;m.blog.naver.comPostView.naverisHttpsRedirect=true&blogId=tok0419&logNo"
date: 2022-07-21T07:19:54.550Z
tags: []
---
### 문제
entity에서 날짜가 null로 찍혀서 nullpointer 오류 발생

```java
JoinStep.builder().userId(userId).build();
```
### 해결
현재 시간으로 빌드/자동 날짜 삽입

수정일
```java
    @Setter
    @LastModifiedDate
    @Column(name = "modified_date_time", nullable = false)
    private LocalDateTime modifiedDateTime;
    
    @PrePersist
    protected void prePersist() {
        if (this.modifiedDateTime == null) modifiedDateTime = LocalDateTime.now();
        // if (this.createDateTime == null) createDateTime = LocalDateTime.now();
    }
    }

    @PreUpdate
    protected void preUpdate() {
        this.modifiedDateTime = LocalDateTime.now();
    }

    @PreRemove
    protected void preRemove() {
        this.modifiedDateTime = LocalDateTime.now();
    }
```

### 생성일
```java
@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@EnableJpaAuditing
public abstract class BaseCreatedDateEntity {
    @CreatedDate
    //@Column(nullable = false)
    @Column(name = "create_date_time", nullable = false)
    private LocalDateTime createDateTime;
    
    @PrePersist
    protected void prePersist() {
        if (this.createDateTime == null) createDateTime = LocalDateTime.now();
    }
}
```


출처
- https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=tok0419&logNo=221599220917
- https://stackoverflow.com/questions/49954812/how-can-you-make-a-created-at-column-generate-the-creation-date-time-automatical