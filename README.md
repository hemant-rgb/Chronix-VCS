# Chronix VCS

<div align="center">

### A Cloud-Native Distributed Version Control System

Track changes, manage repositories, collaborate with developers, and version your code through a custom-built distributed version control system powered by cloud storage and a modern web platform.

**Live Platform:** https://chronix-vcs.vercel.app

**CLI Package:** `npm install -g chronix-vcs`

</div>

---

# Overview

Chronix VCS is a custom-built distributed version control system inspired by the core concepts of modern VCS platforms.

The project consists of:

* A cloud-hosted backend
* A web platform for repository hosting and collaboration
* A command-line interface (CLI)
* Cloud-based commit storage
* User authentication and repository management
* Issue tracking and social features

Chronix allows developers to:

* Create repositories
* Track file changes
* Create commits
* Push snapshots to the cloud
* Pull previous versions
* Clone repositories
* Revert to historical commits
* Manage issues
* Follow other developers

---

# Motivation

Modern version control systems are complex pieces of infrastructure.

Chronix was built to understand and implement the internal concepts behind:

* Version Control Systems
* Repository Hosting Platforms
* Commit History Management
* Snapshot Storage
* Distributed Collaboration
* Authentication Systems
* Cloud Infrastructure

The project recreates many core workflows of professional development tools while remaining lightweight and educational.

---

# Architecture

```text
                ┌──────────────┐
                │  React Frontend │
                └──────┬───────┘
                       │
                       ▼
                ┌──────────────┐
                │ Express API  │
                └──────┬───────┘
                       │
        ┌──────────────┴──────────────┐
        ▼                             ▼

   MongoDB                     Supabase Storage

Repositories              Commit Snapshots
Users                     File Storage
Issues                    Version Data
Profiles
```

---

# Tech Stack

## Frontend

* React
* Vite
* TailwindCSS
* Axios

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

## Storage

* Supabase Storage

## CLI

* Node.js
* Yargs
* Axios

---

# Core Features

## Repository Hosting

Create and manage repositories directly through the web platform.

Features:

* Repository creation
* Repository visibility
* Repository ownership
* Repository browsing

---

## Commit Tracking

Track repository history using snapshots.

Each commit contains:

* Unique commit ID
* Commit message
* Timestamp
* Snapshot metadata

---

## Cloud Push & Pull

Synchronize local repositories with cloud storage.

Supported operations:

* Push commits
* Pull latest commit
* Pull previous commit
* Pull specific commit

---

## Repository Cloning

Clone repositories from the cloud to your local machine.

Features:

* Repository metadata download
* Snapshot reconstruction
* Commit history preservation

---

## Revert System

Restore repository state to previous commits.

Supports:

* Latest commit
* Previous commit
* Commit ID based restoration

---

## Issue Tracking

Manage repository issues through the web platform.

Features:

* Create issues
* View issues
* Update issues
* Delete issues

---

## User Profiles

Each user has:

* Profile page
* Repository list
* Follower count
* Following count

---

## Social Features

Developers can:

* Follow users
* Unfollow users
* Explore public repositories

---

# Installation

## Install CLI

```bash
npm install -g chronix-vcs
```

Verify installation:

```bash
chronix --help
```

---

# Authentication

Login to Chronix:

```bash
chronix auth
```

You will be prompted for:

```text
Email
Password
```

Logout:

```bash
chronix disconnect
```

---

# Repository Workflow

## Initialize Repository

```bash
chronix init
```

Creates:

```text
.chronix/
├── commits
├── staging
├── pulled
├── HEAD
├── CURRENT
└── config.json
```

---

## Add Files

Add a file:

```bash
chronix add app.js
```

Add a directory:

```bash
chronix add src
```

---

## View Status

```bash
chronix status
```

Displays:

* Current repository
* HEAD commit
* Current commit
* Staged files

---

## Create Commit

```bash
chronix commit "Initial commit"
```

Example:

```bash
chronix commit "Implemented authentication"
```

---

## View History

```bash
chronix log
```

Shows:

* Commit IDs
* Messages
* Timestamps

---

## Push Changes

```bash
chronix push
```

Uploads:

* Commit metadata
* Repository snapshot
* Updated HEAD

---

## Pull Changes

Latest:

```bash
chronix pull
```

Specific commit:

```bash
chronix pull <commitId>
```

Previous commit:

```bash
chronix pull previous
```

---

## Clone Repository

```bash
chronix clone <repositoryId>
```

Example:

```bash
chronix clone 6a252bd20b34f1b7ddb2859e
```

---

## Revert Repository

Latest:

```bash
chronix revert latest
```

Previous:

```bash
chronix revert previous
```

Specific:

```bash
chronix revert <commitId>
```

---

# Example Workflow

```bash
chronix auth

chronix init

chronix add app.js

chronix commit "Initial commit"

chronix push
```

Another developer:

```bash
chronix auth

chronix clone <repoId>

chronix pull
```

---

# Edge Cases Handled

## Files Outside Repository

Chronix prevents:

```bash
chronix add ../secret.txt
```

from being added to the repository.

---

## Empty Repositories

Cloning empty repositories is supported.

Users receive:

```text
Repository has no commits yet.
```

---

## Missing Authentication

Protected operations require login.

Examples:

* push
* clone
* pull

---

## Duplicate Clone Names

Chronix automatically handles repository name conflicts during cloning.

---

## Invalid Commit References

Invalid commit IDs are detected and rejected.

---

# Current Limitations

This project is under active development.

Current limitations include:

* No merge support
* No branch support
* No conflict resolution
* Snapshot-based storage instead of delta storage
* No repository permissions system
* No pull requests

---

# Future Improvements

## Version Control

* Branching
* Merging
* Conflict Resolution
* Stashing

## Collaboration

* Pull Requests
* Code Reviews
* Team Management

## Performance

* Delta Compression
* Incremental Uploads
* Large File Optimization

## Security

* Repository Permissions
* Access Tokens
* Organization Support

## CLI

* Interactive Mode
* Colored Output
* Progress Indicators

---

# Learning Outcomes

This project demonstrates understanding of:

* Distributed Systems
* Version Control Concepts
* Cloud Storage Integration
* Authentication & Authorization
* Backend Development
* REST APIs
* Database Design
* CLI Development
* Full Stack Engineering

---

# Live Links

Frontend:

https://chronix-vcs.vercel.app

Backend:

https://chronix-vcs.onrender.com

CLI Package:

https://www.npmjs.com/package/chronix-vcs

---

# Author

**Hemant Machiwar**

Creator of Chronix VCS

Built as a full-stack systems engineering project to explore the internals of modern version control platforms and cloud-based collaboration systems.

---

# License

ISC License
