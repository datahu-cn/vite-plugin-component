import type {Plugin} from 'vite'
import externalGlobals from 'rollup-plugin-external-globals'

/**
 * Inject the CSS compiled with JS.
 *
 * @return {Plugin}
 */
export function vitePluginComponent(
  {topExecutionPriority} = {topExecutionPriority: true}
): Plugin {
  return {
    apply: 'build',
    enforce: 'post',
    name: 'datahu-vite-plugin-component',
    config() {
      return {
        esbuild: {
          keepNames: true
        },
        build: {
          lib: {
            entry: 'index.ts',
            formats: ['es'],
            fileName: 'index'
          },
          rollupOptions: {
            external: ['vue', '@datahu/core', '@datahu/component-base'],
            plugins: [
              externalGlobals({
                vue: 'Vue',
                '@datahu/core': 'DatahuCore',
                '@datahu/component-base': 'DatahuComponentBase'
              })
            ]
          },
          sourcemap: true
        }
      }
    },
    generateBundle(opts: any, bundle: any) {
      let styleCode = ''

      for (const key in bundle) {
        if (bundle[key]) {
          const chunk = bundle[key]

          if (chunk.type === 'asset' && chunk.fileName.includes('.css')) {
            styleCode += chunk.source
            delete bundle[key]
          }
        }
      }

      for (const key in bundle) {
        if (bundle[key]) {
          const chunk = bundle[key]

          if (chunk.type === 'chunk' && chunk.fileName.includes('.js')) {
            let topCode: string = ''
            let bottomCode: string = ''
            if (topExecutionPriority) {
              bottomCode = chunk.code
            } else {
              topCode = chunk.code
            }

            chunk.code = `${topCode}(function(){ try {var elementStyle = document.createElement('style'); elementStyle.innerText = \`${styleCode}\`; document.head.appendChild(elementStyle);} catch(e) {console.error(e, 'vite-plugin-css-injected-by-js: error when trying to add the style.');} })();${bottomCode}`

            break
          }
        }
      }
    }
  }
}
