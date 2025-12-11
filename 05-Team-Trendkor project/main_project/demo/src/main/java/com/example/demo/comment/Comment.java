package com.example.demo.comment;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 댓글 내용
    @Column(columnDefinition = "TEXT")
    private String content;

    // 댓글 작성 시간
    private LocalDateTime createdDate;

    // 작성자 (이미 구현된 User 엔티티와 관계 설정)
    // 실제 사용자 엔티티의 이름과 패키지를 'com.example.demo.user.User'로 가정합니다.
    @ManyToOne
    @JoinColumn(name = "user_id")
    private com.example.demo.userlogin.UserData author; 

    // 게시물 ID (만약 댓글이 특정 게시물에 종속된다면)
    // private Long postId; 

    // 댓글 생성 시 초기화하는 생성자
    public Comment(String content, com.example.demo.userlogin.UserData author) {
        this.content = content;
        this.author = author;
        this.createdDate = LocalDateTime.now();
    }
}