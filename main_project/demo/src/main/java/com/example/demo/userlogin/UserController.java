package com.example.demo.userlogin;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.userlogin.DTO.UserLoginRequest;
import com.example.demo.userlogin.DTO.UserSignUpRequest;


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
    public ResponseEntity<?> login(@RequestBody UserLoginRequest request){
        try{
            UserData user = userService.login(request);
            // 로그인 성공 시 nickname을 포함한 JSON 응답 반환
            // nickname이 null이거나 빈 문자열이면 username 사용
            String nickname = user.getNickname();
            if (nickname == null || nickname.trim().isEmpty()) {
                nickname = user.getUsername();
            }
            java.util.Map<String, String> response = new java.util.HashMap<>();
            response.put("message", "로그인 성공!");
            response.put("nickname", nickname);
            return ResponseEntity.ok(response);
        } catch(IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
