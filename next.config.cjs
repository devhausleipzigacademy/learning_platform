/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import withNextIntl from 'next-intl/plugin'
await import("./src/env.js");


/** @type {import('next').NextConfig} */
const config = {
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname
  }
};

module.exports = withNextIntl()(config);
