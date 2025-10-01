🚀 AI-Powered Project Planner
An intelligent task management application that helps you organize your daily to-do list and automatically breaks down large projects into actionable steps using the Gemini AI.

✨ Key Features
Manual Task Management: Quickly add, edit, check off, and delete your daily tasks.

🤖 AI Project Planning: Describe a large goal (e.g., "Plan a team offsite"), and the AI will generate a complete to-do list for you.

Persistent Storage: All your tasks are automatically saved to your browser's local storage.

Sleek & Responsive UI: A modern, clean interface built with Tailwind CSS that looks great on any device.

Dark Mode: Automatically adapts to your system's theme preference.

🛠️ Tech Stack
Framework: Next.js (React)

Styling: Tailwind CSS

AI: Google Gemini API

Icons: Custom SVG icons (emulating lucide-react)

📦 Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
Node.js (v18 or later)

npm, yarn, or pnpm

Installation & Setup
Clone the repository:

git clone [https://github.com/Dev-Saurabh-K/Planner-v2.git](https://github.com/your-username/ai-planner-app.git)
cd ai-planner-app

Install dependencies:

npm install

Set up environment variables:
Create a new file named .env.local in the root of your project directory and add your Google Gemini API key:

NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here

You can get a free API key from Google AI Studio.

Run the development server:

npm run dev

Open http://localhost:3000 in your browser to see the application.

usage How to Use
Managing Manual Tasks
Click the "Add New Task" button.

Type your task in the input field and press Enter or click "Add Task".

Click the checkbox to mark a task as complete.

Hover over a task and click the trash icon to delete it.

Planning a Project with AI
Click the "✨ Plan a Project" button.

In the dialog, describe your project or goal (e.g., "Launch a new marketing campaign for Q4").

Click "Generate Tasks" and watch as the AI populates your to-do list with a detailed plan.

📄 License
This project is licensed under the MIT License. See the LICENSE file for details.