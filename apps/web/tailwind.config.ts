import type { Config } from "tailwindcss";

import baseConfig from "@finance-app/tailwind-config";

export default {
  content: ["./src/**/*.tsx"],
  presets: [baseConfig],
  plugins: [require("daisyui")],
} satisfies Config;
