package com.example.demo.userlogin;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.userlogin.DTO.UserLoginRequest;
import com.example.demo.userlogin.DTO.UserSignUpRequest;

import jakarta.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }
    
    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody UserSignUpRequest request){
        try{
            userService.signUp(request);
            return ResponseEntity.ok("회원가입 성공!");

        } catch(IllegalArgumentException e){

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginRequest request, HttpSession session){
        try{
            UserData user = userService.login(request);
            // 세션에 로그인 정보 저장
            session.setAttribute("username", user.getUsername());
            session.setAttribute("nickname", user.getNickname());

            String nickname = (user.getNickname() == null || user.getNickname().trim().isEmpty())
                    ? user.getUsername()
                    : user.getNickname();

            Map<String, String> response = new HashMap<>();
            response.put("message", "로그인 성공!");
            response.put("nickname", nickname);
            return ResponseEntity.ok(response);
        } catch(IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(HttpSession session) {
        String username = (String) session.getAttribute("username");
        String nickname = (String) session.getAttribute("nickname");
        if (username == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }
        Map<String, String> response = new HashMap<>();
        response.put("username", username);
        response.put("nickname", nickname != null ? nickname : username);
        return ResponseEntity.ok(response);
    }

}
