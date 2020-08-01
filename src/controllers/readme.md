# Controller

## 사용자 로그인

1. 일반 로그인

|        |                                                                                                                                    |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| method | POST                                                                                                                               |
| url    | /user/login                                                                                                                        |
| Header | x-access-token                                                                                                                     |
| Body   | ex) <span style="color:gray">{"userEmail":"wonseok5893@naver.com","userPassword":"12345678", (android) "deviceToken":"---"}</span> |
| Return |                                                                                                                                    |

    {"result": 0, //성공시 1 실패시 0
    "message": "wonseok5893@naver.com로 로그인 성공", // 성공,실패 메시지
    "token": "?"}

2. 소셜 로그인

## 사용자 회원가입

|        |                                                                                                                                                                                                                                                 |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| method | POST                                                                                                                                                                                                                                            |
| url    | /user/join                                                                                                                                                                                                                                      |
| Header |                                                                                                                                                                                                                                                 |
| Body   | ex) <span style="color:gray">{"userName":"최원석","userEmail":"wonseok5893@naver.com","userNickname":"1서기", "userPassword":"12345678","userSex":"male","userBirth":"1995-10-27","userPhone":"01041105893","likeField":["공예","예술"]}</span> |
| Return |                                                                                                                                                                                                                                                 |

    {"result": 0, // 성공시 1, 실패시 0
    "message": "DB 오류" // 성공,실패 메시지}

## 사용자 게시물 업로드

|        |                                                                              |
| ------ | ---------------------------------------------------------------------------- |
| method | POST                                                                         |
| url    | /user/upload/piece                                                           |
| Header | x-access-token                                                               |
| files  | 개수 <=3 name = "img"                                                        |
| Body   | ex) <span style="color:gray">{"title":"DDAMI","description":"Hello!"}</span> |
| Return |                                                                              |

    {"result": 0, // 성공시 1, 실패시 0
    "message": "DB 오류" // 성공,실패 메시지}

## 사용자 상세보기

|        |                  |
| ------ | ---------------- |
| method | POST             |
| url    | /user/detail/:id |
| Header |                  |
| Body   |                  |
| Return |                  |

    {
    "result": 0,
    "user": {
        "likeField": [
            "예술",
            "공예"
        ],
        "follow": 0,
        "follower": 0,
        "state": false,
        "myPieces": [
            {
                "fileUrl": [
                    "http://222.251.129.150/uploads/1596261376952.jpg",
                    "http://222.251.129.150/uploads/1596261377303.jpg"
                ],
                "views": 0,
                "like": 0,
                "_id": "5f250401792bc7076439f361",
                "title": "test sample13",
                "description": "this is a sample."
            },
            {
                "fileUrl": [
                    "http://222.251.129.150/uploads/1596261364535.jpg",
                    "http://222.251.129.150/uploads/1596261364895.jpg"
                ],
                "views": 0,
                "like": 0,
                "_id": "5f2503f5792bc7076439f360",
                "title": "test sample13",
                "description": "this is a sample."
            }
        ],
        "_id": "5f250217792bc7076439f352",
        "userNickname": "test"
    }
}

## 검색

1. 최신순 검색 (Default) / 인기순 검색 / 조회수 순 검색

|             |                                                                                                                           |
| ----------- | ------------------------------------------------------------------------------------------------------------------------- |
| method      | POST or GET                                                                                                               |
| url         | /api/search                                                                                                               |
| Header      |                                                                                                                           |
| Body(Query) | ex) <span style="color:gray">{"sortingBy":"L","field":["예술","공예"],"list":0, "count" = 2,"searchingBy":"test" }</span> |
| Return      |                                                                                                                           |

    {
    "result": 1,
    "pieces": [
        {
            "fileUrl": [],
            "views": 0,
            "like": 0,
            "_id": "5f22950cdefcd61bdc9643c3",
            "title": "Test",
            "description": "test",
            "author": {
                "_id": "5f2293a1defcd61bdc9643c1",
                "userNickname": "1서기"
            }
        },
        {
            "fileUrl": [],
            "views": 0,
            "like": 0,
            "_id": "5f2294f6defcd61bdc9643c2",
            "title": "wonseok123",
            "description": "test",
            "author": {
                "_id": "5f2293a1defcd61bdc9643c1",
                "userNickname": "1서기"
            }
        }
    ]
    }

<center>옵션[options]</center>

searchingBy

- 검색어

sortingBy

- Default 최신순 -> 파라미터 없어도 되고 명시하고 싶으면 "D"
- "L" 인기순(좋아요 순)
- "V" 조회순

field

- Default 전체 -> 파라미터 없으면 전체
- [ 배열(String) ] 배열 요소중 한개라도 관련 있는 작품

count

- Default count=30 -> 파라미터 없으면 30개
- 출력 시킬 데이터(작품) 개수

list

- Default list =0 -> 파라미터 없으면 0부터 출력
- list:0 count:10 -> 0~9까지 출력
- list:1 count:10 -> 10~19까지 출력
