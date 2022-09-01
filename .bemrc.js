module.exports = {
    root: true,
    modules: {
        "bem-tools": {
            plugins: {
                create: {
                techs: ["tsx", "module.scss"],
                    levels: {
                        "src/components/": {
                            default: true
                        }
                    }
                }
            }
        }
    }
};