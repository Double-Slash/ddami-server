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
  
    "result": 0, //성공시 1 실패시 0
    "message": "wonseok5893@naver.com로 로그인 성공", // 성공,실패 메시지
    "token": "?"

   


2. 소셜 로그인
 
## 사용자 회원가입
|        |                                                                                                                                                                                                                         |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| method | POST                                                                                                                                                                                                                    |
| url    | /user/join                                                                                                                                                                                                              |
| Header |                                                                                                                                                                                                                         |
| Body   | ex) <span style="color:gray">{"userName":"최원석","userEmail":"wonseok5893@naver.com","userPassword":"12345678","userSex":"male","userBirth":"1995-10-27","userPhone":"01041105893","likeField":["공예","예술"]}</span> |
| Return |                                                                                                                                                                                                                         |
    "result": 0, // 성공시 1, 실패시 0
    "message": "DB 오류" // 성공,실패 메시지
    |

        




## 사용자 게시물 업로드

|        |                                                                              |
| ------ | ---------------------------------------------------------------------------- |
| method | POST                                                                         |
| url    | /user/upload/piece                                                           |
| Header | x-access-token                                                               |
| files  | 개수 <=3                                                                     |
| Body   | ex) <span style="color:gray">{"title":"DDAMI","description":"Hello!"}</span> |
| Return |                                                                              |
    "result": 0, // 성공시 1, 실패시 0
    "message": "DB 오류" // 성공,실패 메시지
    |


## 검색
1. 최신순 검색 (Default) /  인기순 검색
   
|             |                                                                                     |
| ----------- | ----------------------------------------------------------------------------------- |
| method      | POST or GET                                                                         |
| url         | /api/search                                                                         |
| Header      |                                                                                     |
| Body(Query) | ex) <span style="color:gray">{"sortingBy":"L","Field":"예술","list":"1 ~ Z"}</span> |
| Return      |                                                                                     |
    {"result":"1", "values":"[{작품},{},{},{}]"}
    
