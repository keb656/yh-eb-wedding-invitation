# KIM YOUNGHWAN & KIM EUNBI — Mobile Wedding Invitation

React + Vite 모바일 청첩장.

## 실행

```bash
npm install
npm run dev      # 개발 서버
npm run build    # 배포용 빌드 (dist/)
npm run preview  # 빌드 결과 확인
```

## 데이터 / 사진 교체

모든 텍스트·정보는 **`src/data/wedding.js`** 한 곳에서 관리합니다.

| 항목 | wedding.js |
| --- | --- |
| 이름 / 부모님 | `couple`, `parents` |
| 날짜 / 시간 | `wedding` (캘린더·D-Day는 `start`/`end` 기준) |
| 예식장 / 지도 링크 | `venue`, `mapUrls` |
| 네이버 지도 임베드 | `naverMap` (`clientId`·좌표 입력, 설정 방법은 주석 참고) |
| 지하철 / 셔틀 / 버스 | `subway`, `shuttle`, `busStops` |
| 대절버스 | `charterBus` |
| 계좌번호 | `accounts` |
| 초대 문구 / 스토리 타임라인 | `invitation`, `story` |
| 신랑·신부 소개 | `couple.groom.intro`, `couple.bride.intro` |
| 사진 | `images`, `galleryImages` |
| 스냅 이벤트 | `snapEvent`, `SNAP_UPLOAD_ENDPOINT`, `snapConfig` |
| 메뉴 (영문·한글 제목) | `sections` |

사진은 `src/assets/images/`에 넣고 `wedding.js` 상단의 import 경로만 바꾸면 됩니다.

## 스냅 업로드 (Google Drive)

1. `docs/snap-upload-apps-script.gs` 내용을 Google Apps Script에 붙여넣고 웹 앱으로 배포
2. 발급된 `/exec` URL을 `SNAP_UPLOAD_ENDPOINT`에 입력

URL이 설정되기 전에는 데모 모드로 동작합니다(실제 전송 없음).
