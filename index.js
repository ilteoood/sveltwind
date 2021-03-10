#!/usr/bin/env node

const {execSync} = require("child_process");
const {readFileSync, writeFileSync} = require("fs");

const installDependencies = () => {
    console.log("1) I'm going to install the required dependencies");
    execSync("npm install", {stdio: 'inherit'});
    execSync("npm install -D tailwindcss postcss autoprefixer svelte-preprocess postcss-load-config", {stdio: 'inherit'});
}

const generateConfig = () => {
    console.log("2) I'm going to generate the required configurations");
    execSync("npx tailwindcss init -p", {stdio: 'inherit'});
}

const createTailwindConfig = () => {
    console.log("3) I'm going to create the configuration file for Tailwind");
    writeFileSync('./tailwind.config.js', 'module.exports={purge:{enabled:!process.env.ROLLUP_WATCH,content:["./public/index.html","./src/**/*.svelte"],options:{defaultExtractor:e=>[...e.match(/[^<>"\'`\\s]*[^<>"\'`\\s:]/g)||[],...e.match(/(?<=class:)[^=>\\/\\s]*/g)||[]]}},darkMode:!1,theme:{extend:{}},variants:{extend:{}},plugins:[]};');
}

const editRollupConfig = () => {
    console.log("4) I'm going to activate postcss in rollup");
    const rollupConfigPosition = './rollup.config.js';
    const rollupConfigContent = readFileSync(rollupConfigPosition, 'utf-8').replace("sveltePreprocess({", "sveltePreprocess({ postcss: true,");
    writeFileSync(rollupConfigPosition, rollupConfigContent);
}

const finish = () => {
    console.log("Here you go! Now you can use the @tailwind directive in your global style!");
}

installDependencies();
generateConfig();
createTailwindConfig();
editRollupConfig();
finish();
