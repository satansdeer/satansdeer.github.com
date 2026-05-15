const PAGES_HOST = "maksimivanov-com.pages.dev";

export default {
  fetch(request) {
    const url = new URL(request.url);
    url.hostname = PAGES_HOST;
    url.protocol = "https:";

    return fetch(new Request(url, request));
  },
};
