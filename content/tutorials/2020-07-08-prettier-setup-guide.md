---
templateKey: blog-post
title: Prettier Code Formatter Setup Guide
slug: prettier-setup-guide
date: 2020-07-08T17:07:42.326Z
dateModified: 2020-07-08T17:07:42.380Z
description: Tutorial for setting up prettier in your JavaScript web
  applications for automatic layout formatting to save time and effort.
featuredPost: false
category: Tools
tags:
  - Prettier
  - Setup
  - Tools
featuredImage: /img/prettier_setup_guide.jpg
---
Prettier is a code formatter that works with several languages including CSS, JavaScript,
and React. Prettier is opinionated, in that it makes certain stylistic choices for you
such as when to make a new line.  
&nbsp;  
Prettier is one of the most useful tools recently as it allows developers to focus on the logic of their code, and not the
spacing. There is even an option to use Prettier whenever you save VS Code!

## Prettier Install

Add Prettier to your project with the command

```bash
npm install --save-dev prettier
```

Alternatively, you can install Prettier globally with

```bash
npm install --global prettier
```

## Format Script

Once prettier is installed, format text by adding a `format` script to the `package.json`
file
```json
{
  "format": "prettier --write \"\*_/_.+(js|json)\""
}
```


This `format` command will adjust your code whenever it is stylistically different than
prettier's base rules. Since prettier is only moving around the position of your code, it
is not at risk of breaking it. This example will format `.js` and `.json` files, although you can additional file types here, separated by a `|`.

## Config File

Prettier comes with basic configuration, which you can add by creating a `.prettierrc`
file in the root of your project. There are about 15-20 properties which you can set
including `tabWidth`, `semi`, `singleQuote`, etc. For example here is a basic prettier
config,

```json
{
  "trailingComma": "all",
  "tabWidth": 2,
  "semi": false,
  "singleQuote": true
}
```

For a full list of config options, check out the
[Prettier Playground](https://prettier.io/playground/). The playground allows you to
select, preview, and copy the JSON object with your settings. &nbsp;

> You can alternatively include your configuration in the`package.json` file under a
> "prettier" key

## VSCode Extension

This extension is the real heavyweight in the room when it comes to usefulness. Install
the **Prettier - Code Formatter** extension by
[Esben Petersen](https://github.com/esbenp). Once it is installed, open your JSON settings
ad add

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```

> Access the JSON Settings by opening the command palette (Ctrl + Shift + p for Windows,
> cmd + shift + p for Mac). Then type in **settings** and select `Open Settings (JSON)`.

This will set prettier as your default formatter, and **automatically** format your code
on save!

## Ignoring Paths

You can tell prettier to ignore certain files and folders adding a `.prettierignore` file
to the root of your project. This works exactly the same as `.gitignore`, ignoring the
paths specified line by line.  
&nbsp;  
Alternatively you can add an `--ignore-path .gitignore` flag to the command so prettier
ignores the paths in your `.gitignore` file.

## Configure with ESLint

Prettier's rules can sometimes conflict with ESLint. If you are also using ESLint in your
application, install the `eslint-config-prettier` package, and add it to the **end** of
the _extends_ array in your `.eslintrc`.

### Conclusion
Prettier makes code formatting effortless and it is a welcome tool in many developers kit. Being able to focus on code, rather than formatting greatly increases efficiency.