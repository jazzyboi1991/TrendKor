package com.example.demo.comment;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import jakarta.servlet.http.HttpSession;
import jakarta.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @GetMapping("")
    public String commentList(Model model, HttpSession session) {
        model.addAttribute("commentList", commentService.getAllComments());
        boolean isLoggedIn = session.getAttribute("username") != null;
        model.addAttribute("isLoggedIn", isLoggedIn);
        return "comment/comment_list";
    }

    @PostMapping("/create")
    public String createComment(@RequestParam("content") String content, HttpSession session, HttpServletRequest request) {
        String username = (String) session.getAttribute("username");
        if (username == null) {
            return "redirect:/LandingPage/index.html?loginRequired=true";
        }

        try {
            commentService.createComment(content, username);
        } catch (RuntimeException e) {
            return "redirect:/comments/?error=" + e.getMessage();
        }
        
        String referer = request.getHeader("Referer");
        return "redirect:" + (referer != null ? referer : "/DetailedContentPage/index.html");
    }

    @PostMapping("/delete")
    public String deleteComment(@RequestParam("commentId") Long commentId, HttpSession session, HttpServletRequest request) {
        String username = (String) session.getAttribute("username");
        if (username == null) {
            return "redirect:/LandingPage/index.html?loginRequired=true";
        }
        try {
            commentService.deleteComment(commentId, username);
        } catch (RuntimeException e) {
            String referer = request.getHeader("Referer");
            return "redirect:" + (referer != null ? referer : "/DetailedContentPage/index.html?error=" + e.getMessage());
        }
        String referer = request.getHeader("Referer");
        return "redirect:" + (referer != null ? referer : "/DetailedContentPage/index.html");
    }
}