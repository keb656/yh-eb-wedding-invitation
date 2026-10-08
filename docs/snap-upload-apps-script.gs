/**
 * WEDDING SNAP 업로드용 Google Apps Script (예시)
 *
 * 1. Google Drive에 사진을 받을 폴더를 만들고, 폴더 URL의 ID를 아래 FOLDER_ID에 넣습니다.
 * 2. script.google.com 에서 새 프로젝트를 만들고 이 코드를 붙여넣습니다.
 * 3. 배포 > 새 배포 > 유형: 웹 앱
 *    - 실행 사용자: 나
 *    - 액세스 권한: 모든 사용자
 * 4. 발급된 /exec URL을 src/data/wedding.js 의 SNAP_UPLOAD_ENDPOINT 에 넣습니다.
 *
 * 프론트엔드 요청 형식 (Content-Type: text/plain, body는 JSON 문자열)
 *   { filename, mimeType, data: base64, uploader, phone }
 */

const FOLDER_ID = 'YOUR_DRIVE_FOLDER_ID'

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents)
    const bytes = Utilities.base64Decode(body.data)
    const blob = Utilities.newBlob(bytes, body.mimeType || 'image/jpeg', body.filename || 'snap.jpg')
    const file = DriveApp.getFolderById(FOLDER_ID).createFile(blob)
    // 이벤트 선정 시 연락을 위해 보낸 사람 정보를 파일 설명에 기록
    file.setDescription('From: ' + (body.uploader || '-') + ' / Tel: ' + (body.phone || '-'))
    return json({ ok: true, id: file.getId() })
  } catch (error) {
    return json({ ok: false, error: String(error) })
  }
}

function json(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON)
}
