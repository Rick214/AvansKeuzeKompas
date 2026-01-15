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

## How to implement accessibility features

> Light/Dark mode: use the color variables from globals.scss like this, for example: "bg-(--color-bg)".
> Translations: use import { translations } from '$lib/stores/userPreferences' and then manually type out the Dutch and English text in the JSON files found in the lib/i18n folder.
> Text scaling: this is automatically applied when using the Tailwind CSS text sizes like "text-sm".

## Folder structure

> lib/api: put the API calls here by making a new file in the client and DTO for each different API endpoint.
> lib/components: put your Svelte page components here. The ui folder is for UI parts and layout is for the layout (things like a footer and header). Use components to keep the code readable and reusable.
> lib/data: you can use this for large blocks of code like the questions for the enquête.
> lib/i18n: put translation JSON files here if you want to add multiple languages.
> lib/stores: use this folder for things you need to store in session.
> lib/styles: if you need global CSS, use the scss/global.scss. Don’t use the CSS files; they are auto-generated.
> lib/utils: put utilities here.
> routes: this is the folder-based routing, so here you make the pages. You can use () to make groups (this doesn’t affect the URL). You can also use [] for routing parameters.
