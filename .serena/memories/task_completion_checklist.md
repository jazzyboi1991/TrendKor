# 작업 완료 체크리스트

개발 작업을 완료할 때 다음 항목을 확인하세요:

## 코드 변경
- [ ] Java 파일 수정 완료
- [ ] 코드 스타일 확인 (PascalCase 클래스명, camelCase 메서드명)
- [ ] Lombok 어노테이션 확인
- [ ] 한국어 커밋 메시지 준비

## 빌드 및 테스트
- [ ] `./gradlew clean build` 성공
- [ ] 테스트 실행 및 통과: `./gradlew test`
- [ ] 컴파일 에러 없음

## 데이터베이스
- [ ] H2 데이터베이스 설정 확인
- [ ] 필요시 Initializer 클래스 수정
- [ ] 엔티티와 테이블 매핑 확인

## 프론트엔드 (HTML/CSS/JS 변경 시)
- [ ] HTML 구조 검증
- [ ] CSS 스타일 적용 확인
- [ ] JavaScript 오류 확인 (브라우저 콘솔)
- [ ] 반응형 디자인 테스트

## Git 관리
- [ ] 변경사항 확인: `git status`
- [ ] 적절한 파일만 staging: `git add`
- [ ] 한국어 커밋 메시지: `git commit -m "한국어 설명"`
- [ ] 리모트에 푸시: `git push`

## 배포 전 최종 확인
- [ ] 모든 기능 테스트 완료
- [ ] 에러 로그 확인
- [ ] H2 Console에서 데이터 확인
- [ ] 다른 팀원이 작성한 코드와 충돌 없음

## 주요 파일 체크포인트
- [ ] `DemoApplication.java` - 애플리케이션 진입점
- [ ] `application.properties` - 설정 파일
- [ ] 해당 기능의 Controller, Service, Entity, Repository
- [ ] 정적 자산 (HTML, CSS, JS, 이미지)
