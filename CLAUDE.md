# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 application built with Vite. The project uses modern Vue 3 composition API with `<script setup>` syntax and includes Vue DevTools for development.
**OpenTripMap World Explorer** is a global initiative that seeks to democratize access to cultural and touristic information worldwide. The platform leverages **open data sources** such as **OpenStreetMap, Wikidata, and Wikipedia**, and provides a **free public API** for developers.

To promote this platform, a web application must be developed that displays information about emblematic touristic destinations around the world. The data will be consumed from the following API endpoint: https://68d448d6214be68f8c68eb21.mockapi.io/api/v1/places

## Requirements
The development team has been tasked with implementing a **Vue 3 web application** that meets the following criteria:

- **PrimeVue**
    - Use primeVue for all the styles possibles
- **Home View**
    - Toolbar at the top:
        - Left: Logo (fetched from **Clearbit Logo API**) + Institution name.
        - Right: Language select buttons **EN | ES** to switch UI language.
    - Default interface language: **English**, with **internationalization support** via Vue-i18n.

- **Top Destinations View**
    - Displays **cards** with touristic places.
    - Includes a **filter by category** (category) to allow users to view destinations by type.
    - Each card must display:
        - `name`
        - `category`
        - `distance`
        - `infoUrl`
        - Image (from API, or placeholder if not available).
    - Each card includes a **“See Details”** button that opens the Wikipedia page (`infoUrl`) in a new browser tab.

- **Footer Section**
    - Line 1: `Copyright © 2025 OpenTripMap World Explorer, inc. All rights reserved.`
    - Line 2: `Developed by <Your Code>, Anderson Ventosilla.`

## Technical Constraints
- **Project Name:** `pc1nrcucode`
    - Where `nrc` is the NRC number and `code` is the student code (e.g., `pc17361u202019287`).
- **Frontend Framework:** Vue 3 (with Vite, Composition API).
- **UI Library:** PrimeVue (Material Design theme).
- **HTTP Client:** Axios (for API communication).
- **Internationalization:** Vue-i18n for EN | ES translations.
- **Accessibility:** Include **ARIA attributes** in views.
- **IDE Compatibility:** Must open seamlessly in **JetBrains WebStorm**.

## Architecture & Organization
The project must follow a **Domain-Driven**, **Layered**, and **Component-Based Architecture** with **Object-Oriented Programming** principles and **Design Patterns**:

- **Domains (Sub-domains):**
    - `shared` → General UI components (e.g., Home, Toolbar).
    - `exploration` → Components related to touristic places (e.g., Top Destinations).

- **Layers within each domain:**
    - `presentation`
    - `infrastructure`
    - `application`
    - `domain`

- **Naming Conventions:**
    - Physical names: `kebab-case`.
    - File suffixes:
        - `.entity.js` → Entities (class declared without suffix, e.g., `place.entity.js` → `class Place`).
        - `.store.js` → Stores.
        - `.assembler.js` → Assemblers.
    - Components: `.component.vue` (in templates used without suffix, e.g., `place-card.component.vue` → `<place-card></place-card>`).
    - PrimeVue components: `pv-` prefix + kebab-case (e.g., `<pv-card></pv-card>`).

- **Code Documentation:**
    - JSDoc-style comments in all authored source files.
    - Include:
        - **Summary**: Purpose of the class, component, or method.
        - **Author**: Anderson Ventosilla.

- **Design Patterns:**
    - **Request/Response**
    - **Resource**
    - **Assembler**

## Evaluation Criteria
The IT team of OpenTripMap World Explorer will evaluate:
- Functional compliance with requirements.
- User Interface design and adherence to Material Design.
- Project structure and code organization.
- Use of **Vue.js naming conventions** and English naming standards.
- Efficiency, maintainability, and reusability of code.
- Proper use of layered architecture and design patterns.
- Quality of documentation (JSDoc + file headers).

## Package Manager

This project uses `pnpm` as the package manager (as specified in README.md).

## Development Commands

### Core Commands
- `pnpm install` - Install dependencies
- `pnpm dev` - Start development server with hot-reload (Vite)
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build locally
- `pnpm lint` - Run ESLint with auto-fix
- `pnpm format` - Format code with Prettier

### Requirements
- Node.js: `^20.19.0 || >=22.12.0` (specified in engines)

## Project Structure

- **src/main.js** - Application entry point, mounts Vue app to #app
- **src/App.vue** - Root component using Composition API
- **src/components/** - Reusable Vue components
  - **HelloWorld.vue** - Basic component example
  - **TheWelcome.vue** - Main welcome component
  - **WelcomeItem.vue** - Welcome item component
  - **icons/** - SVG icon components
- **public/** - Static assets served directly
- **index.html** - HTML template with app mount point

## Configuration

### Vite Configuration
- Uses `@` alias pointing to `./src`
- Vue plugin with DevTools enabled
- Standard Vite development server setup

### Code Quality
- **ESLint**: Flat config with Vue support, browser globals, and Prettier integration
- **Prettier**: Semi-colons disabled, single quotes, 100 character line width
- **EditorConfig**: Standardized editor settings

### Vue 3 Patterns
- Uses Composition API with `<script setup>` syntax
- Scoped styles in components
- Component imports using relative paths