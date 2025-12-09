package com.example.demo.comment;

import com.example.demo.userlogin.UserData; // 수정된 UserData 엔티티 임포트
import com.example.demo.userlogin.UserDataRepository; // 새로 정의한 리포지토리 임포트
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    // UserService 대신 UserDataRepository를 주입받아 사용
    private final UserDataRepository userDataRepository; 

    // 댓글 작성 로직: 로그인된 사용자만 접근 가능
    @Transactional
    public Comment createComment(String content, String username) {
        
        // 1. 유효성 검사: username을 사용하여 UserData 객체 조회
        // findByUsername 메서드를 사용하여 Optional로 조회합니다.
        UserData author = userDataRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException("사용자를 찾을 수 없습니다: " + username));
        
        // 2. 댓글 엔티티 생성 및 저장
        // Comment 엔티티의 author 필드 타입이 UserData로 변경되어야 합니다.
        Comment newComment = new Comment(content, author);
        return commentRepository.save(newComment);
    }

    @Transactional
    public void deleteComment(Long commentId, String username) {
        if (commentId == null) {
            throw new IllegalArgumentException("댓글 ID가 필요합니다.");
        }
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new NoSuchElementException("댓글을 찾을 수 없습니다."));
        if (comment.getAuthor() == null || comment.getAuthor().getUsername() == null) {
            throw new IllegalStateException("댓글 작성자 정보가 없습니다.");
        }
        if (!comment.getAuthor().getUsername().equals(username)) {
            throw new SecurityException("본인이 작성한 댓글만 삭제할 수 있습니다.");
        }
        commentRepository.delete(comment);
    }

    // 모든 댓글을 최신순으로 조회
    @Transactional(readOnly = true)
    public List<Comment> getAllComments() {
        return commentRepository.findAllByOrderByCreatedDateDesc();
    }
}