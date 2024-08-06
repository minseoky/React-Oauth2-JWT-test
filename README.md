# OAuth2 로그인 및 JWT 발급 로직

`index.js`, `App.js`: 기본 설정 및 라우팅 용입니다.
`LoginPage.js`: http://localhost:8080/oauth2/authorization/google 로 요청을 보내면 google oauth 로그인 페이지(소셜 로그인 페이지)로 이동합니다. 
-> 스프링 프로젝트가 데몬에서 실행중이어야 돌아갑니다. 로직만 참고해주세요. 추후 도메인 변경에 따라 바뀔 수 있습니다.
`Home.js`: 로그인 완료 시 리다이렉트 되는 페이지입니다. (localhost:3000/home, 물론 이 주소도 바뀔 수 있습니다.) 버튼이 두 개 있습니다. jwt 발급이 성공적이라면 하나는 "Hello, World"를 alert하고, 나머지 하나는 Test json 데이터를 alert합니다.
로직에서는 Authorization 헤더에 jwt 토큰을 담고 있습니다. 이 경우, 앞에 "Bearer "가 반드시 붙어야 합니다. 띄어쓰기도 반드시 포함해야 합니다.
