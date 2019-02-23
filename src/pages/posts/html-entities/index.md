---
title: Html Entities
date: 2019-02-23T01:58:45.284Z
categories: HTML
image: html_entities.jpg
---

HTML entities are strigns inside HTML code that start with ampersand `&` and end with semicolon `;`. They allow you to add wide variety of characters to your HTML code.

For example `<` and `>` characters are reserved in HTML because they are used to enclose HTML tags. But if you need to display one of them on the page you can use `&gt;` to display `>` and `&lt;` for `<`.

HTML entities can be referenced by name, like we did with `&gt;` and `&lt`, but they also have numeric references: **hexadecimal** and **decimal**.

For examle `&gt;` can also be referenced as `&#62;` and `&lt;` can be referenced as `&#60;`.

Some of the entities don't have named reference and can only be referenced by their decimal or hexadecimal reference. Like for example celsius sign `&#8451;`

Here is a list of some popular HTML entities:

| Character | Entity                  | Hexadecimal   | Decimal   | Name             |
|-----------|-------------------------|---------------|-----------|------------------|
| ©         | `&copy;`                | `&#x000A9;`   | `&#169;`  | COPYRIGHT SIGN   |
| ®         | `&reg;` `&circledR;`    | `&#x000AE;`   | `&#174;`  | REGISTERED SIGN  |
| ™         | `&trade;`               | `&#x02122;`   | `&#8482;` | TRADE MARK SIGN  |
| >         | `&gt;`                  | `&#x0003E;`   | `&#62;`   | GREATER-THAN SIGN|
| <         | `&lt;`                  | `&#x0003C;`   | `&#60;`   | LESS-THAN SIGN   |
| ;         | `&semi;`                | `&#x0003B;`   | `&#59;`   | SEMICOLON        |
| &         | `&amp;`                 | `&#x00026;`   | `&#38;`   | AMPERSAND        |
| "         | `&quot;`                | `&#x00022;`   | `&#34;`   | QUOTATION MARK   |
| #         | `&num;`                 | `&#x00023;`   | `&#35;`   | NUMBER SIGN      |
| ★         | `&starf;` `&bigstar;`   | `&#x02605;`   | `&#9733;` | BLACK STAR       |
| ☆         | `&star;`                | `&#x02606;`   | `&#9734;` | WHITE STAR       |
| ✂         |                         | `&#x02702;`   | `&#9986;` | BLACK SCISSORS   |
| ✓         | `&check;` `&checkmark;` | `&#x02713;`   |	`&#10003;`|	CHECK MARK       |
| ✗         | `&cross;`               | `&#x02717;`   |	`&#10007;`|	BALLOT X         |
| ✩         |                         |`&#x02729;`    |	`&#10025;`|	STRESS OUTLINED WHITE STAR
| ✪         |                         |`&#x0272A;`    |	`&#10026;`|	CIRCLED WHITE STAR
| ❞         |                         |`&#x0275E;`    |	`&#10078;`|	HEAVY DOUBLE COMMA QUOTATION MARK ORNAMENT
| ❤         |                         |`&#x02764;`    |	`&#10084;`|	HEAVY BLACK HEART
| ←         | `&larr;` `&leftarrow;` `&LeftArrow;` `&slarr;` `&ShortLeftArrow;` |`&#x02190;`|`&#8592;` |	LEFTWARDS ARROW
| ↑         | `&uarr;` `&uparrow;` `&UpArrow;` `&ShortUpArrow;`	| `&#x02191;`	| `&#8593;`	| UPWARDS ARROW
| →         | `&rarr;` `&rightarrow;` `&RightArrow;` `&srarr;` `&ShortRightArrow;` | `&#x02192;` | `&#8594;`| RIGHTWARDS ARROW
| ↓         | `&darr;` `&downarrow;` `&DownArrow;` `&ShortDownArrow;`| `&#x02193;`| `&#8595;`| DOWNWARDS ARROW
| €         | `&euro;`| `&#x020AC;`| `&#8364;`|EURO SIGN
| ▶         | 	|`&#x025B6;`|	`&#9654;`	|BLACK RIGHT-POINTING TRIANGLE
| ▽         | `&xdtri;` `&bigtriangledown;`|	`&#x025BD;`|	`&#9661;`|	WHITE DOWN-POINTING TRIANGLE
| ◉         | 	|`&#x025C9;`	|`&#9673;`|	FISHEYE
| ∑         | `&sum; &Sum;`	|`&#x02211;`|	`&#8721;`	|N-ARY SUMMATION
| ℹ         | 	|`&#x02139;`|	`&#8505;`	|INFORMATION SOURCE
| №         | `&numero;`	|`&#x02116;`|	`&#8470;`|	NUMERO SIGN
| ℗         | `&copysr;`	|`&#x02117;`|	`&#8471;`	|SOUND RECORDING COPYRIGHT
| ℃         | |	`&#x02103;`|	`&#8451;`|	DEGREE CELSIUS
| ℉         | |	`&#x02109;`|	`&#8457;`|	DEGREE FAHRENHEIT 
