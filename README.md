# OAuth2 로그인 및 JWT 발급 로직

`index.js`, `App.js`: 기본 설정 및 라우팅 용입니다.  

`LoginPage.js`: http://localhost:8080/oauth2/authorization/google 로 요청을 보내면 google oauth 로그인 페이지(소셜 로그인 페이지)로 이동합니다.   

-> 스프링 프로젝트가 데몬에서 실행중이어야 돌아갑니다. 로직만 참고해주세요. 추후 도메인 변경에 따라 바뀔 수 있습니다.  

`Home.js`: 로그인 완료 시 리다이렉트 되는 페이지입니다. (localhost:3000/home, 물론 이 주소도 바뀔 수 있습니다.) 버튼이 두 개 있습니다. jwt 발급이 성공적이라면 하나는 "Hello, World"를 alert하고, 나머지 하나는 Test json 데이터를 alert합니다.  
로직에서는 Authorization 헤더에 jwt 토큰을 담고 있습니다. 이 경우, 앞에 "Bearer "가 반드시 붙어야 합니다. 띄어쓰기도 반드시 포함해야 합니다.  

## OAuth2 인증 및 JWT 발급 방식

1. 유저가 Oauth 로그인을 합니다.
2. 백엔드 서버가 OAuth 서버(구글, 카카오 등)로부터 유저 정보를 얻어와 처리합니다.
3. 백엔드 서버에서 올바른 유저인지 검증 후, 회원이 아니라면, 회원가입시킵니다. 이때 생일이나 성별 없이 DB에 넣어집니다.
4. 백엔드 서버에서 로그인한 유저를 특정 경로(여기서는 localhost:3000/home)으로 리다이렉션시킵니다. 이때, 백엔드 서버는 유저에게 jwt를 쿠키에 담아 보냅니다.
5. 유저는 쿠키에 담긴 jwt를 꺼내 api 요청시마다 Authorization헤더에 "Bearer "를 붙여 보냅니다. 이 때, withCredentials: ture여야 합니다.
6. 토큰이 올바르다면 응답이 정상적으로 오고, 아니라면 다음 에러가 발생합니다. 콜론 뒤는 code입니다. 에러는 추가되거나 변경될 수 있습니다.  
   6-1. 토큰 유효기간 만료: AF  
   6-2. 토큰 인증 정보 올바르지 않음: AF  
   6-3. 서버 에러: ISE  


## 직접 테스트하려면:

프론트엔드: `npm install` -> `npm start` (-p 3000)

백엔드: easymap spring boot 프로젝트 `git clone` 후 실행 (-p 8080)
