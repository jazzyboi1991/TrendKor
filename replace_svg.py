#!/usr/bin/env python3
import re

# 파일 경로
input_file = "/Volumes/Passport 3/공부/대학교 프로그래밍/충북대학교/3학년 2학기/오픈소스개발프로젝트/Project/Frontend/LandingPage/assets/Footer/Original Source Codes/Footer_Original.html"

# HTML 파일 읽기
with open(input_file, 'r', encoding='utf-8') as f:
    content = f.read()

# SVG 패턴 찾기
svg_pattern = r'                <svg[\s\S]*?                </svg>'
replacement = '                <img src="../assets/logo.svg" alt="Footer Logo" />'

# 치환 수행
new_content = re.sub(svg_pattern, replacement, content)

# 파일 저장
with open(input_file, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("✓ SVG를 이미지 태그로 변경 완료")
