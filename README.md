## AvansKeuzeKompas Front-End

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## When you make some changes to the `scss` file, you might run the following command

```sh
# This command wil watch the .scss file and live compiles it to .css when you made some changes to it
# Beside that, it behave like a normal npm run dev command

npm run start:dev
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Useful documentation about used packages:
> [svelte-loading-spinners](https://github.com/Schum123/svelte-loading-spinners?tab=readme-ov-file)
> [demo-of-svelte-loading-spinners](https://schum123.github.io/svelte-loading-spinners/)
