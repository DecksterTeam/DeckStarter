({
    mainConfigFile : "js/main.js",
    appDir: "./",
    baseUrl: "js",
    removeCombined: true,
    findNestedDependencies: true,
    dir: "dist",
    optimize: "none",
    optimizeCss: "standard",
    modules: [
        {
            name: "main"
        }
    ],
    paths: {
    },
    generateSourceMaps: true
})