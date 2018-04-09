import React from "react";

export default () => {
  return (
    <div>
      <h1>Hey, Nice To Meet You!</h1>
      <section>
        <p>
          My name is Maksim Ivanov, I'm 27 years old and have a dog and two cats
          and I'm <strong>addicted to programming</strong>.
          <img src="/assets/images/me.png" />
        </p>
        <p>
          First thing that I <strong>developed was a small game</strong> about a
          mouse trapped inside a maze. I'm not sure if that project could be
          qualified as a game, because there really was no way to win it, you
          could only fall into a trap or catch a bullet and the level would
          start over.😅.
        </p>
        <p>
          During my school years{" "}
          <strong>
            I used to help my classmates with our computer science classes
          </strong>. And in my spare time I developed small flash games.
        </p>
        <p>
          When it was time to select a university{" "}
          <strong>I chose the one that was closest to my mother's house</strong>.
          It was State Marine Technical University. At that moment, I was
          already working as a programmer in a small team developing casual
          games for social networks. As I wasn't really interested in getting a
          degree – I would often skip classes and as a result I{" "}
          <strong>dropped out during my third year of education.</strong>
        </p>
        <p>
          It didn't upset me, because{" "}
          <strong>I was finally able to focus on programming</strong> and
          building my software development career.
        </p>
        <p>
          Since then I worked in several great companies, met lots of amazing
          people and developed all kinds of software from browser and mobile
          games, to web applications and video streaming services.
        </p>
        <p>
          <strong>
            Today I would love to help you with your programming career.
          </strong>
        </p>
        <p>
          In this blog I share tips, tricks and{" "}
          <strong>useful tutorials</strong> on modern frontend technologies.
        </p>
        <p>
          You can find me on{" "}
          <a href="https://twitter.com/satansdeer">twitter</a> or{" "}
          <a href="https://github.com/satansdeer">github</a>
        </p>
        <p>
          <strong>Feel free to join my mailing list</strong> where I share even
          more great stuff and I will never-ever send you spam.😉
        </p>
      </section>
      <div id="mc_embed_signup">
        <form
          action="https://maksimivanov.us12.list-manage.com/subscribe/post?u=fdcb5a4b4a6cbb9721227a48f&amp;id=fa1a88a0d0"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          class="validate"
          target="_blank"
          novalidate
        >
          <div id="mc_embed_signup_scroll">
            <h2>Subscribe to my mailing list</h2>
            <div class="mc-field-group">
              <label for="mce-NAME">Name: </label>
              <input
                type="text"
                value=""
                name="NAME"
                class="required"
                id="mce-NAME"
              />
            </div>
            <div class="mc-field-group">
              <label for="mce-EMAIL">Email: </label>
              <input
                type="email"
                value=""
                name="EMAIL"
                class="required email"
                id="mce-EMAIL"
              />
            </div>
            <div id="mce-responses" class="clear">
              <div
                class="response"
                id="mce-error-response"
                style={{ display: "none" }}
              />
              <div
                class="response"
                id="mce-success-response"
                style={{ display: "none" }}
              />
            </div>
            <div
              style={{ position: "absolute", left: "-5000px" }}
              aria-hidden="true"
            >
              <input
                type="text"
                name="b_fdcb5a4b4a6cbb9721227a48f_fa1a88a0d0"
                tabindex="-1"
                value=""
              />
            </div>
            <div class="clear">
              <input
                type="submit"
                value="Subscribe"
                name="subscribe"
                id="mc-embedded-subscribe"
                class="button"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
