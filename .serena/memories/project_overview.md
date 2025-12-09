# TrendKor 프로젝트 개요

## 프로젝트 목적
TrendKor는 한국의 문화 트렌드와 밈(Meme)을 제공하는 웹 애플리케이션입니다. 사용자는 로그인하여 연도별 밈 콘텐츠를 조회하고, 상세 정보를 볼 수 있습니다.

## 주요 기능
1. **로그인/회원가입**: 사용자 인증 시스템 (UserData, UserService, UserController)
2. **밈 콘텐츠 관리**: 연도별 밈 데이터 조회 (MemeService, MemeController, MemeData)
3. **상세 페이지**: 콘텐츠 상세 정보 표시 (DetailedOverviewPageController)
4. **랜딩 페이지**: 메인 페이지 (LandingPageController)

## 기술 스택
- **백엔드**: Spring Boot 3.5.7 (Java 21)
- **데이터베이스**: H2 In-Memory Database
- **프론트엔드**: HTML5, CSS3, JavaScript (Thymeleaf 템플릿)
- **ORM**: JPA/Hibernate
- **빌드**: Gradle
- **라이브러리**: Lombok (보일러플레이트 코드 제거)

## 프로젝트 구조
```
main_project/demo/
├── src/main/
│   ├── java/com/example/demo/
│   │   ├── DemoApplication.java (진입점)
│   │   ├── config/ (설정)
│   │   ├── landing/ (랜딩 페이지)
│   │   ├── meme/ (밈 관련)
│   │   ├── userlogin/ (사용자 인증)
│   │   └── detailedoverview/ (상세 페이지)
│   └── resources/
│       ├── application.properties (설정)
│       └── static/ (정적 자산)
│           ├── LandingPage/
│           ├── DetailedContentPage/
│           ├── DetailedOverviewPage/
│           └── MemePicture/
└── build.gradle (빌드 설정)
```

## 데이터베이스 설정
- URL: `jdbc:h2:./TrendKor_data/local_web_db`
- Driver: H2
- Username: `dandyTeam`
- Password: `dandyTeam1234@`
- DDL: create (항상 새로 생성)

## 개발 팀 정보
- Git 커밋 메시지가 한국어로 작성됨
- 최근 작업: "Meme Of The Year 부분 수정" (6e30493)
- 활발한 개발 진행 중
