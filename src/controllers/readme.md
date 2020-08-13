# Controller

## 사용자 로그인

1. 일반 로그인

|        |                                                                              |
| ------ | ---------------------------------------------------------------------------- |
| method | POST                                                                         |
| url    | /user/login                                                                  |
| Header | x-access-token                                                               |
| Body   | ex) <span style="color:gray">{"userId":"ddami","userPassword":"1234"}</span> |
| Return |                                                                              |

    {"result": 0, //성공시 1 실패시 0
    "message": "ddami로 로그인 성공", // 성공,실패 메시지
    "token": "?"}

1. 소셜 로그인

## 사용자 회원가입

|        |                                                                                                                                                                                                  |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| method | POST                                                                                                                                                                                             |
| url    | /user/join                                                                                                                                                                                       |
| Header |                                                                                                                                                                                                  |
| Body   | ex) <span style="color:gray">{"userId":"test","userPassword":"1234", "userName":"최원석","userSex":"male","userBirth":"1995-10-27","userPhone":"01041105893","likeField":["공예","예술"]}</span> |
| Return |                                                                                                                                                                                                  |

    {"result": 0, // 성공시 1, 실패시 0
    "message": "DB 오류" // 성공,실패 메시지}

### 회원가입 ID check

|        |                                                       |
| ------ | ----------------------------------------------------- |
| method | POST                                                  |
| url    | /user/checkId                                         |
| Header |                                                       |
| Body   | ex) <span style="color:gray">{"userId":"test"}</span> |
| Return |                                                       |

    {"result": 0, // 성공시 1, 실패시 0
    "message": "이미 존재하는 ID입니다." // 성공,실패 메시지}

## 따미마을 게시물 업로드

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

## 사용자 상세보기 (다른 사용자 작업실)

|             |                  |
| ----------- | ---------------- |
| method      | POST or GET      |
| url         | /user/detail/:id |
| Header      |                  |
| Body(Query) |                  |
| Return      |                  |

    {
    "result": 0,
    "user": {
        "likeField": [
            "공예",
            "예술"
        ],
        "follow": 0,
        "follower": 0,
        "state": false,
        "myPieces": [
            {
                "fileUrl": [
                    "http://222.251.129.150/uploads/1597128245912.jpg"
                ],
                "views": 0,
                "like": [],
                "likeCount": 0,
                "_id": "5f323e36085ba51d50ff5b3c",
                "title": "sss",
                "description": "sssss"
            },
            {
                "fileUrl": [
                    "http://222.251.129.150/uploads/1597128174782.jpg"
                ],
                "views": 0,
                "like": [],
                "likeCount": 0,
                "_id": "5f323dee085ba51d50ff5b3b",
                "title": "ddd",
                "description": "ddddd"
            },
            {
                "fileUrl": [
                    "http://222.251.129.150/uploads/1597061667017.jpg",
                    "http://222.251.129.150/uploads/1597061667368.jpg"
                ],
                "views": 4,
                "like": [],
                "likeCount": 0,
                "_id": "5f313a23cb0e0f42d0a02b9c",
                "title": "sample4",
                "description": "this is a sample."
            }
        ],
        "imageUrl": "",
        "stateMessage": "안녕하세요 만나서 반가워요",
        "_id": "5f3139a8cb0e0f42d0a02b9a",
        "userId": "test",
        "userName": "최원석"
    }
    }

## 내 정보

|        |                |
| ------ | -------------- |
| method | POST           |
| url    | /user/auth     |
| Header | x-access-token |
| Body   | (anroid) token |
| Return |                |

    {
    "result": 1,
    "myInfo": {
        "state": true,
        "imageUrl": "http://222.251.129.150/uploads/default.jpg",
        "_id": "5f3139a8cb0e0f42d0a02b9a",
        "userName": "최원석",
        "student": {
            "_id": "5f34f2f999fef948e0f8b10b",
            "university": "연세대학교",
            "department": "융합보안학과"
        }
    }
    }

## 내 작업실 정보

|        |                |
| ------ | -------------- |
| method | POST           |
| url    | /user/myInfo   |
| Header | x-access-token |
| Body   | (anroid) token |
| Return |                |

    {
    "result": 1,
    "myInfo": {
        "likeField": [],
        "follow": 0,
        "followerCount": 0,
        "myPieces": [
            {
                "fileUrl": [
                    "http://222.251.129.150/uploads/1597061667017.jpg",
                    "http://222.251.129.150/uploads/1597061667368.jpg"
                ],
                "_id": "5f313a23cb0e0f42d0a02b9c"
            }
        ],
        "_id": "5f3139a8cb0e0f42d0a02b9a",
        "userId": "test",
        "userName": "최원석",
        "student": {
            "_id": "5f34f2f999fef948e0f8b10b",
            "university": "연세대학교",
            "department": "융합보안학과"
        }
    }
    }

## 내 작업실 피드

|        |                |
| ------ | -------------- |
| method | POST           |
| url    | /user/mypieces |
| Header | x-access-token |
| Body   | (anroid) token |
| Return |                |

    {
    "result": 1,
    "mypieces": [
        {
            "fileUrl": [
                "http://222.251.129.150/uploads/1597061667017.jpg",
                "http://222.251.129.150/uploads/1597061667368.jpg"
            ],
            "state": 1,
            "_id": "5f313a23cb0e0f42d0a02b9c"
        },
        {
            "fileUrl": [
                "http://222.251.129.150/uploads/1597128174782.jpg"
            ],
            "state": 1,
            "_id": "5f323dee085ba51d50ff5b3b"
        }
    ]
}

## 미대생 인증 업로드 (관리자x -> 업로드시 인증 되는 것으로 진행)

|        |                                                                                                   |
| ------ | ------------------------------------------------------------------------------------------------- |
| method | POST                                                                                              |
| url    | /user/auth/student                                                                                |
| Header | x-access-token                                                                                    |
| Body   | {"university":"연세대학교","department":"경영학과","number":20151232,"likeField":["몰라","몰라"]} |
| Return |                                                                                                   |

    {
    "result": 1,
    "message": "미대생 인증 되었습니다."
    }

### 작품 댓글 or 대댓글 작성

|        |                                                           |
| ------ | --------------------------------------------------------- |
| method | POST                                                      |
| url    | /user/write/comment/:id   (작품 id, 댓글 id)              |
| Header |                                                           |
| Body   | ex) <span style="color:gray">{"content":"첫 댓글"}</span> |
| Return |                                                           |

    {
    "result": 1,
    "message": "대댓글 작성 완료"
    }

## 다른 사용자 팔로우

|             |                              |
| ----------- | ---------------------------- |
| method      | POST or GET                  |
| url         | /user/follow/:id (사용자 id) |
| Header      | x-access token               |
| Body(Query) |                              |
| Return      |                              |

    {
    "result": 1,
    "message": "팔로우 성공"
    }

## 따미 마을 작품 검색

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
            "fileUrl": [
                "http://222.251.129.150/uploads/1597129429729.jpg",
                "http://222.251.129.150/uploads/1597129429865.jpg"
            ],
            "views": 21,
            "like": [],
            "likeCount": 0,
            "_id": "5f3242d6eaf0a645c0d38b64",
            "title": "sample12212",
            "description": "this is a sample.",
            "author": {
                "imageUrl": "",
                "_id": "5f32426aeaf0a645c0d38b60",
                "userId": "ddami"
            },
            "likeByMe": false
        },
        {
            "fileUrl": [
                "http://222.251.129.150/uploads/1597061667017.jpg",
                "http://222.251.129.150/uploads/1597061667368.jpg"
            ],
            "views": 4,
            "like": [],
            "likeCount": 0,
            "_id": "5f313a23cb0e0f42d0a02b9c",
            "title": "sample4",
            "description": "this is a sample.",
            "author": {
                "imageUrl": "",
                "_id": "5f3139a8cb0e0f42d0a02b9a",
                "userId": "test"
            },
            "likeByMe": false
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

## 따미 마을 작품 좋아요

|             |                                |
| ----------- | ------------------------------ |
| method      | POST or GET                    |
| url         | /user/like/piece/:id (작품 id) |
| Header      | x-access token                 |
| Body(Query) |                                |
| Return      |                                |

    {
    "result": 1,
    "message": "좋아요 성공" or "좋아요 취소"
    }

## 따미 마을 내가 좋아하는 작품

|             |                |
| ----------- | -------------- |
| method      | POST           |
| url         | /user/mylikes  |
| Header      | x-access token |
| Body(Query) |                |
| Return      |                |

    {
    "result": 1,
    "likes": [
        {
            "fileUrl": [
                "http://222.251.129.150/uploads/1597128245912.jpg"
            ],
            "_id": "5f323e36085ba51d50ff5b3c",
            "title": "sss",
            "author": {
                "_id": "5f3139a8cb0e0f42d0a02b9a",
                "userId": "test",
                "userName": "최원석"
            }
        },
        {
            "fileUrl": [
                "http://222.251.129.150/uploads/1597128174782.jpg"
            ],
            "_id": "5f323dee085ba51d50ff5b3b",
            "title": "ddd",
            "author": {
                "_id": "5f3139a8cb0e0f42d0a02b9a",
                "userId": "test",
                "userName": "최원석"
            }
        }
    ]
    }

## 따미 마을 내가 찜한 상품 (최신순)

|             |                     |
| ----------- | ------------------- |
| method      | POST                |
| url         | /user/like/products |
| Header      | x-access-token      |
| Body(Query) |                     |
| Return      |                     |

    {
    "result": 1,
    "likeProducts": [
        {
            "fileUrl": [
                "http://222.251.129.150/uploads/material.jpg"
            ],
            "state": 0,
            "_id": "5f3500c3b6789b2ae0da781f",
            "title": "바",
            "locationName": "연세대학교",
            "created": "2020-08-13T08:58:43.556Z"
        },
        {
            "pieces": [
                {
                    "fileUrl": [
                        "http://222.251.129.150/uploads/1597129422996.jpg"
                    ],
                    "_id": "5f3242cfeaf0a645c0d38b63"
                }
            ],
            "state": 0,
            "_id": "5f33c101e190c12758d4c624",
            "title": "작품이름 (작품이름은 한줄만 나오게 해주세요) ",
            "locationName": "연세대학교",
            "created": "2020-08-12T10:14:25.415Z"
        }
    ]
    }


## 검색어 기록

|             |                     |
| ----------- | ------------------- |
| method      | POST or GET         |
| url         | /api/search/history |
| Header      | x-access token      |
| Body(Query) |                     |
| Return      |                     |

    {
    "result": 1,
    "history": [
        "김따미",
        "김따미"
    ]
    }


## 따미 마을 작가 검색

1.  인기순 검색(팔로워 수)

|             |                                                                                    |
| ----------- | ---------------------------------------------------------------------------------- |
| method      | POST or GET                                                                        |
| url         | /api/author/search                                                                 |
| Header      |                                                                                    |
| Body(Query) | ex) <span style="color:gray">{"list":0, "count":2,"searchingBy":"wonseok" }</span> |
| Return      |                                                                                    |

    {
    "result": 0,
    "authors": [
        {
            "likeField": [
                "공예",
                "예술"
            ],
            "follower": [],
            "imageUrl": "",
            "stateMessage": "안녕하세요 만나서 반가워요",
            "_id": "5f3139a8cb0e0f42d0a02b9a",
            "userId": "test",
            "followByMe": false
        },
        {
            "likeField": [
                "공예",
                "예술"
            ],
            "follower": [],
            "imageUrl": "",
            "stateMessage": "안녕하세요 만나서 반가워요",
            "_id": "5f32426aeaf0a645c0d38b60",
            "userId": "ddami",
            "followByMe": false
        }
    ]
    }

<center>옵션[options]</center>

searchingBy

- 검색어

count

- Default count=30
- 출력 시킬 데이터 개수

list

- Default list =0
- list:0 count:10 -> 0~9까지 출력
- list:1 count:10 -> 10~19까지 출력

## 작품 상세보기

|             |                   |
| ----------- | ----------------- |
| method      | POST or GET       |
| url         | /piece/detail/:id |
| Header      |                   |
| Body(Query) |                   |
| Return      |                   |

    {
    "result": 1,
    "piece": {
        "fileUrl": [
            "http://222.251.129.150/uploads/1597309264240.jpg"
        ],
        "comments": [
            {
                "comments": [
                    "5f35911bd24e7e4688477317"
                ],
                "_id": "5f358e19a5c6d03550704709",
                "user": {
                    "imageUrl": "http://222.251.129.150/uploads/default.jpg",
                    "_id": "5f3139a8cb0e0f42d0a02b9a",
                    "userId": "test",
                    "userName": "최원석"
                },
                "content": "첫 댓글",
                "created": "2020-08-13T19:01:45.317Z"
            },
            {
                "comments": [],
                "_id": "5f359071d24e7e4688477316",
                "user": {
                    "imageUrl": "http://222.251.129.150/uploads/default.jpg",
                    "_id": "5f3139a8cb0e0f42d0a02b9a",
                    "userId": "test",
                    "userName": "최원석"
                },
                "content": "두번째 댓글",
                "created": "2020-08-13T19:11:45.281Z"
            }
        ],
        "hasField": [],
        "views": 4,
        "like": [],
        "likeCount": 0,
        "state": 0,
        "_id": "5f350150b6789b2ae0da7820",
        "title": "dddd",
        "description": "dddddd",
        "author": {
            "_id": "5f326322a4f43a3a70b9b701",
            "userId": "test6"
        },
        "created": "2020-08-13T09:01:04.680Z",
        "__v": 2,
        "likeByUser": false
    }
    }   

- 조회수 증가 => 해당 게시물을 10분 안에 조회했었으면 증가 x

## 댓글 정보 가져오기 ( 대댓글 가져올시 활용 )

|             |                     |
| ----------- | ------------------- |
| method      | POST or GET         |
| url         | /comment/detail/:id |
| Header      |                     |
| Body(Query) |                     |
| Return      |                     |

    {
    "result": 1,
    "comment": {
        "comments": [],
        "_id": "5f3591acd24e7e4688477318",
        "user": "5f3139a8cb0e0f42d0a02b9a",
        "content": "세번째 댓글",
        "created": "2020-08-13T19:17:00.318Z",
    }
}

## 따미 샾 작품,재료 좋아요

|             |                                            |
| ----------- | ------------------------------------------ |
| method      | POST or GET                                |
| url         | /user/like/product/:id (작품id or 재료 id) |
| Header      | x-access-token                             |
| Body(Query) |                                            |
| Return      |                                            |

    {
    "result": 1,
    "message": "좋아요 성공" or "좋아요 취소"
    }

## 따미 작품 샵 글 작성

|        |                                                                                                                                                                               |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| method | POST                                                                                                                                                                          |
| url    | /shop/upload/piece                                                                                                                                                            |
| Header | x-access-token                                                                                                                                                                |
| Body   | <span style="color:gray">{"pieces":["5f313a23cb0e0f42d0a02b9c"],"title":"첫번쨰 판매","description":"1","price":10000,"hasField":["공예"],"locationName":"중앙대학교"}</span> |
| Return |                                                                                                                                                                               |

    {
    "result": 1,
    "message": "성공적으로 따미 작품샾에 업로드 하였습니다."
    }

## 따미 재료 샵 글 작성

|        |                                                                                                                                         |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| method | POST                                                                                                                                    |
| url    | /shop/upload/material                                                                                                                   |
| Header | x-access-token                                                                                                                          |
| files  | 개수 <=3 name = "img"                                                                                                                   |
| Body   | <span style="color:gray">{"title":"첫번쨰 판매","description":"1","price":10000,"hasField":["공예"],"locationName":"중앙대학교"}</span> |
| Return |                                                                                                                                         |

    {
    "result": 1,
    "message": "성공적으로 따미 재료샾에 업로드 하였습니다."
    }

## 작품샾 상세보기

|             |                          |
| ----------- | ------------------------ |
| method      | POST or GET              |
| url         | /shop/detail/product/:id |
| Header      |                          |
| Body(Query) |                          |
| Return      |                          |

    {
    "result": 1,
    "product": {
        "hasField": [
            "공예"
        ],
        "like": [
            "5f3139a8cb0e0f42d0a02b9a"
        ],
        "_id": "5f33c101e190c12758d4c624",
        "title": "작품이름 (작품이름은 한줄만 나오게 해주세요) ",
        "price": 0,
        "description": "1",
        "author": {
            "imageUrl": "http://222.251.129.150/uploads/default.jpg",
            "_id": "5f32426aeaf0a645c0d38b60",
            "userId": "ddami",
            "userName": "김따미"
        },
        "locationName": "연세대학교",
        "likeByUser": false
    }
    }


## 재료샾 상세보기

|             |                           |
| ----------- | ------------------------- |
| method      | POST or GET               |
| url         | /shop/detail/material/:id |
| Header      |                           |
| Body(Query) |                           |
| Return      |                           |

    {
    "result": 1,
    "material": {
        "hasField": [],
        "like": [],
        "_id": "5f3500bdb6789b2ae0da7817",
        "title": "바",
        "price": 120000,
        "description": "this is a sample.",
        "author": {
            "imageUrl": "http://222.251.129.150/uploads/default.jpg",
            "_id": "5f3139a8cb0e0f42d0a02b9a",
            "userId": "test",
            "userName": "최원석"
        },
        "locationName": "연세대학교",
        "likeByUser": false
    }
    }

## 따미 작품 샾 검색

1.  최신순/ 인기순 / 거리순  검색

|             |                                                                              |
| ----------- | ---------------------------------------------------------------------------- |
| method      | POST or GET                                                                  |
| url         | /shop/search/product                                                         |
| Header      |                                                                              |
| Body(Query) | ex) <span style="color:gray">{"list":0, "count": 2,"searchingBy":"" }</span> |
| Return      |                                                                              |


    {
    "result": 1,
    "products": [
        {
            "pieces": [
                {
                    "fileUrl": [
                        "http://222.251.129.150/uploads/1597129422996.jpg"
                    ],
                    "_id": "5f3242cfeaf0a645c0d38b63"
                }
            ],
            "views": 0,
            "like": [],
            "likeCount": 0,
            "state": 0,
            "_id": "5f3243bceaf0a645c0d38b66",
            "title": "나눔",
            "price": 0,
            "locationName": "연세대학교",
            "likeByMe": false
        },
        {
            "pieces": [
                {
                    "fileUrl": [
                        "http://222.251.129.150/uploads/1597129410963.jpg",
                        "http://222.251.129.150/uploads/1597129411100.jpg"
                    ],
                    "_id": "5f3242c3eaf0a645c0d38b62"
                },
                {
                    "fileUrl": [
                        "http://222.251.129.150/uploads/1597129429729.jpg",
                        "http://222.251.129.150/uploads/1597129429865.jpg"
                    ],
                    "_id": "5f3242d6eaf0a645c0d38b64"
                }
            ],
            "views": 0,
            "like": [],
            "likeCount": 0,
            "state": 0,
            "_id": "5f32438eeaf0a645c0d38b65",
            "title": "싸게 판매",
            "price": 12323,
            "locationName": "연세대학교",
            "likeByMe": false
        }
    ]
}


- 인기순 => searchingBy || sortingBy || count ||  list || field
- 거리순 => searchingBy || sortingBy || count || list || location
   

<center>옵션[options]</center>

searchingBy

- 검색어

sortingBy

- D (default 최신순)
- L (찜 순)
- T (거리순)
- 
field

- Default 전체 -> 파라미터 없으면 전체
- [ 배열(String) ] 배열 요소중 한개라도 관련 있는 작품
- 

count

- Default count=30
- 출력 시킬 데이터 개수

list

- Default list =0
- list:0 count:10 -> 0~9까지 출력
- list:1 count:10 -> 10~19까지 출력


location 
- [ longitude , latitude ]
- 현재 위치나 기준점이되는 위치 [경도,위도]
- 가까운 순으로 정렬
- 50km 이내로 제한을 둠
- distance - 거리 (m) 

## 따미 재료 샾 검색

1.  최신순/ 인기순 / 거리순  검색

|             |                                                                                           |
| ----------- | ----------------------------------------------------------------------------------------- |
| method      | POST or GET                                                                               |
| url         | /shop/search/material                                                                     |
| Header      |                                                                                           |
| Body(Query) | ex) <span style="color:gray">{"sortingBy":"T","list":1,"count":2,"location":[1,2]}</span> |
| Return      |                                                                                           |


    {
    "result": 1,
    "products": [
        {
            "_id": "5f33bc6833877c45c8fc263e",
            "fileUrl": [],
            "location": [
                0,
                0
            ],
            "hasField": [
                "공예"
            ],
            "views": 0,
            "like": [],
            "likeCount": 0,
            "state": 0,
            "title": "나눔",
            "price": 0,
            "description": "1",
            "author": "5f3139a8cb0e0f42d0a02b9a",
            "locationName": "한양대학교",
            "created": "2020-08-12T09:54:48.681Z",
            "__v": 0,
            "distance": 248906.39350564353,
            "likeByMe": false
        }
    ]
    }


- 인기순 => searchingBy || sortingBy || count ||  list || field
- 거리순 => searchingBy || sortingBy || count || list || location
   

<center>옵션[options]</center>

searchingBy

- 검색어

sortingBy

- D (default 최신순)
- L (찜 순)
- T (거리순)
- 
field

- Default 전체 -> 파라미터 없으면 전체
- [ 배열(String) ] 배열 요소중 한개라도 관련 있는 재료
- 

count

- Default count=30
- 출력 시킬 데이터 개수

list

- Default list =0
- list:0 count:10 -> 0~9까지 출력
- list:1 count:10 -> 10~19까지 출력


location 
- [ longitude , latitude ]
- 현재 위치나 기준점이되는 위치 [경도,위도]
- 가까운 순으로 정렬
- 50km 이내로 제한을 둠
- distance - 거리 (m) 