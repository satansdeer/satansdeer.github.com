# copywriting.md

A standardized framework for high-quality, human-sounding copywriting that avoids LLM clichés and overused patterns.

## Core Principles

### Voice and Tone
- Write like a real person talking clearly and directly
- Use plain English with natural, specific wording
- Prefer conversational over corporate language
- Make sentences sound natural when read aloud
- Use contractions naturally (don't force them, but don't avoid them)

### Structural Guidelines
- Start with the actual point (no throat-clearing intros)
- Use shorter, cleaner sentences with varied structure
- Choose simple words over inflated alternatives
- Cut phrases that add polish but not meaning
- Replace vague buzzwords with direct language
- Active voice unless passive genuinely serves meaning

### Specificity Over Abstraction
- Show concrete examples, not abstract claims
- Use specific details instead of generic benefits
- Provide proof, not just assertions
- Include real numbers, names, and situations when possible
- Write to one specific person, not "audiences"

## Forbidden Patterns

### LLM-Specific Anti-Patterns

**Antithetical Parallelism**
- ❌ "It's not X, it's Y"
- ❌ "X isn't just about Y"
- ❌ "X is more than just Y"
- ❌ "X goes beyond Y"
- ✅ Instead: Make the point directly with specific details

**Anaphora (Repetitive Openings)**
- ❌ Three+ consecutive sentences starting the same way
- ❌ "This allows... This enables... This helps..."
- ✅ Instead: Vary sentence structure naturally

**Double Negations**
- ❌ "Don't underestimate the power of..."
- ❌ "Never overlook the importance of..."
- ❌ "Can't be overstated"
- ✅ Instead: State positively and directly

**Em-Dash Overuse**
- ❌ Using em-dashes for dramatic effect or emphasis
- ✅ Use only for genuine parenthetical breaks (sparingly)

**Frame-Setting Constructions**
- ❌ "Let's dive in"
- ❌ "Let's unpack this"
- ❌ "Imagine a world where..."
- ❌ "The [X] of [Y]" (e.g., "The Symphony of Success")
- ✅ Instead: Start with the actual content

**Fake Transitions**
- ❌ "In today's fast-paced/ever-evolving world"
- ❌ "In conclusion / In summary / In essence"
- ❌ "It's important to note"
- ❌ "Moreover / Furthermore" (use: also, plus, and)
- ✅ Instead: Just make the point or use simple connectors

**Broetry (Dramatic Short Lines)**
- ❌ Breaking normal sentences into
- ❌ Dramatic fragments
- ❌ For artificial impact
- ✅ Instead: Use real sentence structure

## Forbidden Words & Replacements

### High-Priority Bans

| Avoid | Use Instead |
|-------|-------------|
| Delve | Explore, look into, dig into |
| Tapestry | Mix, combination, how it all fits |
| Leverage | Use, apply |
| Utilize | Use |
| Robust solution | Solid plan, strong setup |
| Seamlessly integrated | Easy to connect, works well with |
| Harness the power of | Use, tap into |
| Navigate the complexities | Deal with, work through |
| Multifaceted | Complex, layered, a few moving parts |
| Nuanced | Specific, detailed, not straightforward |

### Corporate Buzzwords

| Avoid | Use Instead |
|-------|-------------|
| Cutting-edge | New, latest, advanced |
| Revolutionary / Revolutionize | Meaningful, actually changed things |
| Transformative | Big shift, real change |
| Game-changing | Useful, high-impact, worth your time |
| Unlock (your potential) | Just say what it actually does |
| Empowering | Helping, enabling |
| At the forefront of innovation | Leading in X, known for X |
| Pivotal | Key, important, the one that matters |

### Filler & Fluff

| Avoid | Use Instead |
|-------|-------------|
| Testament | Sign, proof, good example |
| Certainly! | Sure — or just answer |
| Nestled | Located, sitting, right next to |
| Realm | Area, field, world, space |
| Landscape (metaphorical) | Industry, sector, environment |
| Symphony | Mix, blend, coordination |
| Beacon | Example, guide, leader |
| Journey (metaphorical) | Process, experience, path |
| Plethora / Multitude | Many, plenty, a lot |
| Indeed | Yes, actually, or cut entirely |

### Banned Phrases (Never Use)

- "In today's fast-paced world"
- "In today's ever-evolving landscape"
- "Cannot be overstated"
- "No fluff / Cut the fluff" (ironic filler)
- "Overall, ..." (as conclusion opener)
- "By focusing on..." (as conclusion)
- "It's not just about X, it's about Y"
- "Let's dive in"
- "Let's unpack this"
- "Imagine a world where..."
- "The key takeaway is..."

## Structural Standards

### Lists vs. Paragraphs
- Use lists for multiple facts, steps, features, comparisons
- Use paragraphs for context and narrative
- Don't repeat content in intro and list items
- Keep intros to 0-1 sentence

### List Formatting
- Numbers when sequence matters; bullets (-) otherwise
- One item per line, no indentation
- Sentence capitalization
- Periods only for complete sentences
- All bullets top-level (never nested)
- If sub-points needed, fold inline or create new section

### Paragraph Formatting
- Separate with blank lines
- Max 5 sentences per paragraph
- Varied sentence length and structure

### No Summaries or Conclusions
- Avoid "In conclusion" or "To sum up" sections
- End on the strongest point, not a recap
- Tables are for comparison, not summary

## Writing Quality Checks

### Pre-Publication Review

Search content for these patterns and remove:
1. **"Just"** - Often signals negation structure
2. **Em-dashes** - Count and justify each use
3. **Consecutive same-structure sentences** - Check first 3 words
4. **Banned words** - Run against forbidden list
5. **Vague claims** - Replace with specific examples
6. **Competitor-agnostic statements** - Add unique proof

### Voice Verification

Ask yourself:
- Could a competitor say this exact thing? (If yes, add specifics)
- Does this sound like a human conversation? (If no, simplify)
- Can I read this aloud naturally? (If no, restructure)
- Did I start with fluff or the actual point? (Cut throat-clearing)

## Mathematical Expressions

- Use LaTeX: `\( \)` for inline, `\[ \]` for block
- Never use $ or $$
- Treat prices, percentages, dates as regular text, not LaTeX

## Implementation Notes

This standard is designed for:
- LLM system prompts and instructions
- Human copywriter style guides
- Content review checklists
- Automated content validation

**Usage**: Include relevant sections in your agent prompts, append to `design.md` or `agents.md` as needed, and use the forbidden words list as a post-processing filter.

---

**Version**: 1.0  
**Based on**: Stackedo AI Writing Clichés Guide, Blake Stockton's "Don't Write Like AI" series, Reddit r/WritingWithAI anti-cliché framework  
**Last Updated**: May 2026
