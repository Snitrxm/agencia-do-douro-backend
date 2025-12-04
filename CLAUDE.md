# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a NestJS backend application for Agência do Douro. The project is currently in its initial setup phase with minimal boilerplate code.

## Technology Stack

- **Framework**: NestJS v11.x (Node.js TypeScript framework)
- **Database**: MySQL with TypeORM
- **Package Manager**: pnpm
- **Language**: TypeScript (ES2023 target)
- **Testing**: Jest for unit tests, Supertest for e2e tests
- **Linting**: ESLint with Prettier integration
- **File Upload**: Cloudinary for image storage

## Development Commands

### Setup
```bash
pnpm install
```

### Running the Application
```bash
# Development mode with watch
pnpm run start:dev

# Standard development mode
pnpm run start

# Debug mode
pnpm run start:debug

# Production mode
pnpm run start:prod
```

### Building
```bash
pnpm run build
```

### Testing
```bash
# Run all unit tests
pnpm run test

# Run tests in watch mode
pnpm run test:watch

# Run e2e tests
pnpm run test:e2e

# Run tests with coverage
pnpm run test:cov

# Debug tests
pnpm run test:debug
```

### Code Quality
```bash
# Lint and auto-fix
pnpm run lint

# Format code with Prettier
pnpm run format
```

## Architecture

### NestJS Structure
- **Entry point**: `src/main.ts` - Bootstraps the NestJS application on port 3000 (or PORT env variable)
- **Root module**: `src/app.module.ts` - Currently empty, ready for feature modules to be added
- **Build output**: `dist/` directory (cleaned on each build)

### Key Configuration
- **Source root**: `src/` directory
- **TypeScript config**: Decorators and metadata emission enabled for NestJS
- **Prettier config**: Single quotes, trailing commas
- **Jest config**: Tests use `.spec.ts` suffix, rootDir is `src/`, coverage output to `coverage/`

### Module Organization
NestJS follows a modular architecture where each feature should be organized into its own module with:
- Controllers (handle HTTP requests)
- Services (business logic)
- Module definition (registers controllers and providers)

Use the NestJS CLI to generate new resources: `nest generate <schematic> <name>`

### Database Configuration
This project uses MySQL with TypeORM for database management:
- **ORM**: TypeORM v0.3.x
- **Entities**: Located in `*/entities/*.entity.ts` files
- **Auto-sync**: Enabled in development (disabled in production for safety)
- **Migrations**: Should be used in production instead of synchronize

#### Environment Variables
Create a `.env` file based on `.env.example` with the following MySQL configuration:
```
DATABASE_URL=mysql://username:password@host:port/database
```

Example:
```
DATABASE_URL=mysql://root:mypassword@localhost:3306/agencia_douro
```

#### Important Notes
- TypeORM's `synchronize` option is set to `true` in development but `false` in production
- For production, use migrations instead: `npm run migration:generate -- -n MigrationName`
- The charset is set to `utf8mb4` to support emoji and special characters
- Timezone is set to UTC ('Z')
