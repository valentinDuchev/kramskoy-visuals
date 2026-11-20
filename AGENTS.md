<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Writing rule: no long dashes (read this before any work)

This rule applies to every task in this repository, without exception.

Never write the em dash (U+2014) or the en dash (U+2013) anywhere in this repository. That covers
page copy, page titles, meta descriptions, alt text, JSON-LD, emails, translations, code comments,
docs, commit messages and AI prompts. It also covers their HTML entities (`&mdash;`, `&ndash;`) and
escape codes. Clients and their customers read long dashes as a sign of AI-written text.

Use instead:

- Brand and tagline in a page title: a pipe. `Brand | Tagline`
- Inside a sentence: a normal hyphen with spaces (`open daily - even Sundays`), or rewrite the
  sentence with a comma, colon or full stop.
- Ranges of numbers, times or days: a plain hyphen without spaces. `08:00-20:00`, `10-20 €`, `Пн-Пт`
- An empty value in a table or field: `-`

Text that AI writes at runtime follows the same rule: every prompt that produces visible text must
tell the model not to use long dashes.

Before committing, this must print nothing (tool-managed blocks between `<!-- BEGIN:` and
`<!-- END:` markers and applied database migrations are the only exceptions):

```bash
git grep -nP '(*UTF)\x{2014}|\x{2013}|&mdash;|&ndash;'
```
