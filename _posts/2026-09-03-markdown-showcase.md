---
layout: minimal_post
title: "Markdown showcase"
categories: [web]
date: 2026-09-03 09:00:00 +0900
description: "Headings, code, tables, quotes, lists and images, as they look inside a document window."
---

Everything below is plain Markdown (GitHub-flavoured, rendered by kramdown).

## Text

Paragraphs wrap at a comfortable width. You can use **bold**, *italic*,
~~strikethrough~~, `inline code` and [links](https://jekyllrb.com), and emoji ✨

> A blockquote is good for a quote, a warning, or a short summary of the section
> that follows.

## Lists

1. Ordered lists
2. keep their numbers
   - and can nest
   - unordered items

- [x] Task lists
- [ ] render as checkboxes

## Code

Code blocks get syntax highlighting and a copy button in the corner.

```java
public final class Greeter {
    public String greet(String name) {
        return "Hello, " + name + "!";
    }
}
```

```python
def fib(n: int) -> int:
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a
```

```sql
SELECT category, COUNT(*) AS posts
FROM posts
GROUP BY category
ORDER BY posts DESC;
```

## Tables

| Shortcut | Action |
| --- | --- |
| ⌘K | Spotlight |
| ⌥M | Minimize the front window |
| ⌥Tab | Switch apps |
| Esc | Close menus and Spotlight |

## Images

Put images in `assets/images/` and link them as usual. Click an image to zoom.

![The default wallpaper](/assets/images/wallpaper@2x.webp)

### A smaller heading

Level-three headings appear indented in the table of contents.
