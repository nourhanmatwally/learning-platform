import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import nextPlugin from "@next/eslint-plugin-next";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      react: pluginReact,
      "@next/next": nextPlugin
    },
    rules: {
      ...js.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,

      // قواعد React و Next.js اللي عطلناها
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/no-unescaped-entities": "off",
      "react/no-unknown-property": "off",

      // تحويل الإيرورات لتحذيرات
      "no-unused-vars": "warn", // متغيرات معرفة لكن مش مستخدمة
      "no-empty": "warn", // كتل فارغة
      "no-undef": "warn", // متغيرات غير معرفة زي ActiveXObject و Bun
      "no-prototype-builtins": "warn", // استخدام دوال زي hasOwnProperty
      "no-cond-assign": "warn", // تعيين في شرط
      "no-self-assign": "warn", // تعيين متغير لنفسه
      "no-control-regex": "warn", // استخدام أحرف تحكم في regex
      "no-fallthrough": "warn", // حالات switch بدون break
      "no-redeclare": "warn", // إعادة تعريف متغيرات

      // قواعد Next.js
      "@next/next/no-assign-module-variable": "warn", // بدل "error"
      "@next/next/no-img-element": "warn", // استخدام <img> بدل <Image>
    },
    settings: {
      react: {
        version: "detect" // ESLint يكتشف إصدار React تلقائيًا
      }
    }
  }
];