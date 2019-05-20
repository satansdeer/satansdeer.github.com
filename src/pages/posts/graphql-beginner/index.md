---
title: Fullstack GraphQL Beginner Tutorial - Instagram Clone
date: 2019-05-20T01:58:45.284Z
categories: Graphql
image: generators.jpg
---

In this tutorial, we'll build a simple Instagram clone using React and GraphQL. In our version, it will only contain cat pictures.

GraphQL allows you to fetch data using **Queries** and update it using **Mutations**. Today we'll focus on fetching data. We'll create both backend and frontend.

We'll get a list of images with comments and display them as a feed.

Here's how it will look:

<!-- Copy and Paste Me -->

<div class="glitch-embed-wrap" style="height: 420px; width: 100%;">
  <iframe
    allow="geolocation; microphone; camera; midi; vr; encrypted-media"
    src="https://glitch.com/embed/#!/embed/kittengram-client?path=README.md&previewSize=100&attributionHidden=true"
    alt="kittengram-client on Glitch"
    style="height: 100%; width: 100%; border: 0;">
  </iframe>
</div>

## Why Use GraphQL

Over the years, [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) has become the standard for designing web APIs. It offers some great ideas, such as **stateless servers** and **structured access to resources**.

But designing a good **REST API** is a challenging task. It requires a good understanding of both **REST** architectural style and solid knowledge of **HTTP** protocol.

One of the usual problems with **REST APIs** is inefficient fetching.

For example, it can be **under-fetching**. When you don't have enough data from one endpoint and it requires you to do multiple round-trips to collect everything that is needed

Let's consider a blog example. It has posts and each post can have multiple comments.

In **REST API**, one has to gather the required information from multiple endpoints. In order to fetch the content of a blog post and its comments, a client would have to first fetch a particular post and then request another endpoint for comments based on post `id` for every post.

Here we first get the post with `id` 1 to get its title (and maybe other fields, like `content`).

```js
GET someblog.com/posts/1;

// Which will return
{
  id: 1,
  title: "Hello, it's my first post";
  //... maybe other fields
}
```

Now to get comments we make another call to our API:

```js
GET someblog.com/posts/1/comments;

// Which will return
[
  {
    id: 1,
    text: "Great post!"
  },
  {
    id: 2,
    text: "First one!"
  }
]
```

In **GraphQL**, this can be achieved with a single instance query.

```js
GET /graphql?query={ post(id: "1") { title, comments { text } } }

{
  "title": "Hello, it's my first post",
  "comments": [
    {
      text: "Great post!"
    },
    {
      text: "First one!"
    }
  ]
}
```

Using **GraphQL** it's way easier to design a good API. It requires less thinking upfront and allows you to work on your queries and optimize them as you go.

Now let's get back to our **Kittengram** example, and we'll start with backend.

## Making Backend

There are a bunch of Javascript libraries to write your GraphQL backend.

Among them [GraphQL.js](https://graphql.org/graphql-js/), [express-graphql](https://graphql.org/graphql-js/running-an-express-graphql-server/) and [apollo-server](https://www.apollographql.com/docs/apollo-server/).

We'll use [apollo-server](https://www.apollographql.com/docs/apollo-server/) to build our GraphQL backend.

### Step 1: Initialize project

In this step, we'll use your terminal create a directory `kittengram-server` and initialize simple **Node.js** app there.

* First, create a folder `kittengram-server` using the `mkdir` command.

  ```
  mkdir kittengram-server
  ```

* Enter the directory.

  ```
  cd kittengram-server
  ```

* Initialize new **Node.js** project using `npm`.

  ```
  npm init --yes
  ```

If everything is fine you should see the `package.json` file in your directory.

### Step 2: Install dependencies

Next, we'll install two dependencies which are necessary for responding to GraphQL requests:

* `apollo-server`: The Apollo server library. Does all the heavy lifting. Allows us to focus on defining the shape of our data.
* `graphql`: The library used to build a schema and to execute queries on that schema.

Run the following command to install both of these dependencies and save them in the project:

```
npm i --save apollo-server graphql
```

### Step 3: Create the server

* Open the `kittengram-server` directory using your IDE/editor.
* Create a new file called `index.js` in the root of the project directory.
* "Copy" and "Paste" the following code into the `index.js` file:

  ```js
  const { ApolloServer, gql } = require("apollo-server");

  const photos = [
    {
      author: "🐈 Nala",
      url:
        "https://cataas.com/cat/cute/says/Apollo%20is%20awesome?size=50&color=magenta",
      comments: [
        {
          author: "Coco",
          text: "Meow meow"
        },
        {
          author: "Gracie",
          text: "Meow meow meow"
        }
      ]
    },
    {
      author: "🐱 Loki",
      url:
        "https://cataas.com/cat/cute/says/GraphQL%20is%20awesome?size=50&color=magenta",
      comments: [
        {
          author: "Jasper",
          text: "Meow"
        },
        {
          author: "Oreo",
          text: "Meow meow"
        },
        {
          author: "Tiger",
          text: "Meow"
        }
      ]
    }
  ];

  const typeDefs = gql`
    type Comment {
      author: String
      text: String
    }

    type Photo {
      author: String
      url: String
      comments: [Comment]
    }

    type Query {
      photos: [Photo]
    }
  `;

  const resolvers = {
    Query: {
      photos: () => photos
    }
  };

  const server = new ApolloServer({ typeDefs, resolvers });

  server.listen().then(({ url }) => {
    console.log(`🐱  Server ready at ${url}`);
  });
  ```

### Step 4: Start the server

Our application is ready to start.

* Run the `index.js` file we created in the previous step using Node.js

  ```
  node index.js
  ```

  You should see the following output:

  ```
  🐱  Server ready at http://localhost:4000/
  ```

* Open the address provided in your web browser.

  If everything is working, you should see the **GraphQL Playground explorer tool**, similar to one below

  _The GraphQL Playground below is interactive so you can use it to play around_

<!-- Copy and Paste Me -->

<div class="glitch-embed-wrap" style="height: 420px; width: 100%;">
  <iframe
    allow="geolocation; microphone; camera; midi; vr; encrypted-media"
    src="https://glitch.com/embed/#!/embed/kittengram-server?path=.gitignore&previewSize=100&attributionHidden=true"
    alt="kittengram-server on Glitch"
    style="height: 100%; width: 100%; border: 0;">
  </iframe>
</div>

### Step 5: Run your first query

At this point, you'll be able to start sending queries to the GraphQL server using GraphQL Playground, which is split into two parts:

* The request (on the left)
* The response (on the right)

There is also a play button in the middle that makes it look like a video player, but it's used to perform requests.

Enter the following query on the left side of the window, and press that **Play** button.

```js
{
  photos {
    url
    author
    comments {
      author
      text
    }
  }
}
```

This query asks for a list of posts, including the url, author and list of comments for each post.

Now it's time to work on the frontend.

## Making Frontend

There are several libraries available to work with GraphQL on a client. Most popular of them are [Relay](https://facebook.github.io/relay/) and [Apollo](https://www.apollographql.com/).

We'll use Apollo with `apollo-boost` to simplify the setup.

### Step 1: Application setup

In this tutorial, we'll set up our application using `create-react-app`.

* Create `kittengram-client` application.

  ```
  npx create-react-app kittengram-client
  ```

  Here I've used `npx` command to run `create-react-app`. You can run `create-react-app` directly if you have it installed locally.

  > `npx` is an npm package runner. It is available with `NodeJS` installation since version `6.0`. It's often being used to run one-time commands without installing them first. But it can be used for other tasks too, read more about it [here](https://www.npmjs.com/package/npx)

### Step 2: Install dependencies

As I've mentioned earlier we'll use `apollo-boost` in this project. We'll also use `react-apollo` to integrate GraphQL with React and `graphql` to parse queries.

Let's install these packages.

```
npx i --save apollo-boost react-apollo graphql
```

### Step 3: Create client

After we have all the dependencies installed - we need to initialize GraphQL client. The only argument it requires is the endpoint of your GraphQL server we've set up earlier (in our case `http://localhost:4000`).

* Open your `index.js` file, import `ApolloClient` from `apollo-boost` and initialize the new client passing `http://localhost:4000` as `url` property.

  ```js
  import ApolloClient from "apollo-boost";

  const client = new ApolloClient({
    uri: "https://localhost:4000"
  });
  ```

* You can verify that `client` is set up properly by sending a test query.

  ```js
  import { gql } from "apollo-boost";

  client
    .query({
      query: gql`
        {
        photos {
          url
          author
          comments {
            author
            text
          }
        }
      `
    })
    .then(result => console.log(result));
  ```

### Step 4: Integrate React

To connect Apollo Client to React, we'll use the `ApolloProvider`. It works just like React Context provider, you can read more about React Context API [here](https://maksimivanov.com/posts/react-context-api/)

* In `index.js`, wrap your `App` with an `ApolloProvider`.

  ```jsx
  import { ApolloProvider } from "react-apollo";

  render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById("root")
  );
  ```

### Step 5: Request data

Now you're ready to start requesting data with `Query` components!

`Query` component uses the render prop pattern to share GraphQL data with your UI.

* Add the following code to your `App.js` file.

  ```jsx
  import React from "react";
  import { Query } from "react-apollo";
  import { gql } from "apollo-boost";
  import "./App.css";

  const App = () => (
      <Query
        query={gql`
          {
            photos {
              url
              author
              comments {
                author
                text
              }
            }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          return data.photos.map(photo => (
            <div key={photo.url}>
              {photo.author}
              <img src={photo.url} alt={photo.author} />
              {photo.comments.map(comment => (
                <div>
                  {comment.author}: {comment.text}
                </div>
              ))}
            </div>
          ));
        }}
      </Query>
  );

  export default App;
  ```

  Here we pass a GraphQL query parsed by `gql` to `Query` component as `query` prop.

  Then we pass a function as `children` to `Query` component. This function expects to get `loading` state, `error` if it exists and `data` as props.

  We use destructuring assignment to get specific prop fields.
 
  And finally we map through photos to display cat images, and comments.

**You should see something like this:**

<!-- Copy and Paste Me -->
<div class="glitch-embed-wrap" style="height: 420px; width: 100%;">
  <iframe
    allow="geolocation; microphone; camera; midi; vr; encrypted-media"
    src="https://glitch.com/embed/#!/embed/kittengram-client-unstyled?path=src/App.js&previewSize=100&attributionHidden=true"
    alt="kittengram-client-unstyled on Glitch"
    style="height: 100%; width: 100%; border: 0;">
  </iframe>
</div>

### Step 6: Styling it up

In my example, I've used `styled-components` to add styles to my application. You can find the code for them in [this repo](https://github.com/satansdeer/kittengram-client)

## Conclusion

At this point, you should have functioning backend and frontend for a simple React GraphQL application. In this example, we used only `Queries` to fetch the data.

* [Frontend code](https://github.com/satansdeer/kittengram-client)
* [Backend code](https://github.com/satansdeer/kittengram-server)

In one of the next tutorials, we'll take a look at `Mutations` as a way to update data on the backend.