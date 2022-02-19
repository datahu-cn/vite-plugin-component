# Vite Plugin: vite-plugin-component

Vite 插件，用于开发 Data Hu 自定义可视化组件，

## Installation

```
yarn add @datahu/ite-plugin-component -D
```

## Usage

```ts
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {vitePluginComponent} from '@datahu/vite-plugin-component'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vitePluginComponent()]
})
```

### Sample

[https://github.com/datahu-cn/component-template](https://github.com/datahu-cn/component-template)

### Install

```
yarn
```

### Build plugin

```
yarn build
```
