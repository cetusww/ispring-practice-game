import globals from "globals";
import pluginJs from "@eslint/js";


export default [
    {
        languageOptions: {globals: globals.browser},
        rules: {
            // Set all relevant rules to warning level
            "no-unused-vars": "warn",
            "no-console": "warn",
            "eqeqeq": "warn",
            // Add more rules as necessary
            // You can also set other rules to "warn" here
        },
    },
    pluginJs.configs.recommended,
    {
        rules: {
            // Set specific rules to warning level
            "no-unused-vars": "warn",
            "no-console": "warn",
            "eqeqeq": "warn",
            // Add more rules as necessary
        },
    },

];