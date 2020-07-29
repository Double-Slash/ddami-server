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

**<u>Controller</u>**

<details>
<summary>기능 </summary>
<div markdown="1">

| 기능               | method | url                |
| ------------------ | ------ | ------------------ |
| 사용자 로그인      | POST   | /user/login        |
| 사용자 회원가입    | POST   | /user/join         |
| 사용자 작품 업로드 | POST   | /user/upload/piece |
| 작품 검색          | Get    | /api/search        |

<a href = "./src/controllers/readme.md">자세히 보기</a>

</div>
</details>

### 사용자 관련 기능

- [x] 로그인
- [x] 회원가입
- [ ] 게시물 업로드

### 기타

- [ ] 검색

## 진행 계획

#### ~7/26

- 회의 전까지 기능 목록 작성
- 기본 기능 구현
