/**
 * 청첩장에 들어가는 모든 텍스트 / 데이터 / 사진은 이 파일에서 관리합니다.
 * 실제 값으로 교체할 때는 이 파일만 수정하면 됩니다.
 *
 * 사진 교체 방법
 *  1. 사진 파일을 src/assets/images/ 에 넣습니다. (예: groom.jpg)
 *  2. 아래 import 경로를 새 파일명으로 바꿉니다.
 *     import groomPhoto from '../assets/images/groom.jpg'
 */

import groomPhoto from '../assets/images/groom.svg'
import bridePhoto from '../assets/images/bride.svg'
import gallery01 from '../assets/images/gallery-01.svg'
import gallery02 from '../assets/images/gallery-02.svg'
import gallery03 from '../assets/images/gallery-03.svg'
import gallery04 from '../assets/images/gallery-04.svg'
import gallery05 from '../assets/images/gallery-05.svg'
import gallery06 from '../assets/images/gallery-06.svg'
import gallery07 from '../assets/images/gallery-07.svg'
import gallery08 from '../assets/images/gallery-08.svg'

/* =========================================================
   PHOTOS
========================================================= */

export const images = {
  // 임시 Hero 사진 (외부 URL). 실제 사진은 import 한 변수로 교체하세요.
  // 예) import heroPhoto from '../assets/images/hero.jpg'  →  hero: heroPhoto
  hero: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85',
  heroAlt: '김영환과 김은비의 웨딩 사진',
  groom: groomPhoto,
  bride: bridePhoto,
}

/**
 * 갤러리 사진
 * layout: 'full' → 화면 가로 전체 / 'half' → 두 장씩 나란히
 * ('half'는 두 개씩 연속으로 두면 가장 자연스럽습니다.)
 */
export const galleryImages = [
  { src: gallery01, alt: '웨딩 사진 1', layout: 'full' },
  { src: gallery02, alt: '웨딩 사진 2', layout: 'half' },
  { src: gallery03, alt: '웨딩 사진 3', layout: 'half' },
  { src: gallery04, alt: '웨딩 사진 4', layout: 'full' },
  { src: gallery05, alt: '웨딩 사진 5', layout: 'half' },
  { src: gallery06, alt: '웨딩 사진 6', layout: 'half' },
  { src: gallery07, alt: '웨딩 사진 7', layout: 'full' },
  { src: gallery08, alt: '웨딩 사진 8', layout: 'full' },
]

/* =========================================================
   COUPLE & PARENTS
========================================================= */

export const couple = {
  groom: { role: 'GROOM', roleKo: '신랑', name: '김영환', nameEn: 'KIM YOUNGHWAN' },
  bride: { role: 'BRIDE', roleKo: '신부', name: '김은비', nameEn: 'KIM EUNBI' },
}

export const parents = {
  groom: { father: '김해원', mother: '김미정', relation: '차남', child: '김영환' },
  bride: { father: '김선정', mother: '이미경', relation: '장녀', child: '김은비' },
}

/* =========================================================
   DATE & VENUE
========================================================= */

export const wedding = {
  // 반드시 한국 시간(+09:00) 기준 ISO 형식으로 입력
  start: '2027-01-09T13:00:00+09:00',
  // 캘린더 저장 시 종료 시간 (예식 + 식사 기준 예상)
  end: '2027-01-09T15:00:00+09:00',
  dateEn: '2027.01.09 SAT',
  timeEn: '01:00 PM',
  dateKo: '2027년 1월 9일 토요일',
  timeKo: '오후 1시',
}

export const venue = {
  name: '연세대학교 동문회관 웨딩홀 The Bless',
  nameEn: 'THE BLESS',
  placeEn: 'YONSEI ALUMNI HALL',
  address: '서울특별시 서대문구 연세로 50',
}

/** 지도 링크 — 실제 공유 URL로 교체하세요. */
export const mapUrls = {
  naver: 'https://map.naver.com/p/search/%EC%97%B0%EC%84%B8%EB%8C%80%ED%95%99%EA%B5%90%20%EB%8F%99%EB%AC%B8%ED%9A%8C%EA%B4%80',
  kakao: 'https://map.kakao.com/link/search/%EC%97%B0%EC%84%B8%EB%8C%80%ED%95%99%EA%B5%90%20%EB%8F%99%EB%AC%B8%ED%9A%8C%EA%B4%80',
  // 지도 임베드(iframe) URL. 비워두면 지도 자리에 placeholder가 표시됩니다.
  embed: '',
}

/* =========================================================
   TRANSPORTATION
========================================================= */

export const subway = [
  { line: '경의중앙선', detail: '신촌역 2번출구 도보 10분' },
  { line: '2호선', detail: '이대역' },
]

export const shuttle = [
  { label: '예식 전', route: '이대역 3번출구 → 동문회관', times: ['12:20', '12:40'] },
  { label: '예식 후', route: '동문회관 B1 → 이대역 3번출구', times: ['14:10', '14:30'] },
]

export const busStops = [
  {
    stop: '이대후문',
    buses: ['M7119', 'M7111', 'M7154', '7737', '7111', '6714', '6011', '750A', '750B', '710', '700', '672', '673', '606', '601', '470', '272'],
  },
  {
    stop: '이대부중',
    buses: ['7024', '7017', '742'],
  },
]

/** 대절버스 — 확정되면 값만 바꿔주세요. */
export const charterBus = {
  toVenue: {
    title: '예식장행',
    departPlace: '추후 안내 예정',
    departTime: '추후 안내 예정',
  },
  toDaejeon: {
    title: '대전행',
    departPlace: '추후 안내 예정',
    departTime: '추후 안내 예정',
    arrivePlace: '추후 안내 예정',
    arriveTime: '추후 안내 예정',
  },
  note: '대절버스 이용을 원하시는 분은 신랑·신부에게 미리 알려주세요.',
}

/* =========================================================
   ACCOUNTS — 실제 계좌번호로 교체하세요.
========================================================= */

export const accounts = [
  {
    side: 'GROOM',
    title: '신랑측',
    items: [
      { role: '신랑', name: '김영환', bank: '은행명', number: '000-0000-0000-00' },
      { role: '신랑 아버지', name: '김해원', bank: '은행명', number: '000-0000-0000-00' },
    ],
  },
  {
    side: 'BRIDE',
    title: '신부측',
    items: [
      { role: '신부', name: '김은비', bank: '은행명', number: '000-0000-0000-00' },
      { role: '신부 아버지', name: '김선정', bank: '은행명', number: '000-0000-0000-00' },
    ],
  },
]

/* =========================================================
   TEXT
========================================================= */

export const invitation = {
  lead: ['하나님의 은혜로 만난 두 사람이', '이제 평생을 함께하려 합니다.'],
  faith: ['함께하는 시간이 더해질수록', '신앙도 함께 성숙해지기를 꿈꿨습니다.'],
  verse: {
    intro: '저희의 중심 말씀은 빌립보서 4장입니다.',
    text: '그리하면 모든 지각에 뛰어난 하나님의 평강이 그리스도 예수 안에서 너희 마음과 생각을 지키시리라',
    ref: 'PHILIPPIANS 4:7',
  },
  body: [
    ['소중한 분들을 모시고 기쁜 마음으로', '새로운 출발을 함께 나누고 싶습니다.'],
    ['귀한 걸음으로 함께하시어', '따뜻한 마음으로', '축복해 주시면 감사하겠습니다.'],
  ],
}

export const story = {
  paragraphs: [
    ['저희는 결혼한 동아리 친구 부부의 소개로', '처음 만났습니다.'],
    ['처음 만난 뒤 4년 동안 함께 시간을 보내며', '서로를 알아가고,', '하나님 안에서 함께 성장해왔습니다.'],
    ['그리고 이제', '평생을 함께하기로 약속합니다.'],
  ],
}

/* =========================================================
   SNAP UPLOAD
========================================================= */

/**
 * Google Apps Script Web App URL (배포 후 /exec 로 끝나는 주소).
 * 'YOUR_DEPLOYMENT_ID'가 포함되어 있으면 데모 모드(실제 전송 없음)로 동작합니다.
 * 서버 예시 코드: docs/snap-upload-apps-script.gs
 */
export const SNAP_UPLOAD_ENDPOINT = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec'

export const snapConfig = {
  maxFiles: 30, // 한 번에 선택 가능한 최대 장수
  maxDimension: 2000, // 압축 시 긴 변 최대 px
  quality: 0.82, // JPEG 품질 (0~1)
}

/* =========================================================
   NAVIGATION
========================================================= */

export const sections = [
  { id: 'invitation', label: 'INVITATION' },
  { id: 'wedding-day', label: 'WEDDING DAY' },
  { id: 'location', label: 'LOCATION' },
  { id: 'bus', label: 'BUS' },
  { id: 'account', label: 'ACCOUNT' },
  { id: 'snap', label: 'SNAP' },
  { id: 'our-story', label: 'OUR STORY' },
  { id: 'wedding', label: 'WEDDING' },
]
