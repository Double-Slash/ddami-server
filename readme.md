# 따미-서버

## **진행 현황**

**<u>Model</u>**

<details>
<summary>데이터 모델</summary>
<div markdown="1">

| 테이블   | 컬럼 |
| -------- | ---- |
| 사용자   |      |
| 작품     |      |
| 댓글     |      |
| 카테고리 |      |

<a href = "./src/models/readme.md">자세히 보기</a>

</div>
</details>

- [x] 사용자
- [x] 작품
- [x] 댓글
- [x] 작품샾
- [ ] 재료샾
- [ ] 거래내역
- [ ] 학생

**<u>Controller</u>**

<details>
<summary>기능 </summary>
<div markdown="1">

| 기능                                            | method      | url                                        |
| ----------------------------------------------- | ----------- | ------------------------------------------ |
| 사용자 로그인                                   | POST        | /user/login                                |
| 사용자 회원가입                                 | POST        | /user/join                                 |
| 회원가입시 ID체크                               | POST        | /user/checkId                              |
| 사용자 작품 업로드                              | POST        | /user/upload/piece                         |
| 사용자 상세정보                                 | POST        | /user/detail/:id                           |
| 내 정보                                         | POST        | /user/auth                                 |
| 내 작업실 정보                                  | POST        | /user/myInfo                               |
| 내 작업물 피드                                  | POST        | /user/mypieces                             |
| 미대생 인증                                     | POST        | /user/auth/student                         |
| 작품 댓그 or 대댓그 작성                        | POST        | /user/write/comment/:id                    |
| 다른 사용자 팔로우                              | POST or Get | /user/follow/:id                           |
| ---                                             |
| 작품 좋아요                                     | POST        | /user/like/piece/:id (작품 id)             |
| 검색 기록                                       | POST or GET | /api/search/history                        |
| ---                                             |
| 따미 마을 내가 좋아하는 작품                    | POST        | /user/mylikes                              |
| 따미 마을 내가 찜한 작품                        | POST        | /user/like/products                        |
| 따미 마을 작가 검색                             | POST        | /api/author/search                         |
| 작품 상세보기                                   | POST or GET | /piece/detail/:id                          |
| 따미 샾 작품,재료 좋아요                        | POST or GET | /user/like/product/:id (작품id or 재료 id) |
| 따미 작품 샵 글 작성                            | POST        | /shop/upload/piece                         |
| 따미 재료 샵 글 작성                            | POST        | /shop/upload/material                      |
| 작품샾 상세보기                                 | POST or GET | /shop/detail/product/:id                   |
| 재료샾 상세보기                                 | POST or GET | /shop/detail/material/:id                  |
| 따미 작품 샾 검색(최신순/ 인기순 / 거리순 검색) | POST or GET | /shop/search/product                       |
| 따미 재료 샾 검색(최신순/ 인기순 / 거리순 검색) | POST or GET | /shop/search/material                      |

<a href = "./src/controllers/readme.md">자세히 보기</a>

</div>
</details>

### 사용자 관련 기능

- [x] 로그인
- [x] 회원가입
- [x] 따미마을 게시물 업로드
- [x] 사용자 상세정보
- [ ] 내 정보
- [ ] 댓글 달기
- [ ] 대댓글 달기
- [ ] -------\\\-------
- [ ] 작가 팔로우
- [x] 작품 좋아요
- [ ] 따미샾 글 작성

### 기타

- [x] 검색 (최신, 인기, 조회순)
- [x] 작품 상세정보

## 진행 계획

#### ~7/26

- 회의 전까지 기능 목록 작성
- 기본 기능 구현
