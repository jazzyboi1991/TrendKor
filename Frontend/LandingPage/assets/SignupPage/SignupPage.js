document.addEventListener('DOMContentLoaded', function() {
    const closeButton = document.querySelector('.Vector');
    const signUpButton = document.querySelector('.Rectangle4');
    const nicknameInput = document.querySelector('input[placeholder="닉네임"]');
    const idInput = document.querySelector('input[placeholder="아이디"]');
    const pwInput = document.querySelector('input[placeholder="비밀번호"]');

    // 닫기 버튼 이벤트
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            console.log('Close button clicked');
            // 닫기 로직 추가
        });
    }

    // 회원가입 버튼 이벤트
    if (signUpButton) {
        signUpButton.addEventListener('click', function(e) {
            e.preventDefault();
            handleSignUp();
        });
    }

    // 회원가입 함수
    function handleSignUp() {
        const nickname = nicknameInput ? nicknameInput.value : '';
        const id = idInput ? idInput.value : '';
        const password = pwInput ? pwInput.value : '';

        if (!nickname || !id || !password) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        console.log('Sign up attempt:', {
            nickname,
            id,
            password
        });

        // 회원가입 로직 추가
    }

    // 엔터키로 회원가입
    const inputs = [nicknameInput, idInput, pwInput];
    inputs.forEach(input => {
        if (input) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    handleSignUp();
                }
            });
        }
    });
});
