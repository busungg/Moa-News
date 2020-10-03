# Project 목표

## 1. React 사용해보기

## 2. Redux, Redux 미들웨어 사용해보기

## 3. React SSR 구현해보기

## 4. CI/CD 환경 구현해보기

## 5. TDD 개발방법론에 익숙해지기

### 5.1 Story Book 적용

1. Component 각각을 테스트 할 수 있는 환경 제공

## 6. 클라우드 서비스 사용해보기

### 6.1 클라우드 서비스 선택(Heroku)

1. Firebase
   - Backend 구현 불가
2. AWS(EC2)
   - Infrastructure as a Service
   - 다양한 configuration이 존재 (CPU, RAM, etc..) 서버 자체를 조절할 수 있음
3. Heroku(선택)
   - Platform as a Service
   - AWS(EC2) 보다 간단함
   - 이미 구현된 os, 개발 도구를 선택하여 사용 가능

- 개인 프로젝트이기 때문에 서버 부하가 적을 것으로 예상되어 서버 관리의 필요성이 적음
- 인프라 구축 보다는 프로젝트 구현이 더 중요함
- Heroku 사용 시 주의 사항
  - 완전한 Client Side 프로젝트라면 Build pack이라는것을 사용해야 한다.
  - [CRA 설명 주소](https://create-react-app.dev/docs/deployment/)
  - [Heroku 설명 주소](https://blog.heroku.com/deploying-react-with-zero-configuration)

=> 복잡한 AWS 보다는 Heroku 사용이 더 적합
( [AWS vs Heroku](https://rubygarage.org/blog/heroku-vs-amazon-web-services) )
