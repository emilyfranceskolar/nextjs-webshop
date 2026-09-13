import nextVitals from "eslint-config-next/core-web-vitals";

const config = [
  ...nextVitals,
  { ignores: ["generated/**", "tmp/**", "coverage/**"] },
];

export default config;
