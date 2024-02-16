"use strict";

const build = require("@microsoft/sp-build-web");

build.addSuppression(
  `Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`
);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set("serve", result.get("serve-deprecated"));

  return result;
};

// add babel-loader and some transforms to handle es2021 language features which are unsupported in webpack 4 by default
const litFolders = [
  "node_modules/lit/",
  "node_modules/@lit/",
  "node_modules/lit-html/"
];
build.configureWebpack.mergeConfig({
  additionalConfiguration: generatedConfiguration => {
    generatedConfiguration.module.rules.push({
      test: /\.js$/,
      // only run on lit packages in the root node_module folder
      include: resourcePath =>
        litFolders.some(litFolder => resourcePath.includes(litFolder)),
      use: {
        loader: "babel-loader",
        options: {
          plugins: [
            "@babel/plugin-transform-optional-chaining",
            "@babel/plugin-transform-nullish-coalescing-operator",
            "@babel/plugin-transform-logical-assignment-operators"
          ]
        }
      }
    });
    return generatedConfiguration;
  }
});

build.initialize(require("gulp"));
