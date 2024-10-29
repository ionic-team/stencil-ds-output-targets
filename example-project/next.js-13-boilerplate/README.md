# Next.js 13 Storyblok Boilerplate

This repository is a Next.js 13 [Storyblok](https://www.storyblok.com) starter template used in following [5 minute tutorial](https://www.storyblok.com/tp/add-a-headless-cms-to-next-js-13-in-5-minutes).

## Requirements

To use this project you have to have a Storyblok account. If you don't have one yet you can register at [Storyblok](https://www.storyblok.com), it's free.

## How to get started?

Read the [Next.js tutorial](https://www.storyblok.com/tp/add-a-headless-cms-to-next-js-13-in-5-minutes) about connecting Storyblok and Next.js.

This repo has two branches. The [main](https://github.com/storyblok/next.js-13-boilerplate/tree/main) branch contains the code to configure Storyblok with Live Editing Support which is the default appraoch and the [full-server-side](https://github.com/storyblok/next.js-13-boilerplate/tree/full-server-side) branch contains to code to configure Storyblok using full React Server Side Components. If you want to see that, switch to [full-server-side](https://github.com/storyblok/next.js-13-boilerplate/tree/full-server-side) branch.

### 1. Clone the repo

```sh
  $ git clone https://github.com/storyblok/next.js-13-boilerplate.git
```

### 2. Install all dependecies 
```sh
$  npm install # or yarn
```

### 3. Adding the Access token
Create a new empty Space and exchange the preview token with your own in ```app/layout.js``` and ```components/StoryblokProvider.js```

```js
// in app/layout.js
storyblokInit({
  accessToken: "your-preview-token",
  use: [apiPlugin],
});
```

```js
// in components/StoryblokProvider.js
storyblokInit({
  accessToken: "your-preview-token",
  use: [apiPlugin],
  components
});
```

### 4. Run your project
Set the preview domain in <strong>Storyblok</strong> to `https://localhost:3000/`

```sh
# to run in developer mode
$ yarn dev # or npm run dev
```

```sh
# to build your project
$ yarn build # or npm run build
```



## Resources

- [Next.js docs](https://nextjs.org/docs/#setup)
- [Next.js 13 and Storyblok Tutorial](https://www.storyblok.com/tp/add-a-headless-cms-to-next-js-13-in-5-minutes)



  