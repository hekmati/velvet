const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const {getLoader, loaderNameMatches} = require('react-app-rewired');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const rewireLess = require('react-app-rewire-less');
const rewireDefinePlugin = require('react-app-rewire-define-plugin');
const git = require('git-rev-sync');

const styledComponentsTransformer = createStyledComponentsTransformer();

function createTsLoader() {
  return {
    loader: require.resolve('ts-loader'),
    options: {
      configFile: 'tsconfig.build.json',
      getCustomTransformers: () => ({
        before: [
          styledComponentsTransformer,
          tsImportPluginFactory({
            libraryDirectory: 'es',
            libraryName: 'antd',
            // This will prevent Ant from using pre-complied CSS in order for us to inject LESS variables.
            style: true,
          }),
        ],
      }),
      transpileOnly: true,
    },
  };
}

module.exports = function override(config, env) {
  config.module.rules.push({
    enforce: 'pre',
    test: /\.js$/,
    use: ['source-map-loader'],
  });

  const tsLoader = getLoader(config.module.rules, rule => loaderNameMatches(rule, 'ts-loader'));

  const updatedLoader = createTsLoader();
  tsLoader.loader = updatedLoader.loader;
  tsLoader.options = updatedLoader.options;

  // TsconfigPathsPlugin is not needed, and will kill the build.
  const pathsPluginIdx = config.resolve.plugins.findIndex(plugin => plugin instanceof TsconfigPathsPlugin);
  config.resolve.plugins.pop(pathsPluginIdx);

  // Fix the checker to use the correct file.
  const checkerPluginIdx = config.plugins.findIndex(plugin => plugin instanceof ForkTsCheckerWebpackPlugin);
  config.plugins[checkerPluginIdx] = new ForkTsCheckerWebpackPlugin({tsconfig: 'tsconfig.build.json'});

  // Inline the git version so it is accessible by frontend code.
  config = rewireDefinePlugin(config, env, {
    'process.env.VERSION': `'${git.short('../../..')}'`,
  });

  config = rewireLess.withLoaderOptions({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#00a2ae', // Antd primary color override. https://medium.com/@GeoffMiller/how-to-customize-ant-design-with-react-webpack-the-missing-guide-c6430f2db10f
      '@icon-url': '"/font_zck90zmlh7hf47vi"', // Fetch icons locally instead of Alibaba CDN - see https://ant.design/docs/react/customize-theme
      '@font-size-base': '12px', // We'd like to keep old (pre-3) ant font size
      '@font-size-sm': '10px',
    },
  })(config, env);

  return config;
};
