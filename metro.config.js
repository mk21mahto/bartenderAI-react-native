const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const { mergeConfig } = require("@react-native/metro-config");
const { createSentryMetroSerializer } = require("@sentry/react-native/dist/js/tools/sentryMetroSerializer");

const config = getDefaultConfig(__dirname);

const sentryConfig = {
  serializer: {
    customSerializer: createSentryMetroSerializer(),
  },
};

const mergedConfig = mergeConfig(config, sentryConfig);

module.exports = withNativeWind(mergedConfig, { input: "./src/global.css" });