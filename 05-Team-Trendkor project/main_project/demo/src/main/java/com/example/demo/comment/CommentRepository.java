package com.example.demo.comment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    // 모든 댓글을 작성일 기준으로 내림차순 정렬하여 가져오는 메서드
    List<Comment> findAllByOrderByCreatedDateDesc();
}