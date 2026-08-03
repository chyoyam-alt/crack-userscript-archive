window.CRACK_CATALOG_FALLBACK = {
  "schemaVersion": 1,
  "generatedAt": "2026-08-03T05:44:58.621Z",
  "sampleData": false,
  "extensions": [
    {
      "id": "crack-composer-expander",
      "status": "active",
      "name": "↗️ Crack Composer Expander (채팅창 펼치기)",
      "summary": "크랙 채팅창의 입력란이 길어질 때 전체 펼치기 및 접기 기능을 제공합니다.",
      "description": "채팅 입력창에 텍스트 내용이 넘치면 입력란 좌측 상단에 펼치기/접기 토글 버튼이 나타납니다. 버튼을 클릭하면 입력창이 화면 세로 크기의 최대 82%까지 넓게 확장되어 긴 글을 쓰거나 수정하기 편해집니다. 메시지를 전송하여 입력창이 비워지면 자동으로 원래 크기로 복원됩니다. 특정 외부 플러그인(라디오존데) 팝업과의 UI 충돌을 방지하는 화면 고정 및 위치 동기화 로직도 포함되어 있습니다.",
      "categories": [],
      "features": [],
      "aliases": [],
      "tags": [
        "채팅창",
        "입력창",
        "크기조절",
        "UI개선"
      ],
      "platforms": {
        "pc": "yes",
        "mobile": "yes",
        "evidence": {
          "pc": "reported",
          "mobile": "reported"
        }
      },
      "performance": {
        "pc": "unknown",
        "mobile": "unknown",
        "evidence": "unknown"
      },
      "relations": {
        "conflictsWith": [
          "crack-mobile-utility"
        ],
        "requires": [],
        "goodWith": []
      },
      "version": "1.5.0",
      "installUrl": "https://gist.github.com/chyoyam-alt/4965cf5e74f2931d26519a93daa5c30a/raw/ComposerExpander.user.js",
      "file": "",
      "namespace": "crack-composer-resizer",
      "match": [
        "*://crack.wrtn.ai/*"
      ],
      "grant": [
        "none"
      ],
      "runAt": "document-idle",
      "lastTestedAt": "2026-08-03",
      "updatedAt": "2026-08-03T02:20:04.457Z",
      "history": [],
      "creatorNote": "",
      "introductionPage": {
        "url": "",
        "label": "소개 페이지"
      },
      "originalSource": {
        "url": "",
        "label": "",
        "author": "묘기",
        "note": ""
      },
      "recommendation": {
        "enabled": false,
        "label": "추천",
        "priority": 0
      },
      "presentation": {
        "coverImageUrl": "",
        "coverImageAlt": "",
        "coverImageCreditUrl": "",
        "coverImageCreditLabel": ""
      }
    },
    {
      "id": "crack-korean-auto-correct",
      "status": "active",
      "name": "✍️ Crack Korean Auto Correct (한글 자동 교정)",
      "summary": "채팅 입력창 한글 오타 및 맞춤법 자동 교정",
      "description": "채팅 입력창에서 한글 오타, 맞춤법, 띄어쓰기를 실시간으로 교정하는 스크립트입니다. 두벌식 자판의 흔한 입력 실수를 완성된 음절로 복원해주며, 문맥에 맞게 어절 단위로 교정을 수행합니다. 자체 설정 UI를 통해 교정 규칙, 지연 시간, 예외 단어 등을 사용자가 직접 관리할 수 있습니다. 채팅을 입력하고 어절을 마칠 때나 전송하기 직전에 자동으로 적용되어 빠르고 안전하게 입력할 수 있습니다.",
      "categories": [],
      "features": [],
      "aliases": [],
      "tags": [
        "맞춤법",
        "오타교정",
        "입력보조"
      ],
      "platforms": {
        "pc": "yes",
        "mobile": "unknown",
        "evidence": {
          "pc": "verified",
          "mobile": "verified"
        }
      },
      "performance": {
        "pc": "light",
        "mobile": "light",
        "evidence": "verified"
      },
      "relations": {
        "conflictsWith": [],
        "requires": [],
        "goodWith": []
      },
      "version": "0.6.0",
      "installUrl": "https://gist.github.com/chyoyam-alt/01231d2eda953bc3ab9847c42fb1a75d/raw/AutoCorrect.user.js",
      "file": "",
      "namespace": "https://crack.wrtn.ai/",
      "match": [
        "https://crack.wrtn.ai/stories/*/episodes/*"
      ],
      "grant": [
        "GM_getValue",
        "GM_setValue",
        "GM_addStyle"
      ],
      "runAt": "document-idle",
      "lastTestedAt": "2026-08-03",
      "updatedAt": "2026-08-03T02:21:10.721Z",
      "history": [],
      "creatorNote": "",
      "introductionPage": {
        "url": "",
        "label": "소개 페이지"
      },
      "originalSource": {
        "url": "",
        "label": "",
        "author": "",
        "note": ""
      },
      "recommendation": {
        "enabled": false,
        "label": "추천",
        "priority": 0
      },
      "presentation": {
        "coverImageUrl": "https://gall.dcinside.com/mini/wrtnw/234766",
        "coverImageAlt": "",
        "coverImageCreditUrl": "",
        "coverImageCreditLabel": ""
      }
    },
    {
      "id": "crack-input-wrapper-popup",
      "status": "active",
      "name": "✏️ Crack Input Wrapper Popup (크랙 입력 감싸기 팝업)",
      "summary": "드래그한 텍스트를 다양한 기호로 감싸주는 팝업 도구입니다.",
      "description": "채팅 입력창이나 수정창에서 텍스트를 드래그하면 팝업 툴바가 나타납니다. 툴바의 버튼을 클릭해 선택한 텍스트를 따옴표, 괄호, 마크다운 기호 등으로 손쉽게 감쌀 수 있습니다. 채팅창 툴바의 설정 버튼을 통해 새로운 감싸기 기호를 추가하거나 순서를 변경할 수 있습니다. Alt 키와 숫자 또는 백틱(`)을 조합한 단축키 기능도 지원하여 더욱 빠른 텍스트 편집이 가능합니다.",
      "categories": [],
      "features": [],
      "aliases": [],
      "tags": [
        "텍스트감싸기",
        "마크다운",
        "팝업툴바",
        "에디터",
        "단축키"
      ],
      "platforms": {
        "pc": "yes",
        "mobile": "yes",
        "evidence": {
          "pc": "reported",
          "mobile": "reported"
        }
      },
      "performance": {
        "pc": "unknown",
        "mobile": "unknown",
        "evidence": "unknown"
      },
      "relations": {
        "conflictsWith": [],
        "requires": [],
        "goodWith": []
      },
      "version": "0.1.8",
      "installUrl": "https://gist.github.com/chyoyam-alt/fda78e2b7d4970c3522ec6b084e7d105/raw/InputWrapperPopup.user.js",
      "file": "",
      "namespace": "crack-input-wrapper-popup",
      "match": [
        "https://crack.wrtn.ai/*",
        "https://*.crack.wrtn.ai/*"
      ],
      "grant": [
        "GM_addStyle"
      ],
      "runAt": "document-idle",
      "lastTestedAt": "",
      "updatedAt": "2026-07-21T09:47:06.036Z",
      "history": [],
      "creatorNote": "",
      "introductionPage": {
        "url": "",
        "label": "소개 페이지"
      },
      "originalSource": {
        "url": "https://gall.dcinside.com/mini/wrtnw/177972",
        "label": "",
        "author": "뤼갤러",
        "note": ""
      },
      "recommendation": {
        "enabled": false,
        "label": "추천",
        "priority": 0
      },
      "presentation": {
        "coverImageUrl": "",
        "coverImageAlt": "",
        "coverImageCreditUrl": "",
        "coverImageCreditLabel": ""
      }
    },
    {
      "id": "crack-muse-writer-ai",
      "status": "active",
      "name": "✨ Crack Muse Writer (AI 답변 커스텀)",
      "summary": "USER의 입력을 다듬어주는 AI 집필 보조 도구. 보라색 버튼을 길게 누르면 메뉴창이 뜹니다.",
      "description": "AI를 활용해 답변의 문맥과 서사를 보조하는 스크립트입니다. Gemini 및 DeepSeek API를 연동하여 동작하며, 단기·장기 기억과 에리 로어 데이터를 읽기 전용으로 참고합니다. 분위기, 문체, 분량, 서사 나침반 등을 설정해 원하는 연출을 이끌어낼 수 있습니다. 사용을 위해 외부 API 키 등록이 필요하며, 실시간 토큰 사용량과 예상 비용을 UI로 제공합니다.",
      "categories": [],
      "features": [],
      "aliases": [
        "문장 부풀리기",
        "답변 커스텀",
        "답변 부풀리기"
      ],
      "tags": [
        "AI",
        "챗봇",
        "집필보조",
        "프롬프트"
      ],
      "platforms": {
        "pc": "yes",
        "mobile": "yes",
        "evidence": {
          "pc": "verified",
          "mobile": "verified"
        }
      },
      "performance": {
        "pc": "light",
        "mobile": "light",
        "evidence": "verified"
      },
      "relations": {
        "conflictsWith": [],
        "requires": [],
        "goodWith": []
      },
      "version": "5.3.0",
      "installUrl": "https://gist.github.com/chyoyam-alt/a6a3d92093deae554af123e9fdf68883/raw/MuseWriter.user.js",
      "file": "",
      "namespace": "muse writer",
      "match": [
        "https://crack.wrtn.ai/*"
      ],
      "grant": [
        "GM_addStyle",
        "GM_setValue",
        "GM_getValue",
        "GM_deleteValue",
        "GM_xmlhttpRequest",
        "unsafeWindow"
      ],
      "runAt": "",
      "lastTestedAt": "2026-08-03",
      "updatedAt": "2026-08-03T02:24:33.762Z",
      "history": [],
      "creatorNote": "",
      "introductionPage": {
        "url": "",
        "label": "소개 페이지"
      },
      "originalSource": {
        "url": "https://gall.dcinside.com/mini/wrtnw/185144",
        "label": "",
        "author": "ㅇㅇ",
        "note": ""
      },
      "recommendation": {
        "enabled": false,
        "label": "추천",
        "priority": 0
      },
      "presentation": {
        "coverImageUrl": "https://gall.dcinside.com/mini/wrtnw/236158",
        "coverImageAlt": "",
        "coverImageCreditUrl": "",
        "coverImageCreditLabel": ""
      }
    },
    {
      "id": "crack-ambient-weather-fx",
      "status": "active",
      "name": "🌧️ Crack Ambient Weather FX (시간대 배경 & 날씨 효과)",
      "summary": "채팅방에 다양한 날씨와 시간대 배경 효과를 추가합니다.",
      "description": "채팅방에서 비, 눈, 벚꽃, 은하수 등 다양한 화면 이펙트와 시간대별 배경을 제공하는 스크립트입니다. 최신 로그의 사용자 키워드를 감지하여 상황에 맞는 배경과 날씨 효과로 자동 전환하는 기능을 지원합니다. 통합 사운드 메뉴를 통해 빗소리, 풀벌레, 파도 소리 등 다채로운 환경음을 제어할 수 있습니다. 단, 모바일과 같은 비PC 환경에서는 성능을 위해 은하수 및 수중 효과 렌더링이 차단됩니다.",
      "categories": [],
      "features": [],
      "aliases": [
        "날씨",
        "시간대",
        "시간대 배경",
        "날씨 확프"
      ],
      "tags": [
        "배경효과",
        "날씨",
        "사운드",
        "자동전환"
      ],
      "platforms": {
        "pc": "yes",
        "mobile": "yes",
        "evidence": {
          "pc": "verified",
          "mobile": "verified"
        }
      },
      "performance": {
        "pc": "heavy",
        "mobile": "heavy",
        "evidence": "verified"
      },
      "relations": {
        "conflictsWith": [],
        "requires": [],
        "goodWith": []
      },
      "version": "2.5.2",
      "installUrl": "https://gist.github.com/chyoyam-alt/e68afc01c22bc0e734b586244086714c/raw/AmbientWeatherFX.user.js",
      "file": "",
      "namespace": "crack-ambient-weather-fx",
      "match": [
        "https://crack.wrtn.ai/*"
      ],
      "grant": [
        "GM_xmlhttpRequest",
        "unsafeWindow"
      ],
      "runAt": "document-idle",
      "lastTestedAt": "2026-08-03",
      "updatedAt": "2026-08-03T02:25:44.399Z",
      "history": [],
      "creatorNote": "",
      "introductionPage": {
        "url": "",
        "label": "소개 페이지"
      },
      "originalSource": {
        "url": "",
        "label": "",
        "author": "",
        "note": ""
      },
      "recommendation": {
        "enabled": false,
        "label": "추천",
        "priority": 0
      },
      "presentation": {
        "coverImageUrl": "https://gall.dcinside.com/mini/wrtnw/239032",
        "coverImageAlt": "",
        "coverImageCreditUrl": "",
        "coverImageCreditLabel": ""
      }
    },
    {
      "id": "crack-answer-cost",
      "status": "active",
      "name": "🍪 Crack Answer Cost (답변별 크래커)",
      "summary": "뤼튼 크랙에서 답변별 실제 크래커 소모량을 하단에 표시합니다.",
      "description": "뤼튼 크랙 채팅 페이지에서 각 답변을 생성할 때 실제로 소모된 크래커 개수를 측정하여 답변 하단에 배지로 표시합니다. 리롤(다시 생성)한 답변의 소모량도 개별적으로 추적하며, 답변 삭제 시 해당 기록도 함께 정리됩니다. 스크립트 설치 이후에 생성된 답변만 측정 가능하며, 실제 차감 내역을 기반으로 정확한 소모량을 보여줍니다.",
      "categories": [],
      "features": [],
      "aliases": [
        "크래커",
        "답변별 크래커"
      ],
      "tags": [
        "답변별 크래커",
        "소모량",
        "비용 표시"
      ],
      "platforms": {
        "pc": "yes",
        "mobile": "yes",
        "evidence": {
          "pc": "reported",
          "mobile": "reported"
        }
      },
      "performance": {
        "pc": "light",
        "mobile": "light",
        "evidence": "verified"
      },
      "relations": {
        "conflictsWith": [
          "crack-mobile-utility"
        ],
        "requires": [],
        "goodWith": []
      },
      "version": "1.0.0",
      "installUrl": "https://gist.github.com/chyoyam-alt/7a3cfea04d68525f1cdc6ccfe00e5665/raw/AnswerCost.user.js",
      "file": "",
      "namespace": "crack-answer-cost",
      "match": [
        "*://crack.wrtn.ai/stories/*/episodes/*"
      ],
      "grant": [
        "unsafeWindow"
      ],
      "runAt": "document-start",
      "lastTestedAt": "2026-08-03",
      "updatedAt": "2026-08-03T02:29:33.430Z",
      "history": [],
      "creatorNote": "",
      "introductionPage": {
        "url": "",
        "label": "소개 페이지"
      },
      "originalSource": {
        "url": "",
        "label": "",
        "author": "",
        "note": ""
      },
      "recommendation": {
        "enabled": false,
        "label": "추천",
        "priority": 0
      },
      "presentation": {
        "coverImageUrl": "https://gall.dcinside.com/mini/wrtnw/241272",
        "coverImageAlt": "",
        "coverImageCreditUrl": "",
        "coverImageCreditLabel": ""
      }
    },
    {
      "id": "crack-scene-painter",
      "status": "active",
      "name": "🎨 Crack Scene Painter",
      "summary": "로그를 읽고 그에 맞는 NAI용 태그를 생성하여 삽화를 삽입합니다.",
      "description": "API로 로그를 읽고 그에 맞는 NAI용 태그를 생성하여 삽화를 삽입합니다. 캐릭터 및 PC 모드 프롬프트 태그를 프리셋으로 생성하고 저장할 수 있습니다. SD 방식의 태그 가중치를 NovelAI 방식으로 자동 변환하여 적용합니다. Google Gemini API 및 Firebase 연동을 지원하며, 토큰 사용량 및 예상 요금 요약 UI를 제공합니다. 또한 로컬 스토리지 용량 절약을 위해 JSON 데이터를 자동으로 압축하여 저장합니다.",
      "categories": [],
      "features": [],
      "aliases": [
        "삽화",
        "NAI"
      ],
      "tags": [
        "NovelAI",
        "프롬프트",
        "프리셋",
        "Gemini",
        "삽화"
      ],
      "platforms": {
        "pc": "yes",
        "mobile": "no",
        "evidence": {
          "pc": "verified",
          "mobile": "verified"
        }
      },
      "performance": {
        "pc": "medium",
        "mobile": "unknown",
        "evidence": "verified"
      },
      "relations": {
        "conflictsWith": [],
        "requires": [],
        "goodWith": []
      },
      "version": "4.24.0",
      "installUrl": "https://gist.github.com/chyoyam-alt/860042770f149c7af9828b35407ccc93/raw/crack_scene_painter_loader.user.js",
      "file": "",
      "namespace": "crack-scene-painter",
      "match": [
        "https://crack.wrtn.ai/*"
      ],
      "grant": [
        "GM_xmlhttpRequest"
      ],
      "runAt": "document-idle",
      "lastTestedAt": "2026-08-03",
      "updatedAt": "2026-08-03T02:28:08.046Z",
      "history": [],
      "creatorNote": "",
      "introductionPage": {
        "url": "",
        "label": "소개 페이지"
      },
      "originalSource": {
        "url": "",
        "label": "",
        "author": "",
        "note": ""
      },
      "recommendation": {
        "enabled": false,
        "label": "추천",
        "priority": 0
      },
      "presentation": {
        "coverImageUrl": "",
        "coverImageAlt": "",
        "coverImageCreditUrl": "",
        "coverImageCreditLabel": ""
      }
    },
    {
      "id": "crack-scene-painter-mobile",
      "status": "active",
      "name": "🎨 Crack Scene Painter Mobile",
      "summary": "크랙 모바일 최적화 NAI 삽화",
      "description": "크랙에서 작동하는 모바일/태블릿 친화적인 삽화 스크립트입니다. 로그를 읽고 로그에 맞는 태그를 조합 후 NAI로 이미지를 생성하여 삽입합니다. Gemini API(Firebase 및 Vertex AI)를 연결하여 프롬프트를 생성하고 토큰 사용량 및 비용을 추적할 수 있습니다. 단보루 태그 검색, 태그 프리셋 관리, 가중치 문법 자동 변환 기능을 지원하며, 로컬스토리지 JSON 압축 저장을 통해 저장소 용량을 효율적으로 관리합니다.",
      "categories": [],
      "features": [],
      "aliases": [
        "모바일 삽화",
        "삽화",
        "모바일"
      ],
      "tags": [
        "뤼튼",
        "프롬프트",
        "Gemini",
        "태그관리",
        "모바일"
      ],
      "platforms": {
        "pc": "no",
        "mobile": "yes",
        "evidence": {
          "pc": "verified",
          "mobile": "verified"
        }
      },
      "performance": {
        "pc": "unknown",
        "mobile": "medium",
        "evidence": "verified"
      },
      "relations": {
        "conflictsWith": [],
        "requires": [],
        "goodWith": []
      },
      "version": "4.3.5",
      "installUrl": "https://gist.github.com/chyoyam-alt/5d2d67919df0fd97fad5c274026673d5/raw/CSPM.user.js",
      "file": "",
      "namespace": "crack-scene-painter- NAI V4.5 Character Slots Full",
      "match": [
        "https://crack.wrtn.ai/*"
      ],
      "grant": [
        "GM_xmlhttpRequest",
        "GM.xmlHttpRequest"
      ],
      "runAt": "document-idle",
      "lastTestedAt": "2026-08-03",
      "updatedAt": "2026-08-03T02:29:14.424Z",
      "history": [],
      "creatorNote": "",
      "introductionPage": {
        "url": "",
        "label": "소개 페이지"
      },
      "originalSource": {
        "url": "",
        "label": "",
        "author": "",
        "note": ""
      },
      "recommendation": {
        "enabled": false,
        "label": "추천",
        "priority": 0
      },
      "presentation": {
        "coverImageUrl": "",
        "coverImageAlt": "",
        "coverImageCreditUrl": "",
        "coverImageCreditLabel": ""
      }
    },
    {
      "id": "crack-ranking-cleaner",
      "status": "active",
      "name": "🏆 Crack Ranking Cleaner (랭킹 클리너)",
      "summary": "뤼튼 Crack 사이트의 사용자 랭킹 섹션과 팝업을 제거합니다.",
      "description": "페이지 내에 표시되는 '사용자 랭킹'을 자동으로 찾아 숨깁니다. 랭킹 섹션 근처의 불필요한 레이아웃 구분선도 함께 정리하여 화면을 깔끔하게 유지합니다. 랭킹의 '전체보기' 버튼 클릭을 사전에 차단하고, 화면에 나타나는 랭킹 관련 팝업창(모달)도 감지하여 즉시 제거합니다. 별도의 설정 없이 스크립트를 설치하기만 하면 백그라운드에서 자동으로 동작합니다.",
      "categories": [],
      "features": [],
      "aliases": [
        "랭킹",
        "숨기기"
      ],
      "tags": [
        "랭킹 숨기기",
        "UI 개선",
        "팝업 차단"
      ],
      "platforms": {
        "pc": "yes",
        "mobile": "yes",
        "evidence": {
          "pc": "verified",
          "mobile": "verified"
        }
      },
      "performance": {
        "pc": "light",
        "mobile": "light",
        "evidence": "verified"
      },
      "relations": {
        "conflictsWith": [],
        "requires": [],
        "goodWith": []
      },
      "version": "0.1.4",
      "installUrl": "https://gist.github.com/chyoyam-alt/0131998e50ef7e998b78d61aa0121ab7/raw/RankingCleaner.user.js",
      "file": "",
      "namespace": "crack-ranking-cleaner",
      "match": [
        "https://crack.wrtn.ai/*"
      ],
      "grant": [
        "none"
      ],
      "runAt": "document-start",
      "lastTestedAt": "2026-08-03",
      "updatedAt": "2026-08-03T02:30:41.833Z",
      "history": [],
      "creatorNote": "",
      "introductionPage": {
        "url": "",
        "label": "소개 페이지"
      },
      "originalSource": {
        "url": "",
        "label": "",
        "author": "",
        "note": ""
      },
      "recommendation": {
        "enabled": false,
        "label": "추천",
        "priority": 0
      },
      "presentation": {
        "coverImageUrl": "https://gall.dcinside.com/mini/wrtnw/230968",
        "coverImageAlt": "",
        "coverImageCreditUrl": "",
        "coverImageCreditLabel": ""
      }
    },
    {
      "id": "crack-draft-previewer",
      "status": "active",
      "name": "👁️ Crack Draft Previewer (크랙 전송 미리보기)",
      "summary": "채팅 입력창의 마크다운 내용을 전송 전에 말풍선 형태로 미리 보여줍니다.",
      "description": "채팅창에 작성 중인 마크다운 텍스트를 전송 전에 확인할 수 있는 미리보기 패널을 추가합니다. 전송 버튼 옆에 생성되는 눈 모양 버튼을 클릭하여 패널을 열고 닫을 수 있습니다. 패널은 드래그하여 이동하거나 크기를 조절할 수 있으며, 텍스트 입력 시 실시간으로 글자 수와 렌더링된 결과를 표시합니다. 렌더링된 미리보기의 HTML 코드나 내부 코드 블록의 텍스트를 복사하는 기능도 지원합니다.",
      "categories": [],
      "features": [],
      "aliases": [],
      "tags": [
        "미리보기",
        "마크다운",
        "채팅",
        "편의성",
        "UI개선"
      ],
      "platforms": {
        "pc": "yes",
        "mobile": "yes",
        "evidence": {
          "pc": "verified",
          "mobile": "verified"
        }
      },
      "performance": {
        "pc": "light",
        "mobile": "light",
        "evidence": "verified"
      },
      "relations": {
        "conflictsWith": [],
        "requires": [],
        "goodWith": []
      },
      "version": "0.1.8",
      "installUrl": "https://gist.github.com/chyoyam-alt/e62b51ec1c94e2e0c50388f7dd592b36/raw/DraftPreviewer.user.js",
      "file": "",
      "namespace": "http://tampermonkey.net/",
      "match": [
        "https://crack.wrtn.ai/*"
      ],
      "grant": [
        "none"
      ],
      "runAt": "document-idle",
      "lastTestedAt": "2026-08-03",
      "updatedAt": "2026-08-03T02:31:22.252Z",
      "history": [],
      "creatorNote": "",
      "introductionPage": {
        "url": "",
        "label": "소개 페이지"
      },
      "originalSource": {
        "url": "",
        "label": "",
        "author": "",
        "note": ""
      },
      "recommendation": {
        "enabled": false,
        "label": "추천",
        "priority": 0
      },
      "presentation": {
        "coverImageUrl": "https://gall.dcinside.com/mini/wrtnw/225974",
        "coverImageAlt": "",
        "coverImageCreditUrl": "",
        "coverImageCreditLabel": ""
      }
    },
    {
      "id": "crack-info-game-hud-rpg-hud",
      "status": "active",
      "name": "👾 Crack INFO Game HUD (미니 RPG HUD)",
      "summary": "크랙 뤼튼 대화를 분석해 게임식 HUD와 로그로 보여주는 스크립트",
      "description": "채팅 화면에 미니 RPG 스타일의 게임 HUD와 상태창을 추가합니다. Gemini, DeepSeek 등의 외부 AI API를 연동해 대화를 분석하고, 게임 알림, 성좌물, 인터넷 커뮤니티 등 다양한 스타일의 상황 로그를 생성합니다. 채팅을 통해 가상의 펫 경험치를 올리고 다이어리를 확인하는 기능을 포함합니다. 또한 API 토큰 사용량 확인 및 클라우드 데이터 세이브 기능을 제공하며, 사용 시 직접 외부 API 키나 Firebase 설정을 입력해야 합니다.",
      "categories": [],
      "features": [],
      "aliases": [],
      "tags": [
        "채팅 확장",
        "UI 테마",
        "로그 생성",
        "API 연동",
        "미니게임"
      ],
      "platforms": {
        "pc": "yes",
        "mobile": "yes",
        "evidence": {
          "pc": "verified",
          "mobile": "verified"
        }
      },
      "performance": {
        "pc": "light",
        "mobile": "light",
        "evidence": "verified"
      },
      "relations": {
        "conflictsWith": [],
        "requires": [],
        "goodWith": []
      },
      "version": "2.6.3",
      "installUrl": "https://gist.github.com/chyoyam-alt/e7370c75740314a4a34e4c1d2d4ed9d2/raw/INFOGameHUD.user.js",
      "file": "",
      "namespace": "crack-info-game-hud-clean",
      "match": [
        "https://crack.wrtn.ai/*"
      ],
      "grant": [
        "GM_xmlhttpRequest",
        "GM_getValue",
        "GM_setValue",
        "GM_deleteValue",
        "unsafeWindow"
      ],
      "runAt": "document-idle",
      "lastTestedAt": "2026-08-03",
      "updatedAt": "2026-08-03T02:31:59.505Z",
      "history": [],
      "creatorNote": "",
      "introductionPage": {
        "url": "",
        "label": "소개 페이지"
      },
      "originalSource": {
        "url": "",
        "label": "",
        "author": "",
        "note": ""
      },
      "recommendation": {
        "enabled": false,
        "label": "추천",
        "priority": 0
      },
      "presentation": {
        "coverImageUrl": "",
        "coverImageAlt": "",
        "coverImageCreditUrl": "",
        "coverImageCreditLabel": ""
      }
    },
    {
      "id": "crack-likes-library",
      "status": "active",
      "name": "💗 Crack Likes Library (좋아요 보관함)",
      "summary": "뤼튼 크랙의 좋아요 목록을 통합해 검색, 정렬, 폴더 관리 기능을 제공합니다.",
      "description": "스토리와 캐릭터 좋아요 목록을 한곳에 수집하여 관리하는 스크립트입니다. 제목, 제작자, 태그 등으로 검색하고, 제목이나 최근 수정순 등 다양한 기준으로 정렬할 수 있습니다. 카드, 리스트, 제작자별 보기 방식을 지원하며 직접 폴더를 만들어 항목을 분류할 수 있습니다. 작품을 길게 누르거나 우클릭해 폴더 분류창을 열 수 있고, PC에서는 스토리 기본 정보 팝업을 지원합니다.",
      "categories": [],
      "features": [],
      "aliases": [],
      "tags": [
        "좋아요",
        "보관함",
        "폴더",
        "검색",
        "정렬",
        "UI"
      ],
      "platforms": {
        "pc": "yes",
        "mobile": "yes",
        "evidence": {
          "pc": "verified",
          "mobile": "verified"
        }
      },
      "performance": {
        "pc": "light",
        "mobile": "light",
        "evidence": "verified"
      },
      "relations": {
        "conflictsWith": [],
        "requires": [],
        "goodWith": []
      },
      "version": "1.0.1",
      "installUrl": "https://gist.github.com/chyoyam-alt/7e0f818e9e5d3bf2950d2d1c279b1891/raw/likes-library.user.js",
      "file": "",
      "namespace": "crack-likes-library",
      "match": [
        "https://crack.wrtn.ai/*"
      ],
      "grant": [
        "unsafeWindow"
      ],
      "runAt": "document-start",
      "lastTestedAt": "2026-08-03",
      "updatedAt": "2026-08-03T02:32:30.737Z",
      "history": [],
      "creatorNote": "",
      "introductionPage": {
        "url": "",
        "label": "소개 페이지"
      },
      "originalSource": {
        "url": "",
        "label": "",
        "author": "",
        "note": ""
      },
      "recommendation": {
        "enabled": false,
        "label": "추천",
        "priority": 0
      },
      "presentation": {
        "coverImageUrl": "",
        "coverImageAlt": "",
        "coverImageCreditUrl": "",
        "coverImageCreditLabel": ""
      }
    },
    {
      "id": "crack-chat-model-stats",
      "status": "active",
      "name": "📊 Crack Chat Model Stats (채팅별 모델 통계)",
      "summary": "뤼튼 크랙 AI 채팅방별로 사용된 AI 모델 통계를 누적하여 화면에 보여줍니다.",
      "description": "각 채팅방마다 어떤 모델을 얼마나 사용했는지 리롤을 포함한 횟수를 집계하는 스크립트입니다. 모델 정보를 추출한 뒤, 화면의 '나의 크래커' 영역 아래에 모델별 아이콘과 사용 횟수를 띄워줍니다. 새롭게 발견된 모델은 자동으로 등록되며, 수집된 전체 데이터는 로컬 스토리지에 저장되어 방을 이동해도 통계가 유지됩니다.",
      "categories": [],
      "features": [],
      "aliases": [],
      "tags": [
        "AI모델",
        "통계",
        "채팅방"
      ],
      "platforms": {
        "pc": "yes",
        "mobile": "yes",
        "evidence": {
          "pc": "verified",
          "mobile": "verified"
        }
      },
      "performance": {
        "pc": "light",
        "mobile": "light",
        "evidence": "verified"
      },
      "relations": {
        "conflictsWith": [],
        "requires": [],
        "goodWith": []
      },
      "version": "2.0.1",
      "installUrl": "https://gist.github.com/chyoyam-alt/efa19fd1c79283d5d3dd5d3f3aa13152/raw/ModelStats.user.js",
      "file": "",
      "namespace": "crack-chat-model-stats",
      "match": [
        "https://crack.wrtn.ai/*"
      ],
      "grant": [
        "unsafeWindow"
      ],
      "runAt": "document-start",
      "lastTestedAt": "2026-08-03",
      "updatedAt": "2026-08-03T02:33:19.790Z",
      "history": [],
      "creatorNote": "",
      "introductionPage": {
        "url": "",
        "label": "소개 페이지"
      },
      "originalSource": {
        "url": "",
        "label": "",
        "author": "",
        "note": ""
      },
      "recommendation": {
        "enabled": false,
        "label": "추천",
        "priority": 0
      },
      "presentation": {
        "coverImageUrl": "",
        "coverImageAlt": "",
        "coverImageCreditUrl": "",
        "coverImageCreditLabel": ""
      }
    },
    {
      "id": "crack-chat-list-tuner",
      "status": "active",
      "name": "📑 Crack Chat List Tuner (크랙 채팅방 목록 튜너)",
      "summary": "채팅방 목록에 색상 지정, 통합 검색, 보관함 높이 조절 및 스마트 자동 정리 기능을 추가하는 스크립트입니다.",
      "description": "채팅창 목록을 편리하게 개조하여 메뉴에서 항목을 원하는 색으로 강조하고, 긴 이름은 마우스 오버 시 자동으로 스크롤되게 합니다. 보관함 상단에 통합 검색창을 추가해 전체 채팅을 쉽게 찾을 수 있으며, 보관함 영역의 스크롤 높이를 조절할 수 있습니다. 또한, 전체 목록과 보관함을 대조하여 단일 채팅까지 동명 보관함에 합치는 스마트 자동 정리 기능을 제공합니다.",
      "categories": [
        "UI",
        "Productivity"
      ],
      "features": [
        "채팅방 메뉴 색상 팔레트 제공",
        "긴 채팅방 이름 마우스 오버 시 자동 스크롤",
        "보관함 상단 통합 검색창 추가",
        "보관함 영역 스크롤 높이 조절 및 저장",
        "스마트 자동 정리 기능 (동명 보관함 병합)",
        "채팅 목록 및 보관함 채팅 개수 표시"
      ],
      "aliases": [
        "채팅방 목록",
        "UI",
        "검색",
        "보관함",
        "자동 정리"
      ],
      "tags": [
        "채팅방",
        "검색",
        "색상",
        "UI개선",
        "자동정리"
      ],
      "platforms": {
        "pc": "yes",
        "mobile": "unknown",
        "evidence": {
          "pc": "verified",
          "mobile": "unknown"
        }
      },
      "performance": {
        "pc": "medium",
        "mobile": "unknown",
        "evidence": "verified"
      },
      "relations": {
        "conflictsWith": [],
        "requires": [],
        "goodWith": []
      },
      "version": "1.1.2",
      "installUrl": "https://gist.github.com/chyoyam-alt/4a9b682d5f64cd0e9ca76f5f5a85f6c5/raw/ChatListTuner.user.js",
      "file": "",
      "namespace": "chat list tuner",
      "match": [
        "*://crack.wrtn.ai/*"
      ],
      "grant": [
        "none"
      ],
      "runAt": "document-start",
      "lastTestedAt": "2026-08-03",
      "updatedAt": "2026-08-03T04:07:57.166Z",
      "history": [],
      "creatorNote": "전체·보관함 목록을 대조해 단일 채팅까지 동명 보관함에 합치는 스마트 자동 정리를 제공합니다.",
      "introductionPage": {
        "url": "https://gall.dcinside.com/mini/board/view/?id=wrtnw&no=246592",
        "label": "[확프] 크랙 채팅 목록 튜너 | 검색·색상·보관함 정리"
      },
      "originalSource": {
        "url": "",
        "label": "",
        "author": "",
        "note": ""
      },
      "recommendation": {
        "enabled": false,
        "label": "추천",
        "priority": 0
      },
      "presentation": {
        "coverImageUrl": "",
        "coverImageAlt": "",
        "coverImageCreditUrl": "",
        "coverImageCreditLabel": ""
      }
    },
    {
      "id": "crack",
      "status": "active",
      "name": "📚 crack 요약 메모리 백업/복원",
      "summary": "뤼튼 크랙 요약 메모리의 JSON 백업/복원 및 클립보드 복사 지원",
      "description": "채팅방의 요약 메모리 창에 백업, 복원, 복사 버튼을 추가합니다. 장기, 단기, 관계, 목표 메모리를 JSON 파일로 한 번에 다운로드하여 백업할 수 있으며, 해당 파일을 불러와 장기기억으로 다시 복원할 수 있습니다. 또한 장기기억 항목을 원하는 대로 선택한 뒤, 마크다운 투명 주석 형식으로 변환하여 클립보드에 복사할 수 있습니다.",
      "categories": [],
      "features": [],
      "aliases": [],
      "tags": [
        "wrtn",
        "뤼튼",
        "백업",
        "복원",
        "클립보드"
      ],
      "platforms": {
        "pc": "yes",
        "mobile": "yes",
        "evidence": {
          "pc": "verified",
          "mobile": "verified"
        }
      },
      "performance": {
        "pc": "light",
        "mobile": "light",
        "evidence": "verified"
      },
      "relations": {
        "conflictsWith": [],
        "requires": [],
        "goodWith": []
      },
      "version": "1.41",
      "installUrl": "https://raw.githubusercontent.com/wrtn321/userjs/main/json_memory.user.js",
      "file": "",
      "namespace": "http://tampermonkey.net/",
      "match": [
        "https://crack.wrtn.ai/*"
      ],
      "grant": [
        "GM_xmlhttpRequest"
      ],
      "runAt": "",
      "lastTestedAt": "2026-08-03",
      "updatedAt": "2026-08-03T04:09:59.219Z",
      "history": [],
      "creatorNote": "",
      "introductionPage": {
        "url": "https://gall.dcinside.com/mini/board/view/?id=wrtnw&no=167143",
        "label": "장기기억 백업/복원 확프"
      },
      "originalSource": {
        "url": "",
        "label": "",
        "author": "",
        "note": ""
      },
      "recommendation": {
        "enabled": true,
        "label": "추천",
        "priority": 0
      },
      "presentation": {
        "coverImageUrl": "",
        "coverImageAlt": "",
        "coverImageCreditUrl": "",
        "coverImageCreditLabel": ""
      }
    },
    {
      "id": "crack-chat-template-manager",
      "status": "active",
      "name": "📜 Crack Chat Template Manager (채팅 템플릿 매니저)",
      "summary": "자주 사용하는 대사나 OOC 텍스트를 템플릿으로 저장하고 채팅창에 빠르게 입력할 수 있는 스크립트입니다.",
      "description": "채팅창에 추가되는 버튼을 통해 템플릿 패널을 열고, 저장된 문구를 클릭하여 입력창에 바로 삽입할 수 있습니다. 템플릿별로 퀵 버튼 아이콘을 지정하면 패널을 열지 않고도 채팅창 옆의 단축 버튼을 눌러 즉시 입력할 수 있습니다. 템플릿 검색, 상단 고정(핀) 기능 및 로컬 JSON 파일을 통한 데이터 백업과 복구 기능을 지원합니다.",
      "categories": [
        "편의성",
        "채팅"
      ],
      "features": [
        "대사 및 OOC 텍스트 템플릿 저장",
        "템플릿 클릭 시 채팅창에 즉시 삽입",
        "템플릿별 퀵 버튼 아이콘 지정 및 단축 버튼 제공",
        "템플릿 검색 기능",
        "템플릿 상단 고정(핀) 기능",
        "로컬 JSON 파일을 통한 데이터 백업 및 복구",
        "사이트 테마(다크/라이트) 동기화"
      ],
      "aliases": [],
      "tags": [
        "템플릿",
        "단축어",
        "매크로",
        "편의성",
        "채팅"
      ],
      "platforms": {
        "pc": "yes",
        "mobile": "yes",
        "evidence": {
          "pc": "verified",
          "mobile": "verified"
        }
      },
      "performance": {
        "pc": "light",
        "mobile": "light",
        "evidence": "verified"
      },
      "relations": {
        "conflictsWith": [],
        "requires": [],
        "goodWith": []
      },
      "version": "2.3.8",
      "installUrl": "https://gist.github.com/chyoyam-alt/e7e877f9f627e937d235aac821f920da/raw/crack-chat-template.user.js",
      "file": "",
      "namespace": "crack-chat-template",
      "match": [
        "https://crack.wrtn.ai/stories/*"
      ],
      "grant": [
        "none"
      ],
      "runAt": "document-idle",
      "lastTestedAt": "2026-08-03",
      "updatedAt": "2026-08-03T04:13:18.283Z",
      "history": [],
      "creatorNote": "순정 버튼 class 보존 및 가벼운 감지 구조를 적용했습니다.",
      "introductionPage": {
        "url": "",
        "label": "소개 페이지"
      },
      "originalSource": {
        "url": "",
        "label": "",
        "author": "",
        "note": ""
      },
      "recommendation": {
        "enabled": false,
        "label": "추천",
        "priority": 0
      },
      "presentation": {
        "coverImageUrl": "",
        "coverImageAlt": "",
        "coverImageCreditUrl": "",
        "coverImageCreditLabel": ""
      }
    },
    {
      "id": "AI-Summary",
      "status": "active",
      "name": "📝 크랙 요약 메모리 편집 & AI 자동 요약 추가",
      "summary": "AI API를 연동하여 채팅 로그를 자동으로 요약하고 장기기억을 일괄 편집할 수 있는 도구입니다.",
      "description": "Google, OpenAI, DeepSeek 등의 외부 AI API를 연결해 채팅 내역을 분석하고 장기기억 요약을 자동 생성합니다. 생성된 기억은 내장된 모달 에디터에서 일괄 수정하거나 삭제할 수 있으며, 커스텀 프롬프트 저장과 토큰 예상 비용 확인 기능을 제공합니다. 요약된 데이터는 TXT, JSON, Markdown 파일로 내보낼 수 있습니다.",
      "categories": [
        "도구",
        "AI 연동",
        "편의성"
      ],
      "features": [
        "다중 AI API 연동 (Google",
        "OpenAI",
        "DeepSeek",
        "Firebase)",
        "채팅 로그 기반 장기기억 자동 요약 및 2차 압축",
        "장기기억 일괄 편집 및 삭제",
        "커스텀 프롬프트 슬롯 저장 및 관리",
        "토큰 사용량 및 예상 비용 계산",
        "TXT",
        "JSON",
        "Markdown 파일 내보내기",
        "API 키 로컬 자동 저장"
      ],
      "aliases": [
        "크랙 요약 메모리 편집",
        "AI 자동 요약 추가",
        "장기 기억"
      ],
      "tags": [
        "장기기억",
        "자동요약",
        "에디터",
        "내보내기",
        "프롬프트"
      ],
      "platforms": {
        "pc": "yes",
        "mobile": "yes",
        "evidence": {
          "pc": "verified",
          "mobile": "verified"
        }
      },
      "performance": {
        "pc": "light",
        "mobile": "light",
        "evidence": "verified"
      },
      "relations": {
        "conflictsWith": [],
        "requires": [],
        "goodWith": []
      },
      "version": "2.2.3",
      "installUrl": "https://github.com/h-ap5/userscripts/raw/refs/heads/main/scripts/automemory.user.js",
      "file": "",
      "namespace": "https://crack.wrtn.ai/",
      "match": [
        "https://crack.wrtn.ai/*"
      ],
      "grant": [
        "none"
      ],
      "runAt": "document-idle",
      "lastTestedAt": "2026-08-03",
      "updatedAt": "2026-08-03T04:17:22.081Z",
      "history": [],
      "creatorNote": "외부 API 사용 시 토큰 요금이 발생할 수 있으므로 주의가 필요합니다.",
      "introductionPage": {
        "url": "https://github.com/h-ap5/userscripts/blob/main/PatchNotes/automemory.md",
        "label": "크랙 요약 메모리 편집 & AI 자동 요약"
      },
      "originalSource": {
        "url": "",
        "label": "",
        "author": "",
        "note": ""
      },
      "recommendation": {
        "enabled": true,
        "label": "추천",
        "priority": 0
      },
      "presentation": {
        "coverImageUrl": "",
        "coverImageAlt": "",
        "coverImageCreditUrl": "",
        "coverImageCreditLabel": ""
      }
    },
    {
      "id": "crack-radiosonde",
      "status": "active",
      "name": "📡 Crack Radiosonde (라디오존데)",
      "summary": "크랙 환경에서 실시간 IGX 모델 상태와 수치를 표시합니다.",
      "description": "채팅방에서 IGX 모델들의 실시간 응답 속도, TPS, 상태 점수를 보여주는 패널을 제공합니다. 텍스트 입력창 상단에 인라인으로 고정되며, 설정 버튼을 눌러 모니터링할 모델을 직접 선택할 수 있고, 사이트의 다크/라이트 테마에 자동으로 맞춰집니다. 1분 주기로 데이터가 자동 갱신되며, 마우스나 터치로 드래그하여 원하는 위치에 배치할 수 있습니다.",
      "categories": [
        "라디오존데",
        "서버상태"
      ],
      "features": [],
      "aliases": [
        "라디오존데",
        "라존데"
      ],
      "tags": [
        "IGX",
        "라디오존데",
        "모니터링",
        "유틸리티"
      ],
      "platforms": {
        "pc": "yes",
        "mobile": "yes",
        "evidence": {
          "pc": "verified",
          "mobile": "verified"
        }
      },
      "performance": {
        "pc": "light",
        "mobile": "light",
        "evidence": "verified"
      },
      "relations": {
        "conflictsWith": [],
        "requires": [],
        "goodWith": []
      },
      "version": "4.1.1",
      "installUrl": "https://gist.github.com/chyoyam-alt/d40ec765dc822b96a8d4b93342a264f4/raw/Radiosonde.user.js",
      "file": "",
      "namespace": "igx-radiosonde-live",
      "match": [
        "https://crack.wrtn.ai/*"
      ],
      "grant": [
        "GM_addStyle",
        "GM_xmlhttpRequest"
      ],
      "runAt": "",
      "lastTestedAt": "2026-08-03",
      "updatedAt": "2026-08-03T04:20:49.620Z",
      "history": [],
      "creatorNote": "",
      "introductionPage": {
        "url": "https://gall.dcinside.com/mini/wrtnw/243435",
        "label": "소개 페이지"
      },
      "originalSource": {
        "url": "",
        "label": "",
        "author": "",
        "note": ""
      },
      "recommendation": {
        "enabled": true,
        "label": "추천",
        "priority": 0
      },
      "presentation": {
        "coverImageUrl": "",
        "coverImageAlt": "",
        "coverImageCreditUrl": "",
        "coverImageCreditLabel": ""
      }
    },
    {
      "id": "crack-chat-draft-saver",
      "status": "active",
      "name": "📦 Crack chat draft saver (크랙 채팅 임시저장)",
      "summary": "크랙 채팅방별 작성 중인 메시지를 자동 임시저장 및 복구합니다.",
      "description": "각 스토리 채팅방별로 입력창에 작성 중인 텍스트를 자동으로 임시 저장합니다. 따로 저장 버튼을 누를 필요 없이 텍스트를 입력하면 알아서 저장되며, 페이지를 닫거나 새로고침 후 다시 접속하면 이전 내용이 자동으로 복구됩니다. 성공적으로 전송된 메시지는 임시저장에서 지워지며, 유저스크립트 메뉴를 통해 저장 상태를 확인하거나 수동으로 삭제할 수도 있습니다.",
      "categories": [
        "채팅 임시저장",
        "메시지 입력창",
        "유저 인풋"
      ],
      "features": [],
      "aliases": [
        "임시저장"
      ],
      "tags": [
        "뤼튼",
        "크랙",
        "wrtn",
        "채팅",
        "임시저장",
        "자동저장"
      ],
      "platforms": {
        "pc": "yes",
        "mobile": "yes",
        "evidence": {
          "pc": "verified",
          "mobile": "verified"
        }
      },
      "performance": {
        "pc": "light",
        "mobile": "light",
        "evidence": "verified"
      },
      "relations": {
        "conflictsWith": [
          "crack-mobile-utility"
        ],
        "requires": [],
        "goodWith": []
      },
      "version": "1.0.2",
      "installUrl": "https://gist.github.com/chyoyam-alt/d48a16af1480c16922167172e82ad353/raw/CrackDraftKeeper.user.js",
      "file": "",
      "namespace": "https://crack.wrtn.ai/",
      "match": [
        "https://crack.wrtn.ai/*"
      ],
      "grant": [
        "GM_getValue",
        "GM_setValue",
        "GM_deleteValue",
        "GM_listValues",
        "GM_registerMenuCommand"
      ],
      "runAt": "document-idle",
      "lastTestedAt": "2026-08-03",
      "updatedAt": "2026-08-03T04:22:35.583Z",
      "history": [],
      "creatorNote": "",
      "introductionPage": {
        "url": "",
        "label": "소개 페이지"
      },
      "originalSource": {
        "url": "",
        "label": "",
        "author": "",
        "note": ""
      },
      "recommendation": {
        "enabled": false,
        "label": "추천",
        "priority": 0
      },
      "presentation": {
        "coverImageUrl": "",
        "coverImageAlt": "",
        "coverImageCreditUrl": "",
        "coverImageCreditLabel": ""
      }
    },
    {
      "id": "crack-mobile-utility",
      "status": "active",
      "name": "📱 Crack Mobile Utility (모바일 유틸 합본)",
      "summary": "모바일 환경을 위한 상단바 숨김, 테마 변경 및 화면 최적화 유틸리티입니다.",
      "description": "모바일 화면에서 채팅을 쾌적하게 즐길 수 있도록 상단바 자동 숨김과 와이드뷰 모드를 지원합니다. 텍스트 및 이미지 크기 조절이 가능하며, 불필요한 엔딩 힌트 버튼을 제거할 수 있습니다. 1종의 채팅창 테마를 제공하고, 입력창 펼치기 버튼 및 빠른 설정 진입 버튼을 제공하여 모바일에서의 조작 편의성을 높였습니다.",
      "categories": [
        "모바일 합본"
      ],
      "features": [
        "상단바 숨김",
        "좌우 메뉴 열기 슬라이드 지원",
        "캡처 모드 지원",
        "답변별 크래커",
        "시간 및 글자수 배지",
        "이미지 크기",
        "글씨 크기",
        "바로가기",
        "간단 테마"
      ],
      "aliases": [
        "모바일 합본"
      ],
      "tags": [
        "모바일최적화",
        "상단바숨김",
        "UI커스텀",
        "편의기능"
      ],
      "platforms": {
        "pc": "no",
        "mobile": "yes",
        "evidence": {
          "pc": "verified",
          "mobile": "verified"
        }
      },
      "performance": {
        "pc": "unknown",
        "mobile": "medium",
        "evidence": "verified"
      },
      "relations": {
        "conflictsWith": [
          "crack-radiosonde",
          "crack-composer-expander",
          "crack-answer-cost",
          "crack-dashboard",
          "crack-char-clock-badge",
          "crack-chat-draft-saver"
        ],
        "requires": [],
        "goodWith": []
      },
      "version": "4.0.1",
      "installUrl": "https://gist.github.com/chyoyam-alt/3220e9cc6089c9108117a277d97257f7/raw/crack-mobile-utility.user.js",
      "file": "",
      "namespace": "crack-mobile-utility",
      "match": [
        "*://crack.wrtn.ai/*"
      ],
      "grant": [
        "GM_addStyle",
        "GM_xmlhttpRequest",
        "unsafeWindow"
      ],
      "runAt": "document-idle",
      "lastTestedAt": "2026-08-03",
      "updatedAt": "2026-08-03T04:28:24.355Z",
      "history": [],
      "creatorNote": "충돌하는 확프가 많으니 사전에 꼭 확인 후 설치하시길 바랍니다.",
      "introductionPage": {
        "url": "",
        "label": "소개 페이지"
      },
      "originalSource": {
        "url": "",
        "label": "",
        "author": "",
        "note": "https://gall.dcinside.com/mini/wrtnw/226241\nhttps://gall.dcinside.com/mini/wrtnw/210345\nhttps://gall.dcinside.com/mini/wrtnw/200605\nhttps://gall.dcinside.com/mini/board/view/?id=wrtnw&no=230899\nhttps://gall.dcinside.com/mini/wrtnw/231157\nhttps://gall.dcinside.com/mini/wrtnw/234063"
      },
      "recommendation": {
        "enabled": true,
        "label": "추천",
        "priority": 0
      },
      "presentation": {
        "coverImageUrl": "",
        "coverImageAlt": "",
        "coverImageCreditUrl": "",
        "coverImageCreditLabel": ""
      }
    },
    {
      "id": "crack-char-clock-badge",
      "status": "active",
      "name": "🕒 Crack Char Clock Badge (크랙 글자수·시간 배지)",
      "summary": "채팅 메시지에 정확한 글자수와 생성 시간을 표시합니다.",
      "description": "채팅 화면에서 각 메시지에 글자수와 생성 시각을 알려주는 배지를 추가합니다. 내부 API를 호출하여 리롤(답변 비교) 상태에서도 현재 선택된 메시지의 정확한 데이터를 가져옵니다. 사용자 말풍선 및 소설형 UI 등 다양한 레이아웃에 맞춰 배지가 자연스럽게 배치되며, API 통신 실패 시 DOM 데이터를 기반으로 시간을 유추합니다. 스크립트 관리자 메뉴를 통해 글자수 및 시간 표시 여부를 개별적으로 설정할 수 있습니다.",
      "categories": [
        "유틸리티"
      ],
      "features": [],
      "aliases": [],
      "tags": [
        "글자수",
        "시간",
        "채팅",
        "유틸리티"
      ],
      "platforms": {
        "pc": "yes",
        "mobile": "yes",
        "evidence": {
          "pc": "verified",
          "mobile": "verified"
        }
      },
      "performance": {
        "pc": "light",
        "mobile": "light",
        "evidence": "verified"
      },
      "relations": {
        "conflictsWith": [
          "crack-mobile-utility"
        ],
        "requires": [],
        "goodWith": []
      },
      "version": "1.2.7",
      "installUrl": "https://gist.github.com/chyoyam-alt/b13ba3e1039a8cf4765566b10f8cfb8a/raw/CrackBadge.user.js",
      "file": "",
      "namespace": "crack char clock badge",
      "match": [
        "https://crack.wrtn.ai/stories/*/episodes/*"
      ],
      "grant": [
        "GM_addStyle",
        "GM_getValue",
        "GM_setValue",
        "GM_registerMenuCommand"
      ],
      "runAt": "document-idle",
      "lastTestedAt": "2026-08-03",
      "updatedAt": "2026-08-03T04:29:46.251Z",
      "history": [],
      "creatorNote": "",
      "introductionPage": {
        "url": "",
        "label": "소개 페이지"
      },
      "originalSource": {
        "url": "",
        "label": "",
        "author": "",
        "note": ""
      },
      "recommendation": {
        "enabled": false,
        "label": "추천",
        "priority": 0
      },
      "presentation": {
        "coverImageUrl": "",
        "coverImageAlt": "",
        "coverImageCreditUrl": "",
        "coverImageCreditLabel": ""
      }
    },
    {
      "id": "crack-highlighter",
      "status": "active",
      "name": "🖍️ Crack Highlighter (크랙 형광펜 노트)",
      "summary": "텍스트에 형광펜을 칠하고 메모를 남길 수 있는 스크립트입니다.",
      "description": "채팅본문의 텍스트를 드래그하여 형광펜으로 강조하고 메모를 저장할 수 있습니다. 텍스트 선택 시 나타나는 팝업 바에서 색상을 고를 수 있으며, 툴바에 생성되는 전용 버튼을 눌러 저장된 형광펜 목록과 커스텀 팔레트를 관리할 수 있습니다. 목록에서 특정 기록을 클릭하면 해당 대화 위치로 자동 스크롤되며, 칠해진 텍스트를 우클릭하거나 길게 터치해 삭제할 수 있습니다. 배경색과 글자색 조합을 직접 추가할 수 있고 투명도 및 볼드체 설정도 지원합니다.",
      "categories": [
        "형광펜",
        "북마크"
      ],
      "features": [],
      "aliases": [],
      "tags": [
        "형광펜",
        "메모",
        "하이라이트"
      ],
      "platforms": {
        "pc": "yes",
        "mobile": "yes",
        "evidence": {
          "pc": "verified",
          "mobile": "verified"
        }
      },
      "performance": {
        "pc": "light",
        "mobile": "light",
        "evidence": "verified"
      },
      "relations": {
        "conflictsWith": [],
        "requires": [],
        "goodWith": []
      },
      "version": "1.3.0",
      "installUrl": "https://gist.github.com/chyoyam-alt/29d41d87a7107e726e39fa858d9069be/raw/CrackHighlighter_Custom.user.js",
      "file": "",
      "namespace": "https://crack.wrtn.ai/",
      "match": [
        "https://crack.wrtn.ai/*"
      ],
      "grant": [
        "GM_addStyle"
      ],
      "runAt": "",
      "lastTestedAt": "2026-08-03",
      "updatedAt": "2026-08-03T04:30:42.091Z",
      "history": [],
      "creatorNote": "",
      "introductionPage": {
        "url": "",
        "label": "소개 페이지"
      },
      "originalSource": {
        "url": "https://gall.dcinside.com/mini/wrtnw/178146",
        "label": "",
        "author": "뤼갤러",
        "note": ""
      },
      "recommendation": {
        "enabled": false,
        "label": "추천",
        "priority": 0
      },
      "presentation": {
        "coverImageUrl": "",
        "coverImageAlt": "",
        "coverImageCreditUrl": "",
        "coverImageCreditLabel": ""
      }
    },
    {
      "id": "crack-dashboard",
      "status": "active",
      "name": "🖥️ Crack Dashboard (크랙 대시보드)",
      "summary": "크래커 잔여 및 사용 통계와 유틸리티 단축키를 제공하는 미니 사이드바 대시보드",
      "description": "입력창에 미니 대시보드와 사이드바를 추가하여 크래커 잔여량, 누적 차감량, 진행 턴 수 등의 통계를 실시간으로 보여줍니다. 내부 API를 활용해 모델 목록을 가볍게 동기화하고, 폐기되거나 대체된 모델은 자동으로 필터링합니다. 초월 번역기, AI 요약, AI 답변 등 다른 확장 프로그램이 설치된 경우 해당 설정 창을 즉시 열 수 있는 연동 버튼을 지원합니다. 주기적인 폴링 대신 데이터 레이어 이벤트 감시와 로컬 캐시를 활용하여 스크립트 동작을 최적화했습니다.",
      "categories": [
        "UI"
      ],
      "features": [],
      "aliases": [],
      "tags": [
        "대시보드",
        "통계",
        "사이드바",
        "크래커",
        "바로가기"
      ],
      "platforms": {
        "pc": "yes",
        "mobile": "yes",
        "evidence": {
          "pc": "verified",
          "mobile": "verified"
        }
      },
      "performance": {
        "pc": "medium",
        "mobile": "medium",
        "evidence": "verified"
      },
      "relations": {
        "conflictsWith": [
          "crack-mobile-utility"
        ],
        "requires": [],
        "goodWith": []
      },
      "version": "3.3.1",
      "installUrl": "https://gist.github.com/chyoyam-alt/053f8b2ad509e4177fac5b2abd5d8db7/raw/Dashboard.user.js",
      "file": "",
      "namespace": "crack dashboard",
      "match": [
        "*://crack.wrtn.ai/*"
      ],
      "grant": [
        "GM_registerMenuCommand",
        "GM_unregisterMenuCommand",
        "unsafeWindow"
      ],
      "runAt": "",
      "lastTestedAt": "2026-08-03",
      "updatedAt": "2026-08-03T04:32:22.946Z",
      "history": [],
      "creatorNote": "",
      "introductionPage": {
        "url": "",
        "label": "소개 페이지"
      },
      "originalSource": {
        "url": "https://gall.dcinside.com/mini/wrtnw/210345",
        "label": "",
        "author": "ㄹㅅㄹ",
        "note": ""
      },
      "recommendation": {
        "enabled": false,
        "label": "추천",
        "priority": 0
      },
      "presentation": {
        "coverImageUrl": "",
        "coverImageAlt": "",
        "coverImageCreditUrl": "",
        "coverImageCreditLabel": ""
      }
    },
    {
      "id": "crack-custom-room-image-background",
      "status": "active",
      "name": "🖼️ Crack Custom Room Image Background (배경 이미지&테마)",
      "summary": "오른쪽 메뉴의 \"배경 이미지 보기\"에서 방별 이미지를 직접 추가하고, 글씨색, 테마 등을 추가합니다.",
      "description": "(이미지 커스텀 버전) 접속 환경의 다크/라이트 모드와 소설/채팅형 레이아웃을 자동 감지해 어울리는 배경과 테마 색상을 적용합니다. 무테, 글라스, 픽셀, 스티커 등 다양한 맞춤형 UI 스타일을 선택할 수 있으며 대사와 생각 구문에 배경색을 넣는 하이라이트 기능을 제공합니다. 외부 폰트 URL이나 CSS를 불러와 사용자 지정 폰트를 적용할 수 있습니다. 설정값은 기기에 자동 저장되어 재접속 시에도 유지됩니다.",
      "categories": [],
      "features": [],
      "aliases": [],
      "tags": [
        "테마",
        "이미지 배경",
        "꾸미기"
      ],
      "platforms": {
        "pc": "yes",
        "mobile": "yes",
        "evidence": {
          "pc": "verified",
          "mobile": "verified"
        }
      },
      "performance": {
        "pc": "medium",
        "mobile": "medium",
        "evidence": "verified"
      },
      "relations": {
        "conflictsWith": [],
        "requires": [],
        "goodWith": []
      },
      "version": "2.3.5",
      "installUrl": "https://gist.github.com/chyoyam-alt/ec8db5ac1369e738dfbe7c7fc450abdc/raw/ImageBackground.user.js",
      "file": "",
      "namespace": "crack-custom-room-background",
      "match": [
        "https://crack.wrtn.ai/*"
      ],
      "grant": [
        "none"
      ],
      "runAt": "document-idle",
      "lastTestedAt": "2026-08-03",
      "updatedAt": "2026-08-03T04:33:17.675Z",
      "history": [],
      "creatorNote": "",
      "introductionPage": {
        "url": "",
        "label": "소개 페이지"
      },
      "originalSource": {
        "url": "",
        "label": "",
        "author": "",
        "note": ""
      },
      "recommendation": {
        "enabled": false,
        "label": "추천",
        "priority": 0
      },
      "presentation": {
        "coverImageUrl": "",
        "coverImageAlt": "",
        "coverImageCreditUrl": "",
        "coverImageCreditLabel": ""
      }
    },
    {
      "id": "csp-generated-image-background-blur",
      "status": "active",
      "name": "🖼️ CSP - Generated Image Background Blur (배경 이미지&테마)",
      "summary": "뤼튼 레이아웃 맞춤 배경 및 커스텀 테마 UI 적용",
      "description": "(삽화확프-CSP 연동 버전) 접속 환경의 다크/라이트 모드와 소설/채팅형 레이아웃을 자동 감지해 어울리는 배경과 테마 색상을 적용합니다. 무테, 글라스, 픽셀, 스티커 등 다양한 맞춤형 UI 스타일을 선택할 수 있으며 대사와 생각 구문에 배경색을 넣는 하이라이트 기능을 제공합니다. 외부 폰트 URL이나 CSS를 불러와 사용자 지정 폰트를 적용할 수 있습니다. 설정값은 기기에 자동 저장되어 재접속 시에도 유지됩니다.",
      "categories": [],
      "features": [],
      "aliases": [],
      "tags": [
        "테마",
        "배경설정",
        "UI커스텀",
        "폰트변경",
        "하이라이트"
      ],
      "platforms": {
        "pc": "yes",
        "mobile": "yes",
        "evidence": {
          "pc": "verified",
          "mobile": "verified"
        }
      },
      "performance": {
        "pc": "medium",
        "mobile": "heavy",
        "evidence": "verified"
      },
      "relations": {
        "conflictsWith": [],
        "requires": [],
        "goodWith": [
          "crack-scene-painter"
        ]
      },
      "version": "2.3.5",
      "installUrl": "https://gist.github.com/chyoyam-alt/4391ea2abe3340aa838c832ffb27fe58/raw/GeneratedImageBackground.user.js",
      "file": "",
      "namespace": "crack-scene-painter-background-borderless",
      "match": [
        "https://crack.wrtn.ai/*"
      ],
      "grant": [
        "none"
      ],
      "runAt": "document-idle",
      "lastTestedAt": "2026-08-03",
      "updatedAt": "2026-08-03T04:33:59.415Z",
      "history": [],
      "creatorNote": "",
      "introductionPage": {
        "url": "",
        "label": "소개 페이지"
      },
      "originalSource": {
        "url": "",
        "label": "",
        "author": "",
        "note": ""
      },
      "recommendation": {
        "enabled": false,
        "label": "추천",
        "priority": 0
      },
      "presentation": {
        "coverImageUrl": "",
        "coverImageAlt": "",
        "coverImageCreditUrl": "",
        "coverImageCreditLabel": ""
      }
    },
    {
      "id": "crack-archive",
      "status": "active",
      "name": "🗃️ Crack Archive (기록보관소)",
      "summary": "OOC와 채팅 로그를 저장하고 백업하는 아카이브 도구",
      "description": "OOC, 롤플레이 채팅 로그를 저장하고 관리할 수 있는 스크립트입니다. 기록을 검색하거나 즐겨찾기로 분류할 수 있으며, 다양한 레이아웃 테마와 글꼴을 적용해 시각적으로 꾸밀 수 있습니다. 저장된 데이터는 이미지(PNG), HTML 파일, 또는 디시인사이드 에디터 호환 코드로 내보낼 수 있어 백업 및 공유에 매우 유용합니다. 안정적인 데이터 보존과 용량 관리를 위해 Tampermonkey 환경에서 사용하는 것을 권장합니다.",
      "categories": [
        "HTML",
        "로그 백업"
      ],
      "features": [],
      "aliases": [
        "HTML",
        "로그 백업"
      ],
      "tags": [
        "아카이브",
        "채팅로그",
        "백업",
        "내보내기"
      ],
      "platforms": {
        "pc": "yes",
        "mobile": "yes",
        "evidence": {
          "pc": "verified",
          "mobile": "verified"
        }
      },
      "performance": {
        "pc": "medium",
        "mobile": "medium",
        "evidence": "verified"
      },
      "relations": {
        "conflictsWith": [],
        "requires": [],
        "goodWith": []
      },
      "version": "5.7.1",
      "installUrl": "https://gist.github.com/chyoyam-alt/4ae1c7902ab15f5fce867bbf8b8ecae3/raw/COA.user.js",
      "file": "",
      "namespace": "https://chatgpt.local/coa",
      "match": [
        "https://crack.wrtn.ai/*",
        "https://crack.wrtn.ai/"
      ],
      "grant": [
        "GM_setValue",
        "GM_getValue",
        "GM_deleteValue",
        "GM_listValues",
        "GM.getValue",
        "GM.setValue",
        "GM.deleteValue",
        "GM.listValues",
        "GM_xmlhttpRequest"
      ],
      "runAt": "document-idle",
      "lastTestedAt": "2026-08-03",
      "updatedAt": "2026-08-03T04:35:46.736Z",
      "history": [],
      "creatorNote": "",
      "introductionPage": {
        "url": "https://gall.dcinside.com/mini/wrtnw/235410",
        "label": "OOC·로그 기록보관소 확프 (캡처·HTML·DC HTML 코드 지원)"
      },
      "originalSource": {
        "url": "",
        "label": "",
        "author": "",
        "note": ""
      },
      "recommendation": {
        "enabled": false,
        "label": "추천",
        "priority": 0
      },
      "presentation": {
        "coverImageUrl": "",
        "coverImageAlt": "",
        "coverImageCreditUrl": "",
        "coverImageCreditLabel": ""
      }
    },
    {
      "id": "crack-safe-chat-delete",
      "status": "active",
      "name": "🗑️ Crack Safe Chat Delete (크랙 채팅 안전 삭제)",
      "summary": "리롤을 포함한 메시지를 선택하여 삭제합니다.",
      "description": "채팅 메시지를 선택하여 삭제할 수 있는 휴지통 버튼을 도구 모음에 추가합니다. 휴지통 버튼을 눌러 삭제 모드를 켠 뒤 지우고 싶은 메시지를 클릭해 선택하고, 버튼을 다시 누르면 선택한 메시지 일괄 삭제가 진행되며 길게 누를 경우 모드가 취소됩니다. 일반 메시지뿐만 아니라 '답변 비교'로 묶인 리롤 메시지도 화면 텍스트와 서버 API 데이터를 비교하는 이중 유사도 검증을 거쳐 정확한 대상만 안전하게 처리합니다. 검증에 실패한 메시지는 오작동 방지를 위해 삭제에서 제외되며, 묶음 메시지는 팝업 창을 통해 숨겨진 답변의 삭제 여부를 직접 제어할 수 있습니다.",
      "categories": [],
      "features": [],
      "aliases": [],
      "tags": [
        "채팅삭제",
        "메시지관리",
        "이중검증",
        "유틸리티"
      ],
      "platforms": {
        "pc": "yes",
        "mobile": "yes",
        "evidence": {
          "pc": "verified",
          "mobile": "verified"
        }
      },
      "performance": {
        "pc": "light",
        "mobile": "light",
        "evidence": "verified"
      },
      "relations": {
        "conflictsWith": [],
        "requires": [],
        "goodWith": []
      },
      "version": "5.0.8-native-class-restore",
      "installUrl": "https://gist.github.com/chyoyam-alt/3556cf40c94d3d3abb477ba1f4038d20/raw/CrackSafeChatDelete.user.js",
      "file": "",
      "namespace": "http://tampermonkey.net/",
      "match": [
        "https://crack.wrtn.ai/stories/*/episodes/*"
      ],
      "grant": [
        "GM_addStyle"
      ],
      "runAt": "document-idle",
      "lastTestedAt": "2026-08-03",
      "updatedAt": "2026-08-03T04:36:38.472Z",
      "history": [],
      "creatorNote": "",
      "introductionPage": {
        "url": "",
        "label": "소개 페이지"
      },
      "originalSource": {
        "url": "https://gall.dcinside.com/mini/wrtnw/185119",
        "label": "",
        "author": "ㅇㅇ",
        "note": ""
      },
      "recommendation": {
        "enabled": false,
        "label": "추천",
        "priority": 0
      },
      "presentation": {
        "coverImageUrl": "",
        "coverImageAlt": "",
        "coverImageCreditUrl": "",
        "coverImageCreditLabel": ""
      }
    },
    {
      "id": "crack-reroll-mixer",
      "status": "active",
      "name": "🧩 Crack Reroll Mixer (크랙 리롤 믹서)",
      "summary": "크랙 리롤 답변을 A/B로 비교하고 원하는 문단을 조합해 덮어쓰는 도구.",
      "description": "여러 번 리롤한 답변들을 A/B 화면으로 비교하고, 원하는 문단을 골라 하나의 답변으로 조합하는 기능입니다. 채팅창의 답변 비교 버튼 옆에 생성되는 '믹스' 버튼을 눌러 실행합니다. 선택한 문단들을 모아 칩 형태로 순서를 바꾸거나 직접 텍스트를 수정할 수 있습니다. 완성된 편집본은 복사 및 입력창 삽입이 가능하며, '답변 덮어쓰기'를 통해 현재 답변을 서버에 직접 덮어씌울 수도 있습니다.",
      "categories": [],
      "features": [
        "리롤 답변끼리 비교하며 조합"
      ],
      "aliases": [
        "리롤 조합"
      ],
      "tags": [
        "리롤",
        "답변조합",
        "덮어쓰기"
      ],
      "platforms": {
        "pc": "yes",
        "mobile": "yes",
        "evidence": {
          "pc": "verified",
          "mobile": "verified"
        }
      },
      "performance": {
        "pc": "light",
        "mobile": "light",
        "evidence": "verified"
      },
      "relations": {
        "conflictsWith": [],
        "requires": [],
        "goodWith": []
      },
      "version": "1.1.3",
      "installUrl": "https://gist.github.com/chyoyam-alt/fb6c1a4d26459a00ca1852eb62aae6c4/raw/RerollMixer.user.js",
      "file": "",
      "namespace": "http://tampermonkey.net/",
      "match": [
        "https://crack.wrtn.ai/stories/*/episodes/*"
      ],
      "grant": [
        "GM_addStyle"
      ],
      "runAt": "document-idle",
      "lastTestedAt": "2026-08-03",
      "updatedAt": "2026-08-03T04:53:31.294Z",
      "history": [],
      "creatorNote": "",
      "introductionPage": {
        "url": "",
        "label": "소개 페이지"
      },
      "originalSource": {
        "url": "",
        "label": "",
        "author": "",
        "note": ""
      },
      "recommendation": {
        "enabled": false,
        "label": "추천",
        "priority": 0
      },
      "presentation": {
        "coverImageUrl": "",
        "coverImageAlt": "",
        "coverImageCreditUrl": "",
        "coverImageCreditLabel": ""
      }
    },
    {
      "id": "crack-vault-restorer",
      "status": "active",
      "name": "🧰 Crack Vault Restorer (크랙 보관함 복구기)",
      "summary": "이미지 보관함 전체 로딩 및 해금 이미지 상단 정렬",
      "description": "이미지 보관함에서 발생하는 로딩 및 정렬 문제를 해결하는 스크립트입니다. 네트워크 요청을 가로채어 여러 페이지에 나뉜 이미지 데이터를 한 번에 불러오고 통합합니다. 이후 화면에 표시될 때 해금된 이미지가 최상단에 배치되도록 자동으로 정렬 순서를 조정합니다. 탭 전환 시 스크롤을 맨 위로 초기화하는 편의 기능도 함께 제공하여 더욱 쾌적하게 보관함을 이용할 수 있습니다.",
      "categories": [
        "버그패치"
      ],
      "features": [],
      "aliases": [
        "이미지 보관함"
      ],
      "tags": [
        "이미지보관함",
        "자동정렬"
      ],
      "platforms": {
        "pc": "yes",
        "mobile": "yes",
        "evidence": {
          "pc": "verified",
          "mobile": "verified"
        }
      },
      "performance": {
        "pc": "medium",
        "mobile": "medium",
        "evidence": "verified"
      },
      "relations": {
        "conflictsWith": [],
        "requires": [],
        "goodWith": []
      },
      "version": "0.5.1",
      "installUrl": "https://gist.github.com/chyoyam-alt/f05dd2d97fcd5d040534f9c104b6908d/raw/ImageLibraryNativeLazyLoadFix.user.js",
      "file": "",
      "namespace": "crack-vault-restorer",
      "match": [
        "https://crack.wrtn.ai/*"
      ],
      "grant": [
        "none"
      ],
      "runAt": "document-start",
      "lastTestedAt": "2026-08-03",
      "updatedAt": "2026-08-03T04:43:49.733Z",
      "history": [],
      "creatorNote": "",
      "introductionPage": {
        "url": "https://gall.dcinside.com/mini/wrtnw/225302",
        "label": "내부이미지 보관함 스크롤/해금 이미지 복구 확프"
      },
      "originalSource": {
        "url": "",
        "label": "",
        "author": "",
        "note": ""
      },
      "recommendation": {
        "enabled": false,
        "label": "추천",
        "priority": 0
      },
      "presentation": {
        "coverImageUrl": "",
        "coverImageAlt": "",
        "coverImageCreditUrl": "",
        "coverImageCreditLabel": ""
      }
    },
    {
      "id": "crack-edit-text-click-replacer",
      "status": "active",
      "name": "🧹 Crack Edit Text Click Replacer (수정창 단어 청소기)",
      "summary": "수정창에서 반복 단어를 추출해 클릭으로 일괄 정리하는 스크립트",
      "description": "'수정 완료' 버튼 옆에 '단어 정리' 버튼을 추가하여 본문 내 반복 단어를 자동 후보로 보여줍니다. 후보를 클릭하거나 직접 입력하여 삭제 및 치환 규칙을 만들 수 있으며, 주변 공백 처리 방식도 설정할 수 있습니다. 실시간 미리보기 창에서 강조 표시된 특정 위치의 단어를 클릭하면 해당 부분만 일괄 적용에서 제외할 수 있습니다. 적용 시 기존 마크다운 서식이 깨지지 않도록 DOM 구조를 재구성하여 에디터에 반영합니다.",
      "categories": [],
      "features": [],
      "aliases": [
        "반복 단어",
        "일괄 정리",
        "치환",
        "삭제"
      ],
      "tags": [
        "텍스트에디터",
        "단어치환",
        "일괄삭제",
        "문서정리"
      ],
      "platforms": {
        "pc": "yes",
        "mobile": "yes",
        "evidence": {
          "pc": "verified",
          "mobile": "verified"
        }
      },
      "performance": {
        "pc": "medium",
        "mobile": "medium",
        "evidence": "verified"
      },
      "relations": {
        "conflictsWith": [],
        "requires": [],
        "goodWith": []
      },
      "version": "0.2.10",
      "installUrl": "https://gist.github.com/chyoyam-alt/7dc388369fb4bb7033501ac307070fee/raw/EditTextClickReplacer.user.js",
      "file": "",
      "namespace": "crack-edit-text-click-replacer",
      "match": [
        "https://crack.wrtn.ai/*"
      ],
      "grant": [
        "none"
      ],
      "runAt": "document-idle",
      "lastTestedAt": "2026-08-03",
      "updatedAt": "2026-08-03T04:53:43.483Z",
      "history": [],
      "creatorNote": "",
      "introductionPage": {
        "url": "",
        "label": "소개 페이지"
      },
      "originalSource": {
        "url": "",
        "label": "",
        "author": "",
        "note": ""
      },
      "recommendation": {
        "enabled": false,
        "label": "추천",
        "priority": 0
      },
      "presentation": {
        "coverImageUrl": "",
        "coverImageAlt": "",
        "coverImageCreditUrl": "",
        "coverImageCreditLabel": ""
      }
    },
    {
      "id": "my-script",
      "status": "active",
      "name": "🪛 크랙 모바일 화면 잘림 방지",
      "summary": "모바일 화면에서 코드블록과 수식이 잘리는 현상을 방지합니다.",
      "description": "긴 코드나 수식이 화면 영역을 벗어나 잘리는 문제를 해결하는 스크립트입니다. 강제 줄바꿈 CSS를 주입하여 부모 요소가 좌우로 늘어나지 않도록 레이아웃을 유지합니다. Shiki 기반 특수 코드블록, 순정 마크다운 코드블록 및 KaTeX 수식 렌더링 등 다양한 요소에 적용됩니다. 별도의 설정 없이 스크립트를 활성화하면 페이지 로딩 시 자동으로 화면 최적화가 이루어집니다.",
      "categories": [],
      "features": [],
      "aliases": [
        "화면잘림",
        "버그",
        "패치",
        "모바일"
      ],
      "tags": [
        "레이아웃",
        "코드블록",
        "줄바꿈",
        "모바일"
      ],
      "platforms": {
        "pc": "no",
        "mobile": "yes",
        "evidence": {
          "pc": "unknown",
          "mobile": "verified"
        }
      },
      "performance": {
        "pc": "unknown",
        "mobile": "light",
        "evidence": "verified"
      },
      "relations": {
        "conflictsWith": [],
        "requires": [],
        "goodWith": []
      },
      "version": "1.7",
      "installUrl": "https://gist.github.com/chyoyam-alt/2f91496652989d522646b89b1a88227d/raw/CrackMobileTextWrapFix.user.js",
      "file": "",
      "namespace": "http://tampermonkey.net/",
      "match": [
        "*://crack.wrtn.ai/*"
      ],
      "grant": [
        "none"
      ],
      "runAt": "document-start",
      "lastTestedAt": "2026-08-03",
      "updatedAt": "2026-08-03T04:45:47.571Z",
      "history": [],
      "creatorNote": "",
      "introductionPage": {
        "url": "",
        "label": "소개 페이지"
      },
      "originalSource": {
        "url": "",
        "label": "",
        "author": "",
        "note": ""
      },
      "recommendation": {
        "enabled": false,
        "label": "추천",
        "priority": 0
      },
      "presentation": {
        "coverImageUrl": "",
        "coverImageAlt": "",
        "coverImageCreditUrl": "",
        "coverImageCreditLabel": ""
      }
    },
    {
      "id": "crack-chat-trash",
      "status": "active",
      "name": "🚯 Crack Chat Trash (채팅 휴지통)",
      "summary": "채팅방에서 삭제한 메시지를 저장하고 복원하는 휴지통 기능",
      "description": "메시지를 삭제할 때 API 호출을 가로채어 본문을 로컬에 저장합니다. 오른쪽 사이드바 하단에 추가되는 '채팅 휴지통' 메뉴를 클릭해 삭제 내역을 확인하고 필터링 및 검색할 수 있습니다. 보관된 메시지는 텍스트로 복사하거나 채팅 입력창에 바로 삽입할 수 있습니다. 채팅방별로 최대 100개의 메시지를 30일 동안 보관하며, 화면에 보이지 않는 리롤 및 숨김 답변도 캐시를 통해 복구를 시도합니다.",
      "categories": [],
      "features": [],
      "aliases": [
        "삭제",
        "백업",
        "메시지",
        "복구"
      ],
      "tags": [
        "휴지통",
        "백업",
        "메시지복구"
      ],
      "platforms": {
        "pc": "yes",
        "mobile": "yes",
        "evidence": {
          "pc": "verified",
          "mobile": "verified"
        }
      },
      "performance": {
        "pc": "light",
        "mobile": "light",
        "evidence": "verified"
      },
      "relations": {
        "conflictsWith": [],
        "requires": [],
        "goodWith": []
      },
      "version": "1.0.4",
      "installUrl": "https://gist.github.com/chyoyam-alt/aaf84327b4b4e8840b68c4c2846ebd29/raw/chattrash.user.js",
      "file": "",
      "namespace": "crack chat trash",
      "match": [
        "https://crack.wrtn.ai/*",
        "https://*.crack.wrtn.ai/*"
      ],
      "grant": [
        "unsafeWindow",
        "GM_addStyle",
        "GM_setClipboard",
        "GM_registerMenuCommand"
      ],
      "runAt": "document-start",
      "lastTestedAt": "2026-08-03",
      "updatedAt": "2026-08-03T04:53:54.036Z",
      "history": [],
      "creatorNote": "",
      "introductionPage": {
        "url": "https://gall.dcinside.com/mini/wrtnw/225942",
        "label": "채팅 휴지통 확프"
      },
      "originalSource": {
        "url": "",
        "label": "",
        "author": "",
        "note": ""
      },
      "recommendation": {
        "enabled": false,
        "label": "추천",
        "priority": 0
      },
      "presentation": {
        "coverImageUrl": "",
        "coverImageAlt": "",
        "coverImageCreditUrl": "",
        "coverImageCreditLabel": ""
      }
    },
    {
      "id": "universal",
      "status": "active",
      "name": "에리의 크랙 로어 인젝터 (Universal)",
      "summary": "크랙 커스텀 로어 주입 코어 스크립트",
      "description": "긴 채팅에서 캐릭터 설정, 관계, 약속, 과거 사건 같은 정보를 저장해두고, 현재 대화에 필요한 내용만 찾아 AI 답변 전에 참고자료로 넣어주는 확장 프로그램이다. 자동 삽입, 자동·수동 추출, 의미 검색, 로어팩 관리, 백업, 응답 교정 기능을 지원해 장기 RP에서 설정 오류와 기억 누락을 줄여준다.",
      "categories": [],
      "features": [
        "기억력 상승"
      ],
      "aliases": [],
      "tags": [
        "API제어",
        "웹소켓",
        "로어북",
        "UI추가"
      ],
      "platforms": {
        "pc": "yes",
        "mobile": "yes",
        "evidence": {
          "pc": "reported",
          "mobile": "reported"
        }
      },
      "performance": {
        "pc": "light",
        "mobile": "light",
        "evidence": "verified"
      },
      "relations": {
        "conflictsWith": [],
        "requires": [],
        "goodWith": []
      },
      "version": "1.4.0.260706-universal.30",
      "installUrl": "https://cdn.jsdelivr.net/gh/Localsmile/CRACK-INJECTION-REFINER@260706-hotfix/universal_bundle_work/dist/erie_crack_inject_universal.user.js",
      "file": "",
      "namespace": "에리의 크랙 로어 인젝터",
      "match": [
        "https://crack.wrtn.ai/stories/*/episodes/*",
        "https://crack.wrtn.ai/characters/*/chats/*",
        "https://crack.wrtn.ai/u/*/c/*"
      ],
      "grant": [
        "GM_addStyle",
        "GM_xmlhttpRequest",
        "unsafeWindow"
      ],
      "runAt": "document-start",
      "lastTestedAt": "2026-08-03",
      "updatedAt": "2026-08-03T04:17:41.836Z",
      "history": [],
      "creatorNote": "",
      "introductionPage": {
        "url": "https://gall.dcinside.com/mini/board/view/?id=wrtnw&no=235401",
        "label": "소개 페이지"
      },
      "originalSource": {
        "url": "",
        "label": "",
        "author": "로컬AI",
        "note": ""
      },
      "recommendation": {
        "enabled": true,
        "label": "추천",
        "priority": 100
      },
      "presentation": {
        "coverImageUrl": "",
        "coverImageAlt": "",
        "coverImageCreditUrl": "",
        "coverImageCreditLabel": ""
      }
    },
    {
      "id": "crack-shortcut-customizer",
      "status": "active",
      "name": "Crack Shortcut Customizer",
      "summary": "다양한 기능의 단축키를 내 마음대로 설정할 수 있는 커스텀 스크립트",
      "description": "채팅방에서 사용할 수 있는 각종 기능의 단축키를 내 마음대로 변경할 수 있는 스크립트입니다. 대화 내역 토글, 인풋 창 포커스 등 기본 기능은 물론 로어 인젝터, 대화 프로필, 플레이 가이드 제어 기능을 단축키로 지원합니다. 페이블챗, 하이퍼챗, 프로챗 등 원하는 챗 모델을 단축키로 즉시 변경하는 기능도 포함되어 있습니다. 설정 창에서 단축키 충돌 여부를 확인하며 직관적으로 키를 매핑할 수 있습니다. 설정 창을 여는 기본 단축키는 'Ctrl + Shift + ,' 입니다.",
      "categories": [],
      "features": [],
      "aliases": [
        "단축키",
        "커스텀",
        "바로가기"
      ],
      "tags": [
        "단축키",
        "커스텀",
        "로어인젝터",
        "모델선택",
        "UI제어"
      ],
      "platforms": {
        "pc": "yes",
        "mobile": "yes",
        "evidence": {
          "pc": "reported",
          "mobile": "reported"
        }
      },
      "performance": {
        "pc": "light",
        "mobile": "light",
        "evidence": "verified"
      },
      "relations": {
        "conflictsWith": [],
        "requires": [],
        "goodWith": []
      },
      "version": "1.2.1",
      "installUrl": "https://raw.githubusercontent.com/Dflashh/Crack/main/Archive/Shortcut.user.js",
      "file": "",
      "namespace": "https://github.com/Dflashh/Crack",
      "match": [
        "*://crack.wrtn.ai/*"
      ],
      "grant": [
        "GM_addStyle",
        "GM_registerMenuCommand"
      ],
      "runAt": "document-start",
      "lastTestedAt": "2026-08-03",
      "updatedAt": "2026-08-03T04:48:56.654Z",
      "history": [],
      "creatorNote": "",
      "introductionPage": {
        "url": "https://gall.dcinside.com/mini/wrtnw/234066",
        "label": "단축어 커스텀"
      },
      "originalSource": {
        "url": "",
        "label": "",
        "author": "",
        "note": ""
      },
      "recommendation": {
        "enabled": false,
        "label": "추천",
        "priority": 0
      },
      "presentation": {
        "coverImageUrl": "",
        "coverImageAlt": "",
        "coverImageCreditUrl": "",
        "coverImageCreditLabel": ""
      }
    },
    {
      "id": "cracksafe",
      "status": "active",
      "name": "CrackSafe",
      "summary": "채팅 내역 백업 및 다운로드",
      "description": "채팅 내역을 백업하고 TXT, JSON, HTML 형식으로 다운로드할 수 있는 스크립트입니다. 화면에 추가되는 버튼을 통해 전체 대화나 새로운 대화(증분)를 백업 및 관리할 수 있습니다. 내보낸 HTML 파일은 다크모드와 검색 기능을 지원하는 자체 뷰어를 포함합니다. 대화량이 많을 경우 API 호출 횟수 제한에 도달할 수 있으니 주의하세요.",
      "categories": [],
      "features": [],
      "aliases": [
        "로그",
        "다운로더",
        "로그 백업"
      ],
      "tags": [
        "백업",
        "다운로드",
        "채팅"
      ],
      "platforms": {
        "pc": "yes",
        "mobile": "yes",
        "evidence": {
          "pc": "verified",
          "mobile": "verified"
        }
      },
      "performance": {
        "pc": "medium",
        "mobile": "medium",
        "evidence": "verified"
      },
      "relations": {
        "conflictsWith": [],
        "requires": [],
        "goodWith": []
      },
      "version": "1.0.28",
      "installUrl": "https://gist.github.com/zxklkj12/8c10b4a97eb56e5d79b834339cdff5b4/raw/cracksafe.user.js",
      "file": "",
      "namespace": "https://crack.wrtn.ai/",
      "match": [
        "https://crack.wrtn.ai/*"
      ],
      "grant": [
        "GM_addStyle",
        "GM_xmlhttpRequest",
        "GM_registerMenuCommand"
      ],
      "runAt": "",
      "lastTestedAt": "2026-08-03",
      "updatedAt": "2026-08-03T04:51:37.386Z",
      "history": [],
      "creatorNote": "",
      "introductionPage": {
        "url": "https://gall.dcinside.com/mini/wrtnw/238041",
        "label": "채팅 다운로더(CrackSafe) - 편의성추가"
      },
      "originalSource": {
        "url": "",
        "label": "",
        "author": "",
        "note": ""
      },
      "recommendation": {
        "enabled": true,
        "label": "추천",
        "priority": 99
      },
      "presentation": {
        "coverImageUrl": "",
        "coverImageAlt": "",
        "coverImageCreditUrl": "",
        "coverImageCreditLabel": ""
      }
    },
    {
      "id": "Crack-Alibi",
      "status": "active",
      "name": "크랙 알리바이",
      "summary": "선택한 기간 동안의 크랙 사용 및 획득 내역을 빠르게 조회하고 요약해 주는 스크립트입니다.",
      "description": "구매 탭에 알리바이 조회 버튼을 추가합니다. 버튼을 눌러 원하는 기간을 설정하면 해당 기간의 크랙 소비 및 획득 내역을 달력과 요약 형태로 한눈에 확인할 수 있습니다. 또한 조회한 내역을 CSV 파일로 다운로드하는 기능도 제공합니다.",
      "categories": [
        "편의성",
        "유틸리티"
      ],
      "features": [
        "특정 기간 크랙 사용 및 획득 내역 조회",
        "조회 속도 3단계 조절 기능",
        "내역 요약 및 달력 뷰 제공",
        "조회 결과 CSV 파일 저장",
        "반응형 UI 지원"
      ],
      "aliases": [
        "크랙 알리바이",
        "Crack Alibi"
      ],
      "tags": [
        "크래커내역조회",
        "영수증"
      ],
      "platforms": {
        "pc": "yes",
        "mobile": "yes",
        "evidence": {
          "pc": "verified",
          "mobile": "verified"
        }
      },
      "performance": {
        "pc": "medium",
        "mobile": "medium",
        "evidence": "verified"
      },
      "relations": {
        "conflictsWith": [],
        "requires": [],
        "goodWith": []
      },
      "version": "1.0.5",
      "installUrl": "https://raw.githubusercontent.com/Dflashh/Crack/main/Archive/CrackAlibi.user.js",
      "file": "",
      "namespace": "",
      "match": [],
      "grant": [],
      "runAt": "",
      "lastTestedAt": "2026-08-03",
      "updatedAt": "2026-08-03T04:47:42.618Z",
      "history": [],
      "creatorNote": "크랙 API 제한으로 인해 최근 1년 내역만 조회할 수 있습니다.",
      "introductionPage": {
        "url": "https://gall.dcinside.com/mini/board/view/?id=wrtnw&no=231353",
        "label": "나 그날 뭐 했는데? 알리바이 확프 (유사빨간약)"
      },
      "originalSource": {
        "url": "",
        "label": "",
        "author": "",
        "note": ""
      },
      "recommendation": {
        "enabled": false,
        "label": "추천",
        "priority": 0
      },
      "presentation": {
        "coverImageUrl": "",
        "coverImageAlt": "",
        "coverImageCreditUrl": "",
        "coverImageCreditLabel": ""
      }
    },
    {
      "id": "Crack-UI-Plus",
      "status": "active",
      "name": "Crack UI Plus",
      "summary": "뤼튼 크랙(Crack) 웹사이트의 인터페이스를 개선하고 다양한 편의 기능을 제공하는 확장 스크립트입니다.",
      "description": "상단바, 채팅 목록, 채팅방 설정 메뉴를 자동 숨김 처리하여 화면을 넓게 사용할 수 있습니다. 하단 모델 변경 버튼, 빈 메시지 전송 방지, 소설형 UI 모델 표시, 이미지 크기 및 대화창 폭 조절 등 세밀한 설정이 가능합니다. 톱니바퀴 아이콘을 눌러 전용 설정 패널에서 모든 기능을 쉽게 켜고 끌 수 있습니다.",
      "categories": [
        "UI 개선",
        "편의성",
        "커스터마이징"
      ],
      "features": [
        "상단바",
        "채팅 목록",
        "채팅방 설정 자동 숨김 및 제스처 호출",
        "전용 UI 설정 패널 제공",
        "대화창 폭 및 이미지 크기 조절",
        "입력창 옆 하단 모델 변경 버튼 추가",
        "빈 메시지 전송 방지 (스토리 자동 재생 방지)",
        "소설형 UI 응답 모델 표시 및 수동 지정",
        "움짤(GIF) 썸네일 자동 재생 정지",
        "스탯창 및 상황 이미지 숨김",
        "줄바꿈 최적화 및 전체화면 버튼 지원"
      ],
      "aliases": [
        "Crack UI+",
        "크랙 UI 플러스"
      ],
      "tags": [
        "ui",
        "ux"
      ],
      "platforms": {
        "pc": "yes",
        "mobile": "yes",
        "evidence": {
          "pc": "verified",
          "mobile": "verified"
        }
      },
      "performance": {
        "pc": "medium",
        "mobile": "medium",
        "evidence": "verified"
      },
      "relations": {
        "conflictsWith": [
          "crack-mobile-utility"
        ],
        "requires": [],
        "goodWith": []
      },
      "version": "2.5.5",
      "installUrl": "https://raw.githubusercontent.com/Dflashh/Crack/main/Archive/CrackUI.user.js",
      "file": "",
      "namespace": "",
      "match": [],
      "grant": [],
      "runAt": "",
      "lastTestedAt": "2026-08-03",
      "updatedAt": "2026-08-03T05:01:50.263Z",
      "history": [],
      "creatorNote": "뤼튼 크랙 플랫폼의 DOM 구조와 네트워크 요청을 분석하여 동작하므로, 사이트 업데이트 시 일부 기능이 제한될 수 있습니다.",
      "introductionPage": {
        "url": "https://gall.dcinside.com/mini/wrtnw/234066",
        "label": "크랙 UI Plus"
      },
      "originalSource": {
        "url": "",
        "label": "",
        "author": "",
        "note": ""
      },
      "recommendation": {
        "enabled": false,
        "label": "추천",
        "priority": 0
      },
      "presentation": {
        "coverImageUrl": "",
        "coverImageAlt": "",
        "coverImageCreditUrl": "",
        "coverImageCreditLabel": ""
      }
    },
    {
      "id": "Transcendental-AI",
      "status": "active",
      "name": "✨ 크랙 초월 번역기",
      "summary": "AI 메시지를 자연스러운 웹소설 문체로 번역하고 즉시 교체해 주는 스크립트입니다.",
      "description": "크래커와 토큰 절감을 위해 본문 메시지를 영어로 출력 후 채팅방의 메시지 말풍선에 번역 버튼을 추가하여 최신 답변을 감지하고 Gemini API를 통해 번역합니다. 번역된 텍스트를 팝업에서 확인 및 수정하거나 즉시 원본 메시지와 교체할 수 있습니다. 키워드 치환, 프롬프트 수정, 이미지 링크 보호 등 롤플레잉에 최적화된 다양한 편의 기능을 제공합니다.",
      "categories": [
        "번역",
        "채팅",
        "도구"
      ],
      "features": [
        "Google API 및 Firebase를 통한 Gemini 모델 연동",
        "말풍선 내 번역 버튼 주입 및 즉시 교체 기능",
        "한글 전용 및 영문 혼용 번역 프롬프트 지원",
        "번역 결과 팝업 및 재번역(다시 돌리기) 기능",
        "특정 단어를 바꾸는 키워드 치환 슬롯",
        "마크다운 코드 블록 및 이미지 링크 마스킹 보호",
        "토큰 사용량 기반 예상 비용 알림"
      ],
      "aliases": [
        "크랙 초월 번역기",
        "Crack Translator"
      ],
      "tags": [
        "번역"
      ],
      "platforms": {
        "pc": "yes",
        "mobile": "yes",
        "evidence": {
          "pc": "verified",
          "mobile": "verified"
        }
      },
      "performance": {
        "pc": "medium",
        "mobile": "medium",
        "evidence": "verified"
      },
      "relations": {
        "conflictsWith": [],
        "requires": [],
        "goodWith": []
      },
      "version": "3.4",
      "installUrl": "https://github.com/h-ap5/crack-translator/raw/refs/heads/main/crack-translator.user.js",
      "file": "",
      "namespace": "",
      "match": [],
      "grant": [],
      "runAt": "",
      "lastTestedAt": "2026-08-03",
      "updatedAt": "2026-08-03T05:11:06.591Z",
      "history": [],
      "creatorNote": "사용을 위하여 AI 메시지 본문을 영어로 출력해야합니다.",
      "introductionPage": {
        "url": "https://github.com/h-ap5/crack-translator",
        "label": "크랙 초월 번역기"
      },
      "originalSource": {
        "url": "",
        "label": "",
        "author": "",
        "note": ""
      },
      "recommendation": {
        "enabled": false,
        "label": "추천",
        "priority": 0
      },
      "presentation": {
        "coverImageUrl": "",
        "coverImageAlt": "",
        "coverImageCreditUrl": "",
        "coverImageCreditLabel": ""
      }
    },
    {
      "id": "Summary-Memo-Editor",
      "status": "active",
      "name": "요약 메모리 텍스트 편집기",
      "summary": "장기 요약 메모리를 한 번에 편집하고 관리할 수 있는 텍스트 편집기입니다.",
      "description": "채팅방의 장기 요약 메모리를 텍스트 에디터 형태로 불러와 일괄 수정, 추가, 삭제할 수 있습니다. 변경 사항을 미리보기로 확인한 뒤 저장하여 메모리를 효율적으로 관리할 수 있습니다.",
      "categories": [
        "편의성",
        "UI/UX"
      ],
      "features": [
        "장기 요약 메모리 일괄 불러오기 및 편집",
        "텍스트 에디터 기반의 메모리 추가",
        "수정",
        "삭제",
        "형식 오류 및 글자 수 초과 실시간 하이라이트",
        "변경 사항(Diff) 미리보기 제공",
        "다크 모드 스타일 지원"
      ],
      "aliases": [
        "크랙 요약 메모리 텍스트 편집기"
      ],
      "tags": [
        "크랙",
        "wrtn",
        "메모리",
        "요약",
        "편집기"
      ],
      "platforms": {
        "pc": "yes",
        "mobile": "unknown",
        "evidence": {
          "pc": "verified",
          "mobile": "unknown"
        }
      },
      "performance": {
        "pc": "light",
        "mobile": "unknown",
        "evidence": "verified"
      },
      "relations": {
        "conflictsWith": [],
        "requires": [],
        "goodWith": []
      },
      "version": "1.2.1",
      "installUrl": "https://github.com/hamster4762/crack-summary-editor/raw/refs/heads/main/crack-summary-editor.user.js",
      "file": "",
      "namespace": "",
      "match": [],
      "grant": [],
      "runAt": "",
      "lastTestedAt": "2026-08-03",
      "updatedAt": "2026-08-03T05:14:50.625Z",
      "history": [],
      "creatorNote": "version 관리방식: 크랙UI변경.기능추가및수정.핫픽스",
      "introductionPage": {
        "url": "https://github.com/hamster4762/crack-summary-editor",
        "label": "크랙 장기 요약 메모리 편집기"
      },
      "originalSource": {
        "url": "",
        "label": "",
        "author": "",
        "note": ""
      },
      "recommendation": {
        "enabled": false,
        "label": "추천",
        "priority": 0
      },
      "presentation": {
        "coverImageUrl": "",
        "coverImageAlt": "",
        "coverImageCreditUrl": "",
        "coverImageCreditLabel": ""
      }
    },
    {
      "id": "Novel-Theme-Model-Icon",
      "status": "active",
      "name": "소설형 채팅모델 인식",
      "summary": "뤼튼 크랙의 채팅 메시지 하단에 사용된 AI 모델의 고유 아이콘을 표시하는 스크립트입니다.",
      "description": "소설형UI에서 각 채팅 메시지에 사용된 AI 모델을 파악하고, 메시지 좌측 하단에 해당 모델의 아이콘을 뱃지로 추가합니다. 자동 인식이 부정확할 경우 아이콘을 클릭해 팝업 메뉴에서 수동으로 모델을 지정할 수 있습니다. 수동으로 설정한 모델 정보는 브라우저의 로컬 스토리지에 저장되어 유지됩니다.",
      "categories": [
        "편의성",
        "인터페이스"
      ],
      "features": [
        "채팅 메시지 하단에 사용 모델 아이콘 표시",
        "네트워크 응답 가로채기를 통한 모델 정보 자동 수집",
        "아이콘 클릭 시 수동 모델 선택 팝업 제공",
        "수동 지정 모델 정보 로컬 스토리지 저장"
      ],
      "aliases": [
        "크랙 모델 아이콘",
        "채팅모델 인식"
      ],
      "tags": [
        "소설형UI",
        "모델",
        "아이콘"
      ],
      "platforms": {
        "pc": "yes",
        "mobile": "yes",
        "evidence": {
          "pc": "verified",
          "mobile": "verified"
        }
      },
      "performance": {
        "pc": "light",
        "mobile": "light",
        "evidence": "verified"
      },
      "relations": {
        "conflictsWith": [],
        "requires": [],
        "goodWith": []
      },
      "version": "2.1.2",
      "installUrl": "https://gist.github.com/sw12937oz-cpu/ae328304f1c86dd322a1da80bdac1746/raw/329ddd4e050849f553dbbfc45e6ece97af85e49b/crack-model-icon.user.js",
      "file": "",
      "namespace": "",
      "match": [],
      "grant": [],
      "runAt": "",
      "lastTestedAt": "2026-08-03",
      "updatedAt": "2026-08-03T05:18:32.680Z",
      "history": [],
      "creatorNote": "채팅형UI에서도 뜨는 버그가 있습니다.",
      "introductionPage": {
        "url": "https://gall.dcinside.com/mini/wrtnw/230899",
        "label": "소개 페이지"
      },
      "originalSource": {
        "url": "",
        "label": "",
        "author": "",
        "note": ""
      },
      "recommendation": {
        "enabled": false,
        "label": "추천",
        "priority": 0
      },
      "presentation": {
        "coverImageUrl": "",
        "coverImageAlt": "",
        "coverImageCreditUrl": "",
        "coverImageCreditLabel": ""
      }
    },
    {
      "id": "Layout-Resizer",
      "status": "active",
      "name": "UI 레이아웃 조절기",
      "summary": "채팅창 너비 조절 및 컴팩트 모드를 지원하는 레이아웃 커스텀 스크립트입니다.",
      "description": "채팅창, 프로필 모달, 유저노트 모달, 최대 출력량 조절 모달의 너비를 슬라이더로 자유롭게 조절할 수 있습니다. 컴팩트 모드를 켜면 이미지와 텍스트를 나란히 배치하여 공간을 절약하며, 강제 스크롤 차단 기능도 포함되어 있습니다.",
      "categories": [
        "UI/UX",
        "편의성"
      ],
      "features": [
        "채팅 컬럼 너비 조절",
        "대화 프로필 모달 너비 조절",
        "유저노트 모달 너비 조절",
        "최대 출력량 조절 모달 너비 조절",
        "컴팩트 모드 지원 (이미지-텍스트 병렬 배치)",
        "채팅 강제 스크롤 차단",
        "플로팅 UI 패널 제공"
      ],
      "aliases": [
        "Crack 레이아웃 조절기"
      ],
      "tags": [
        "레이아웃",
        "너비조절",
        "컴팩트",
        "스크롤차단",
        "UI"
      ],
      "platforms": {
        "pc": "yes",
        "mobile": "unknown",
        "evidence": {
          "pc": "verified",
          "mobile": "unknown"
        }
      },
      "performance": {
        "pc": "light",
        "mobile": "unknown",
        "evidence": "verified"
      },
      "relations": {
        "conflictsWith": [],
        "requires": [],
        "goodWith": []
      },
      "version": "1.6.0",
      "installUrl": "https://github.com/brianlee0329-alt/Wrtn-Extension/raw/refs/heads/main/Crack%20%EB%A0%88%EC%9D%B4%EC%95%84%EC%9B%83%20%EC%A1%B0%EC%A0%88%EA%B8%B0.user.js",
      "file": "",
      "namespace": "",
      "match": [],
      "grant": [],
      "runAt": "",
      "lastTestedAt": "2026-08-03",
      "updatedAt": "2026-08-03T05:21:23.822Z",
      "history": [],
      "creatorNote": "Tyme",
      "introductionPage": {
        "url": "https://gall.dcinside.com/wrtnai/1042108",
        "label": "ㄹㅇ이가ㅏㅏㅏㅏㅏㅏㅏㅏㅏ"
      },
      "originalSource": {
        "url": "",
        "label": "",
        "author": "",
        "note": ""
      },
      "recommendation": {
        "enabled": false,
        "label": "추천",
        "priority": 0
      },
      "presentation": {
        "coverImageUrl": "",
        "coverImageAlt": "",
        "coverImageCreditUrl": "",
        "coverImageCreditLabel": ""
      }
    },
    {
      "id": "Message-Overrider",
      "status": "active",
      "name": "AI 메시지 글자수 제한 해제",
      "summary": "AI 메시지를 글자수 제한 없이 강제로 수정할 수 있는 스크립트입니다.",
      "description": "채팅방 내 AI 메시지 하단 툴바에 강제 수정 버튼을 추가합니다. 버튼을 누르면 나타나는 모달 창에서 글자수 제한 없이 메시지를 수정하고 API를 통해 즉시 적용할 수 있습니다. 수정 후에는 자동으로 새로고침되어 변경 사항이 반영됩니다.",
      "categories": [
        "채팅",
        "유틸리티"
      ],
      "features": [
        "AI 메시지 하단 툴바에 강제 수정 버튼 추가",
        "글자수 제한 없는 메시지 수정 모달 제공",
        "API를 통한 메시지 직접 수정 및 자동 새로고침"
      ],
      "aliases": [
        "Message Overrider",
        "AI 전용 강제 수정기"
      ],
      "tags": [
        "메시지수정",
        "강제수정"
      ],
      "platforms": {
        "pc": "yes",
        "mobile": "unknown",
        "evidence": {
          "pc": "verified",
          "mobile": "unknown"
        }
      },
      "performance": {
        "pc": "light",
        "mobile": "unknown",
        "evidence": "inferred"
      },
      "relations": {
        "conflictsWith": [],
        "requires": [],
        "goodWith": []
      },
      "version": "1.3.1",
      "installUrl": "https://gist.github.com/lyb5382/ffac8ca8ec8f455f6c0e51c0b1f88c89/raw/7c02531370f1748acc39720a540a8855a34ec345/Message_Overrider.user.js",
      "file": "",
      "namespace": "",
      "match": [],
      "grant": [],
      "runAt": "",
      "lastTestedAt": "2026-08-03",
      "updatedAt": "2026-08-03T05:25:54.157Z",
      "history": [],
      "creatorNote": "서버 400 에러 방지 및 AI 메시지만 수정 가능하도록 변경",
      "introductionPage": {
        "url": "https://gall.dcinside.com/wrtnai/1009809",
        "label": "메시지 글자 수 제한 해제 확프"
      },
      "originalSource": {
        "url": "",
        "label": "",
        "author": "",
        "note": ""
      },
      "recommendation": {
        "enabled": false,
        "label": "추천",
        "priority": 0
      },
      "presentation": {
        "coverImageUrl": "",
        "coverImageAlt": "",
        "coverImageCreditUrl": "",
        "coverImageCreditLabel": ""
      }
    }
  ]
};
