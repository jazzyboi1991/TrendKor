# 개발 필수 명령어

## 프로젝트 빌드 및 실행

### 빌드
```bash
cd main_project/demo
./gradlew build
```

### 개발 모드 실행 (자동 재로드)
```bash
cd main_project/demo
./gradlew bootRun
```

### 특정 태스크 실행
```bash
./gradlew clean          # 빌드 결과 정리
./gradlew compileJava   # Java 컴파일만
./gradlew test          # 테스트 실행
```

## Git 명령어

### 커밋 (한국어 메시지 사용)
```bash
git add .
git commit -m "기능 설명"
git push
```

### 브랜치 확인
```bash
git branch -a          # 모든 브랜치 확인
git checkout YHS_temp  # YHS_temp 브랜치로 전환
git checkout -b 새_브랜치  # 새 브랜치 생성
```

## 데이터베이스 확인

### H2 Console 접근
- URL: `http://localhost:8080/h2-console`
- 드라이버 클래스: `org.h2.Driver`
- JDBC URL: `jdbc:h2:./TrendKor_data/local_web_db`
- 사용자명: `dandyTeam`
- 비밀번호: `dandyTeam1234@`

## IDE 및 개발 도구

### VSCode 설정 (프로젝트에 .vscode 폴더 있음)
```bash
code .  # VSCode 열기
```

### Java 버전 확인
```bash
java -version
# Java 21 필요
```

## 문제 해결

### Gradle 캐시 정리
```bash
cd main_project/demo
./gradlew --stop
rm -rf .gradle
./gradlew build
```

### IDE 리로드
프로젝트를 IDE에서 다시 로드하거나 VSCode 창을 재시작
