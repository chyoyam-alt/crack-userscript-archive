# 크랙 확프 보관소

> **배포 형태:** 이 패키지는 **GitHub Pages 저장소용**입니다. GitHub Gist에 단일 HTML로 올리는 전용 패키지는 아닙니다.
> `START_ADMIN.bat`과 `START_PREVIEW.bat`은 Windows에서 로컬 관리자/미리보기 서버를 여는 **선택 편의 파일**이며, GitHub Pages 배포에는 필요하지 않고 `dist/`에도 포함되지 않습니다.


크랙용 독립 유저스크립트(`.user.js`)를 검색하고, 상세 설명을 확인하고, 필요한 확프를 골라 **각 설치 링크를 하나씩 여는** GitHub Pages용 정적 보관소입니다.

> 확프 코드는 서로 합치지 않습니다. 각 유저스크립트는 독립 설치·독립 업데이트를 유지합니다.

## 현재 상태

- 공개 카탈로그 원본 `data/catalog.source.json`은 **실제 항목 0개인 빈 상태**입니다.
- 공개 화면에 가짜 확프 카드는 들어 있지 않습니다.
- 디자인과 동작 확인용 가짜 항목은 `preview.html`에서만 사용합니다.
- `admin.html`과 관리자 전용 JS/CSS는 GitHub Pages 배포본 `dist/`에 포함되지 않습니다.

## 디자인

- 큰 제목: **프리젠테이션**
- 일반 UI: **SUIT Variable**
- 색상: **잉크 블루 × 산성 올리브**
- 라이트·다크 모드
- 움직이는 SVG 얼굴 도우미
  - 자연스러운 랜덤 눈 깜빡임
  - 대기 호흡
  - 마우스 오버·열기 시 손 흔들기
  - AI 처리 중 집중 눈썹과 손 동작
  - 작은 픽셀·반짝임 효과

웹폰트는 CDN으로 불러옵니다. 방문자 브라우저에 인터넷 연결이 있으면 GitHub Pages에서도 동일하게 표시됩니다.

---

## 사용자 화면 기능

### 검색·상세·선택

- 이름·설명·기능·태그·별칭 통합 검색
- 추천순·이름순·최근 수정순 정렬
- 카드 전체 클릭으로 상세 정보 열기
- PC·모바일 지원, 성능 부담, 근거 상태 표시
- 필수·충돌·함께 추천 관계
- 선택 목록과 공유 주소
- 각 설치 링크를 순서대로 여는 설치 큐
- GitHub Issue 문제 제보 연결

### 원본 확프 표기

포크·개조·이식 버전은 다음 정보를 별도로 표시할 수 있습니다.

```json
"originalSource": {
  "url": "https://원본-페이지.example",
  "label": "원본 배포 페이지",
  "author": "원본 작성자",
  "note": "무엇을 기반으로 했고 무엇이 달라졌는지"
}
```

원본 정보가 있는 항목은 카드에 `원본 링크` 표시가 붙고, 상세 화면에서 원본 페이지를 새 탭으로 열 수 있습니다.

### 소개 이미지와 영상 같은 배경 연출

확프별 상세 이미지:

```json
"presentation": {
  "coverImageUrl": "assets/example.webp",
  "coverImageAlt": "확프 적용 화면",
  "coverImageCreditUrl": "https://출처.example",
  "coverImageCreditLabel": "이미지 출처"
}
```

이미지를 등록하면 상세 화면에서:

- 원본 이미지를 중앙에 표시
- 같은 이미지를 뒤쪽에 크게 확대·블러 처리
- 배경이 아주 천천히 이동해 정지 이미지도 영상처럼 보이는 연출
- `prefers-reduced-motion`에서는 움직임 자동 중지

사이트 상단 소개 이미지도 `data/site.json`의 `heroMedia`에서 같은 방식으로 켤 수 있습니다.

### AI 도우미

- 사이트는 API 없이도 검색·선택·무료 추천 마법사를 사용할 수 있습니다.
- 방문자는 자신의 Gemini·DeepSeek·Firebase AI Logic 설정을 현재 탭에서만 연결할 수 있습니다.
- 키와 Firebase 설정은 파일·카탈로그·localStorage에 저장하지 않습니다.
- AI는 구조화된 확프 ID만 반환합니다.
- 화면이 실제 카탈로그에 존재하는 ID인지 다시 검사한 뒤 추천 카드를 만듭니다.
- 추천 카드에서 `바로 담기`, `상세 보기`, `체크한 추천 담기`를 사용할 수 있습니다.

AI 말투는 `data/ai-recommendation-instructions.md`에서 관리합니다.

- 고정 호칭 없음
- 슴다체 유지
- 해요체 금지
- 카오모지 0~2개로 제한
- 중요한 경고를 먼저 전달하고 농담은 짧게
- 카탈로그에 없는 기능·URL·확프를 날조하지 않음

---

# 제작자용 관리자

## 가장 쉬운 실행 — Windows 선택 사항

Windows에서 로컬 관리자 화면을 자주 쓸 때만 아래 파일을 더블클릭합니다. GitHub Pages 배포 자체에는 필요하지 않습니다.

```text
START_ADMIN.bat
```

브라우저에서 다음 주소가 열립니다.

```text
http://127.0.0.1:8765/admin.html
```

디자인 샘플 화면은:

```text
START_PREVIEW.bat
```

으로 엽니다. 두 배치 파일은 Python 3의 간단한 로컬 서버를 사용합니다.

## 관리자에서 할 수 있는 일

- `.user.js` 파일 선택 또는 코드 붙여넣기
- UserScript 메타데이터 자동 추출
- DOM 감시, 반복 실행, 저장소, 외부 통신, 오디오, Canvas 등 코드 단서 탐지
- Gemini·DeepSeek·Firebase AI Logic 자동 문서화
- AI에게 보낼 코드 범위 선택과 비밀값 패턴 마스킹
- AI 결과를 편집 가능한 초안에 반영
- 기존 항목 후보 자동 매칭
- 신규 등록 또는 기존 항목 업데이트
- 원본 확프 링크·작성자·메모 관리
- 확프별 소개 이미지와 출처 관리
- 사이트 상단 이미지·저장소·제보 주소 관리
- `등록하고 원본 바로 받기` 한 번으로 작업본 반영 후 `catalog.source.json` 다운로드

## 메타데이터 URL 후보 자동 정리

기계 분석을 실행하면 다음 메타데이터를 URL 후보로 모읍니다.

```text
@source
@homepageURL
@homepage
@website
@supportURL
@downloadURL
@updateURL
```

각 후보 옆에서:

- `설치 URL로 쓰기`
- `원본 링크로 쓰기`

를 눌러 입력칸에 바로 넣을 수 있습니다.

자동 입력 원칙:

- 명시적인 `@downloadURL`은 설치 URL 초안으로 사용
- 명시적인 `@source`는 원본 확프 URL 초안으로 사용
- 홈페이지·지원 페이지는 원본인지 현재 배포 페이지인지 확실하지 않으므로 버튼을 눌러 직접 선택

자동 후보는 편의를 위한 초안일 뿐이며, 실제 원본과 배포 파일이 맞는지는 제작자가 확인해야 합니다.

---

# 새 확프 등록 흐름

1. 실제 파일을 `scripts/example.user.js`에 넣습니다.
2. `START_ADMIN.bat`을 실행합니다.
3. 파일을 선택하고 **기계 분석**을 누릅니다.
4. 메타데이터 URL 후보에서 설치 URL·원본 링크를 필요한 칸에 넣습니다.
5. 필요하면 AI 자동 정리를 실행합니다.
6. 이름·설명·지원 환경·성능·관계·원본·이미지 정보를 검토합니다.
7. **등록하고 원본 바로 받기**를 누릅니다.
8. 내려받은 `catalog.source.json`으로 `data/catalog.source.json`을 교체합니다.
9. 새 `.user.js` 파일과 JSON을 GitHub에 커밋·Push합니다.

보통 새 확프 한 개를 추가할 때 바뀌는 파일은 두 개입니다.

```text
scripts/example.user.js
data/catalog.source.json
```

설명이나 원본 링크만 고치면 `data/catalog.source.json`만 바뀔 수 있습니다.

## 기존 확프 업데이트

1. `scripts/`의 기존 파일을 새 버전으로 교체합니다.
2. 관리자에서 새 코드를 분석합니다.
3. ID·namespace·이름으로 제안된 기존 항목을 확인합니다.
4. 기존 항목을 선택하고 업데이트합니다.
5. 내려받은 `catalog.source.json`을 교체한 뒤 커밋합니다.

기존 설명·관계·원본 링크·소개 이미지는 빈 초안으로 덮어쓰지 않고 가능한 한 보존합니다.

---

# 사이트 설정

`data/site.json`:

```json
{
  "schemaVersion": 1,
  "title": "크랙 확프 보관소",
  "issueNewUrl": "",
  "repositoryUrl": "",
  "staleAfterDays": 120,
  "heroMedia": {
    "enabled": false,
    "imageUrl": "",
    "alt": "",
    "creditUrl": "",
    "creditLabel": ""
  }
}
```

관리자 하단의 **사이트 표시 설정**에서 수정하고 `site.json`을 다운로드할 수 있습니다.

---

# 자동 검사와 배포

Node.js 22 기준:

```bash
npm test
npm run validate
npm run build
```

외부 npm 패키지를 사용하지 않으므로 설치 단계가 필요하지 않습니다.

`npm run build`는 `dist/`를 새로 만들며 공개 파일만 복사합니다.

배포본에서 제외되는 항목:

- `admin.html`
- `css/admin.css`
- `js/admin.js`
- `js/extract.js`
- AI 분석용 관리자 지침
- `catalog.source.json`
- JSON Schema
- `preview.html`과 가짜 미리보기 데이터

## GitHub Pages

1. ZIP을 압축 해제한 뒤, 압축 해제된 폴더를 VS Code 또는 GitHub Desktop으로 엽니다.
2. GitHub 웹 업로드로 폴더를 하나씩 넣지 말고 Git으로 **Commit & Push** 합니다.
3. `.gitignore`가 관리자·미리보기 전용 파일을 자동으로 제외합니다.
4. 기본 브랜치를 `main`으로 둡니다.
5. **Settings → Pages → Source → GitHub Actions**를 선택합니다.
6. `main`에 Push하면 `.github/workflows/deploy.yml`이 검증·빌드·배포를 실행합니다.

```text
scripts/*.user.js + data/catalog.source.json
                    ↓
              Actions 검증
                    ↓
       catalog.json·fallback 자동 생성
                    ↓
             GitHub Pages 배포
```

관리자가 다운로드한 JSON을 GitHub Desktop의 복제 폴더에 덮어쓴 뒤 **Commit to main → Push origin** 하면 됩니다. GitHub 토큰을 HTML이나 설정 파일에 넣지 않습니다.

---

# 주요 파일

```text
.
├─ index.html                         공개 화면
├─ preview.html                       로컬 디자인 샘플
├─ admin.html                         로컬 제작자 화면
├─ START_ADMIN.bat                    관리자 실행
├─ START_PREVIEW.bat                  샘플 화면 실행
├─ scripts/                           실제 독립 .user.js
├─ data/
│  ├─ catalog.source.json             사람이 관리하는 유일한 공식 원본
│  ├─ presets.json                    API 없는 추천 세트
│  ├─ site.json                       사이트 표시 설정
│  ├─ catalog.schema.json             검증 규칙
│  ├─ ai-analysis-instructions.md     관리자 AI 분석 지침
│  └─ ai-recommendation-instructions.md 공개 AI 추천 지침
├─ preview-data/                      공개 배포에서 제외되는 가짜 샘플
├─ preview-assets/                    샘플용 자산
├─ js/
├─ css/
├─ tools/
└─ .github/workflows/deploy.yml
```

## 보안 메모

- API 키·Firebase 설정을 소스 파일에 하드코딩하지 않습니다.
- 관리자와 공개 AI 설정은 현재 탭 메모리에서만 사용합니다.
- AI가 만든 설명은 초안입니다. 지원 환경·성능·충돌·원본·이미지 권리는 사람이 확인합니다.
- 설치 버튼은 카탈로그에서 검증된 URL만 사용합니다.


## AI 도우미 문구 원칙

- `모아`가 실제로 말하는 추천 문장에만 슴다체를 사용합니다.
- 버튼, 설정, 상태, 오류, 설치 안내 등 사이트 UI는 표준 한국어를 사용합니다.
- 도우미 이름과 역할은 `data/site.json` 또는 로컬 관리자 화면에서 바꿀 수 있습니다.
- 오른쪽 아래 도우미 버튼은 AI 창을 열면 숨고, 창을 닫으면 다시 나타납니다.
- `START_ADMIN.bat`과 `START_PREVIEW.bat`은 Windows 로컬 확인을 위한 선택 도구이며 GitHub Pages 배포에는 필요하지 않습니다.
