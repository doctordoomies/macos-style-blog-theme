---
layout: minimal_post
title: "한국어 글 예시"
categories: [notes]
date: 2026-09-04 09:00:00 +0900
description: "화면 문구는 영어지만 글은 어떤 언어로 써도 됩니다. 한국어 글이 어떻게 보이는지 보여 주는 예시입니다."
---

화면의 메뉴와 앱 문구는 영어지만, 글은 어떤 언어로 써도 괜찮습니다. 맥에서는 한글을
Apple SD Gothic Neo 로, 맥이 아닌 기기에서는 Pretendard 로 그립니다.

## 글 쓰기

`_posts` 폴더에 `YYYY-MM-DD-제목.md` 파일을 만들고, 맨 위에 머리말을 적습니다.

```yaml
---
layout: minimal_post
title: "글 제목"
categories: [notes]
date: 2026-09-04 09:00:00 +0900
description: "목록 · 검색 · 공유 미리보기에 보이는 한 줄 요약"
---
```

## 카테고리

카테고리는 `_data/categories.yml` 에 있습니다. `name` 은 화면에 보이는 이름이고,
`ko` 에 한국어 이름을 적어 두면 Spotlight 에서 한국어로 찾아도 걸립니다.

## 마치며

본문, 표, 코드, 인용문 모두 영어 글과 같은 모양으로 보입니다. 이 글은 지워도 됩니다.
