---
layout: minimal_post
title: "Getting started: your blog in five minutes"
categories: [dev]
date: 2026-09-02 09:00:00 +0900
description: "Create your copy from the template, edit one config file, turn on GitHub Pages and write your first post."
---

You don't need to install anything to publish. GitHub builds the site for you.

## 1. Create your repository

Click **Use this template** on GitHub and name the new repository
`<your-username>.github.io`. That name gives you a site at
`https://<your-username>.github.io`.

## 2. Edit `_config.yml`

Open `_config.yml` and change the values at the top.

```yaml
title: Ephemeris            # shown on the lock screen, About This Mac and the tab
author: Your Name           # lock screen name, Notes, Mail and the footer
email: you@example.com      # where Mail sends visitors' messages (leave empty to hide)
url: "https://your-username.github.io"
description: A blog about the things I learn
```

Then go through the `desktop:` block: your terminal username, Wi-Fi name, the
city for the weather widget and so on. Every value has a comment next to it.

## 3. Turn on GitHub Pages

In your repository go to **Settings → Pages**, choose **Deploy from a branch**,
then pick `main` and `/ (root)`. A minute later your desktop is online.

## 4. Write a post

Add a Markdown file to `_posts/` named `YYYY-MM-DD-title.md`:

```markdown
---
layout: minimal_post
title: "My first post"
categories: [notes]
date: 2026-09-03 10:00:00 +0900
description: "One line that shows up in Finder, Spotlight and link previews."
---

Hello, desktop!
```

- `categories` takes one slug from `_data/categories.yml`.
- `description` is used in lists, search and social previews.
- Headings (`##`, `###`) become the table of contents in the sidebar.

## Run it locally (optional)

```bash
bundle install
bundle exec jekyll serve
```

Open <http://localhost:4000>. Changes to posts reload automatically, but you need
to restart the server after editing `_config.yml`.
