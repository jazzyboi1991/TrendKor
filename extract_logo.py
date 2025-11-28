#!/usr/bin/env python3
import re

# 파일 경로
input_file = "/Volumes/Passport 3/공부/대학교 프로그래밍/충북대학교/3학년 2학기/오픈소스개발프로젝트/Project/Frontend/LandingPage/assets/Footer/Original Source Codes/Footer_Original.html"
output_file = "/Volumes/Passport 3/공부/대학교 프로그래밍/충북대학교/3학년 2학기/오픈소스개발프로젝트/Project/Frontend/LandingPage/assets/Footer/assets/logo.svg"

# HTML 파일 읽기
with open(input_file, 'r', encoding='utf-8') as f:
    content = f.read()

# SVG 추출 (가장 첫 번째 <svg>부터 </svg>까지)
svg_pattern = r'<svg[^>]*>[\s\S]*?</svg>'
match = re.search(svg_pattern, content)

if match:
    svg_content = match.group(0)

    # SVG 파일로 저장
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(svg_content)

    print(f"✓ SVG 추출 완료")
    print(f"✓ 파일 저장: {output_file}")
    print(f"✓ SVG 크기: {len(svg_content)} bytes")
else:
    print("✗ SVG를 찾을 수 없습니다")
