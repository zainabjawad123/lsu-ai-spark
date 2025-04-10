
# LSU AI Spark Learning Platform

![LSU AI Spark](https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=200)

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [User Journey](#user-journey)
- [Technical Details](#technical-details)
- [Learning Modules](#learning-modules)
- [Project Info](#project-info)

## Overview

LSU AI Spark is an interactive learning platform designed to teach artificial intelligence concepts through structured modules and hands-on learning. The platform offers a progression-based curriculum that takes learners from beginner to advanced levels in AI education.

## Features

### User Authentication
- User registration and login system
- Persistent sessions using localStorage
- Protected routes for authenticated content

### Learning Structure
- Three progressive learning levels: Beginner, Intermediate, and Advanced
- Each level contains multiple learning modules
- Each module contains 4 topic lessons
- Module unlocking system based on completion progress
- Interactive quizzes to test knowledge

### Progress Tracking
- Detailed dashboard displaying learning progress
- Module completion tracking
- Quiz performance analytics
- Level-based progression system

### Certification System
- Level completion certificates
- Recognition for completed learning paths
- Visual indicators of achievement

### Responsive Design
- Fully responsive interface that works on mobile, tablet, and desktop
- Tailwind CSS-based styling for consistent UI/UX
- Smooth animations and transitions

## Project Structure

The application follows a component-based architecture:

```
├── src/
│   ├── components/       # Reusable UI components
│   ├── context/          # React context for state management
│   ├── pages/            # Main page components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions and helpers
│   └── main.tsx          # Application entry point
```

## Getting Started

### Prerequisites
- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Running the App Locally

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm i

# Start the development server
npm run dev
```

## User Journey

1. **Sign Up/Login**: New users create an account; returning users log in
2. **Home Page**: Introduction to the platform and featured modules
3. **Modules Page**: Browse all available learning modules
4. **Learning Path**:
   - Start with beginner modules (initially only the first module is unlocked)
   - Complete modules to unlock new content
   - Take quizzes to demonstrate knowledge
   - Progress through Intermediate and Advanced levels
5. **Dashboard**: Track progress, view scores, and access certificates
6. **Certification**: Earn certificates upon completing each level

## Technical Details

### Built With
- **Vite** - Frontend build tool
- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - Component library
- **React Router** - Navigation and routing
- **React Query** - Data fetching and state management
- **localStorage** - Client-side data persistence

### State Management
- Uses React Context API for global state management
- Implements custom hooks for reusable logic
- Persists user data using localStorage

## Learning Modules

### Beginner Level
1. **AI Fundamentals** - Core concepts of artificial intelligence
2. **Machine Learning** - Supervised and unsupervised learning basics
3. **Prompt Engineering** - Effective prompt writing for language models
4. **AI Ethics** - Ethical considerations in AI development

### Intermediate Level
1. **Deep Learning** - Neural networks and deep learning architectures
2. **Computer Vision** - Image recognition and processing techniques
3. **NLP** - Natural language processing fundamentals
4. **AI Applications** - Real-world AI implementation cases

### Advanced Level
1. **Data Privacy** - Advanced data protection in AI systems
2. **Future AI** - Emerging trends and future directions
3. **Responsible AI** - Building ethical and responsible AI systems
4. **AI Research** - Current research areas and methodologies

## Project Info

**URL**: https://lovable.dev/projects/c859982b-b7bc-456f-bab5-30ea5886aa75

### Deployment

This project can be deployed by clicking on the Publish button within Lovable.

### Customize Your Deployment

To connect a custom domain:
1. Navigate to Project > Settings > Domains in Lovable
2. Click "Connect Domain"
3. Follow the DNS configuration instructions

Note: A paid Lovable plan is required for custom domain connections.

### Getting Help

If you need assistance with this project:
- Visit [Lovable Documentation](https://docs.lovable.dev/)
- Join the [Lovable Discord community](https://discord.com/channels/1119885301872070706/1280461670979993613)
- Follow [Lovable tutorials on YouTube](https://www.youtube.com/watch?v=9KHLTZaJcR8&list=PLbVHz4urQBZkJiAWdG8HWoJTdgEysigIO)
