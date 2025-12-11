package com.example.demo.userlogin;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class UserDataInitializer implements CommandLineRunner {

    private final UserDataRepository userDataRepository;

    public UserDataInitializer(UserDataRepository userDataRepository) {
        this.userDataRepository = userDataRepository;
    }

    @Override
    public void run(String... args) {
        seedDefaultUser("trendkor", "trendkor123!", "tred");
        seedDefaultUser("guest", "guest1234!", "gu");
    }

    private void seedDefaultUser(String username, String password, String nickname) {
        userDataRepository.findByUsername(username)
                .ifPresentOrElse(
                    // 기존 사용자가 있으면 nickname이 null이거나 빈 문자열인 경우에만 업데이트
                    existingUser -> {
                        if (existingUser.getNickname() == null || existingUser.getNickname().trim().isEmpty()) {
                            existingUser.setNickname(nickname);
                            userDataRepository.save(existingUser);
                        }
                    },
                    // 사용자가 없으면 새로 생성
                    () -> userDataRepository.save(new UserData(username, password, nickname))
                );
    }
}

