# 코드 스타일 및 규칙

## Java 코드 컨벤션
- **패키지 구조**: `com.example.demo.[기능영역]`
- **클래스 이름**: PascalCase (예: `MemeService`, `UserController`)
- **메서드 이름**: camelCase
- **상수**: UPPER_SNAKE_CASE (필요한 경우)

## Spring Boot 패턴
- **Controller**: `@RestController` 또는 `@Controller` 사용, 경로는 기능별로 분류
- **Service**: 비즈니스 로직 담당, `@Service` 어노테이션 사용
- **Entity**: JPA 엔티티, Lombok의 `@Data`, `@Entity` 사용
- **Repository**: JPA Repository 인터페이스 확장

## Lombok 사용
- `@Data`: getter, setter, toString 자동 생성
- `@Entity`: JPA 엔티티 표시
- `@NoArgsConstructor`, `@AllArgsConstructor`: 생성자 자동 생성

## 언어 설정
- **개발 커밋 메시지**: 한국어 사용
- **코드 주석**: 한국어 또는 영어 사용 가능
- **클래스/메서드 명명**: 영어 (국제 표준)

## 폴더 구조 규칙
- 기능별로 폴더 분류 (landing, meme, userlogin, detailedoverview)
- DTO는 별도의 DTO 폴더에 관리
- 정적 자산은 기능별 폴더로 구분

## 데이터베이스 관례
- 엔티티는 테이블과 동일한 이름 (또는 `@Table` 명시)
- 초기 데이터는 `*Initializer` 클래스에서 로드
