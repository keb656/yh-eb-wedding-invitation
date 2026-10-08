/**
 * dist/ 폴더를 GitHub의 gh-pages 브랜치에 그대로 올립니다.
 * 사용: npm run deploy  (빌드 후 자동 실행)
 */
import { execSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'

const run = (cmd, cwd = 'dist') => execSync(cmd, { cwd, stdio: 'inherit' })
const remote = execSync('git remote get-url origin').toString().trim()

writeFileSync('dist/.nojekyll', '')
run('git init -q -b gh-pages')
run('git add -A')
run('git commit -q -m "Deploy to GitHub Pages"')
run(`git push -f ${remote} gh-pages`)
console.log('\n배포 완료 → 1~2분 후 GitHub Pages에 반영됩니다.')
