# MedGenius

![MedGenius Logo](/images/medgenius.png)

MedGenius is a healthcare assistant application designed to simplify healthcare management. It provides features like medical report analysis, health trends tracking, medicine scanning, and more.

This guide will walk you through setting up and running the project locally.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Environment Setup](#environment-setup)
4. [Running the Project](#running-the-project)
5. [Project Structure](#project-structure)
6. [Available Scripts](#available-scripts)
7. [Contributing](#contributing)
8. [License](#license)

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v18 or later) - [Download Node.js](https://nodejs.org/)
- **npm** (v9 or later) or **yarn** (v1.22 or later)
- **Git** - [Download Git](https://git-scm.com/)
- **Supabase** - Set up a Supabase project by visiting [Supabase](https://supabase.com/) and creating a new project. If using Supabase locally, ensure you have [PostgreSQL](https://www.postgresql.org/) installed.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/medgenius.git
   cd medgenius
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Package Version Requirements

This project uses React 19.1.0 and requires the following specific package versions for compatibility:

| Package | Required Version |
|---------|-----------------|
| react-day-picker | 9.6.4 or newer |
| vaul | 1.1.2 or newer |
| date-fns | 4.1.0 or newer |

To ensure correct versions are installed:

```bash
npm install react-day-picker@9.6.4 vaul@1.1.2 date-fns@4.1.0
```

---

## Environment Setup

1. Create a `.env` file in the root directory by copying the example file:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your specific configuration values.

### Required Environment Variables

The following variables must be set in your `.env` file:

| Variable | Description |
|----------|-------------|
| SUPABASE_URL | URL of your Supabase instance |
| SUPABASE_ANON_KEY | Public API key for Supabase project |
| SUPABASE_SERVICE_ROLE_KEY | Service role key for Supabase project |
| JWT_SECRET | Secret key for signing JSON Web Tokens |
| NEXT_PUBLIC_API_URL | Base URL for the application's API |

Refer to `.env.example` for the exact format and any additional required variables.

---

## Running the Project

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000` to view the application.

3. If you're using Supabase locally, ensure your PostgreSQL server is running and properly configured.

---

## Project Structure

The project follows a modular structure for better maintainability:

```
medgenius/
      ├── app/                     # Next.js app directory
      │   ├── dashboard/           # Dashboard page
      │   ├── health-records/      # Health records page
      │   ├── health-trends/       # Health trends page
      │   ├── medicine-scanner/    # Medicine scanner page
      │   ├── report-analysis/     # Report analysis page
      │   ├── layout.tsx           # Root layout
      │   └── globals.css          # Global styles
      ├── components/              # Reusable UI components
      │   ├── ui/                  # UI-specific components
      │   └── theme-provider.tsx   # Theme provider
      ├── lib/                     # Utility functions
      ├── styles/                  # Tailwind CSS styles
      ├── types/                   # TypeScript types
      ├── public/                  # Static assets
      ├── package.json             # Project dependencies and scripts
      ├── tailwind.config.ts       # Tailwind CSS configuration
      └── postcss.config.mjs       # PostCSS configuration
```

---

## Available Scripts

Here are some useful scripts you can run:

- **Start the development server**: `npm run dev`
- **Build the project for production**: `npm run build`
- **Run tests**: `npm test`
- **Lint the code**: `npm run lint`

---

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push the branch.
4. Open a pull request with a detailed description of your changes.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
