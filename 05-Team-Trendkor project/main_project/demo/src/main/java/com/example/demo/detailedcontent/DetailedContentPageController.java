package com.example.demo.detailedcontent;

import com.example.demo.comment.CommentService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
public class DetailedContentPageController {

    private final CommentService commentService;

    @GetMapping({"/DetailedContentPage/index.html", "/detail"})
    public String showDetailPage(Model model, HttpSession session) {
        model.addAttribute("commentList", commentService.getAllComments());
        String username = (String) session.getAttribute("username");
        model.addAttribute("isLoggedIn", username != null);
        model.addAttribute("currentUsername", username);
        return "DetailedContentPage/index";
    }
}

