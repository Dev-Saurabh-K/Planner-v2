'use client'
import React, { useState, useEffect } from 'react';

// --- ICONS (Lucide React Replacements) ---
const PlusCircle = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

const Trash2 = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 6h18" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const CalendarIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
);

const SparklesIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m12 3-1.9 4.8-4.8 1.9 4.8 1.9 1.9 4.8 1.9-4.8 4.8-1.9-4.8-1.9Z"/>
        <path d="M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z"/>
    </svg>
);

const LoaderCircle = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`animate-spin ${className}`}>
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
);


// --- CUSTOM UI COMPONENTS (Mocking shadcn/ui) ---

const Card = ({ children, className = '' }) => (
  <div className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => <div className={`p-6 ${className}`}>{children}</div>;
const CardContent = ({ children, className = '' }) => <div className={`p-6 pt-0 ${className}`}>{children}</div>;
const CardTitle = ({ children, className = '' }) => <h3 className={`text-2xl font-semibold leading-none tracking-tight text-gray-900 dark:text-gray-50 ${className}`}>{children}</h3>;
const CardDescription = ({ children, className = '' }) => <p className={`text-sm text-gray-500 dark:text-gray-400 ${className}`}>{children}</p>;

const Button = ({ children, onClick, className = '', variant = 'default', disabled = false }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-800";
  const variantClasses = {
    default: "bg-gray-900 text-gray-50 hover:bg-gray-900/90 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90",
    destructive: "bg-red-500 text-gray-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-red-50 dark:hover:bg-red-900/90",
    outline: "border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50",
    ghost: "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50",
  };
  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses[variant]} h-10 px-4 py-2 ${className}`} disabled={disabled}>
      {children}
    </button>
  );
};

const Input = React.forwardRef(({ className = '', ...props }, ref) => (
  <input
    className={`flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-800 ${className}`}
    ref={ref}
    {...props}
  />
));

const Checkbox = ({ id, checked, onCheckedChange }) => (
    <button
        id={id}
        role="checkbox"
        aria-checked={checked}
        onClick={() => onCheckedChange(!checked)}
        className={`flex items-center justify-center h-5 w-5 shrink-0 rounded-sm border border-gray-400 dark:border-gray-500 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${checked ? 'bg-gray-900 text-gray-50 dark:bg-gray-50 dark:text-gray-900' : ''}`}
    >
        {checked && (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <polyline points="20 6 9 17 4 12" />
            </svg>
        )}
    </button>
);

const Dialog = ({ open, onOpenChange, children }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => onOpenChange(false)}>
            <div className="relative animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};
const DialogContent = ({ children, className = '' }) => <Card className={`w-full max-w-md ${className}`}>{children}</Card>;
const DialogHeader = ({ children, className = '' }) => <div className={`p-6 pb-2 ${className}`}>{children}</div>;
const DialogTitle = ({ children, className = '' }) => <h3 className={`text-lg font-semibold text-gray-900 dark:text-gray-50 ${className}`}>{children}</h3>;
const DialogFooter = ({ children, className = '' }) => <div className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 gap-2 sm:gap-0 p-6 pt-2 ${className}`}>{children}</div>;


// --- MAIN PLANNER COMPONENT ---

export default function PlannerApp() {
  const [tasks, setTasks] = useState([]);
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);
  const [isPlanProjectDialogOpen, setIsPlanProjectDialogOpen] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');
  const [projectText, setProjectText] = useState('');
  const [isGeneratingTasks, setIsGeneratingTasks] = useState(false);


  // Load from LocalStorage
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem('plannerTasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
        console.error("Failed to parse tasks from localStorage", error);
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('plannerTasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTaskText.trim() === '') return;
    const newTask = {
      id: Date.now(),
      text: newTaskText.trim(),
      completed: false,
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
    setNewTaskText('');
    setIsAddTaskDialogOpen(false);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handlePlanProject = async () => {
      if (projectText.trim() === '') return;
      setIsGeneratingTasks(true);

      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY; 
      
      if (!apiKey) {
          alert("API Key is missing! Set NEXT_PUBLIC_GEMINI_API_KEY in your .env file.");
          setIsGeneratingTasks(false);
          return;
      }

      // Using the stable Gemini 1.5 Flash model
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`;

      const systemPrompt = "You are a professional project manager. Break down the following user goal into a list of 3 to 7 actionable, concise tasks. Return ONLY a valid JSON array of strings (e.g., [\"Task 1\", \"Task 2\"]). Do not include markdown formatting.";
      
      const payload = {
          contents: [{ 
              parts: [{ text: `Goal: "${projectText}"\n\n${systemPrompt}` }] 
          }]
      };

      try {
          const response = await fetch(apiUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
          });

          if (!response.ok) {
              const errData = await response.json();
              throw new Error(`API Error: ${errData.error?.message || response.statusText}`);
          }

          const result = await response.json();
          const candidate = result.candidates?.[0];
          let generatedText = candidate.content?.parts?.[0]?.text;

          if (generatedText) {
              // Clean up markdown code blocks if AI adds them (```json ... ```)
              generatedText = generatedText.replace(/```json|```/g, '').trim();
              
              const generatedTasks = JSON.parse(generatedText);
              
              if (Array.isArray(generatedTasks)) {
                const newTasks = generatedTasks.map((taskText, index) => ({
                    id: Date.now() + index,
                    text: taskText,
                    completed: false,
                }));
                setTasks(prevTasks => [...newTasks, ...prevTasks]);
              }
          } 
      } catch (error) {
          console.error("Error generating tasks:", error);
          alert("Failed to generate tasks. Check console for details.");
      } finally {
          setIsGeneratingTasks(false);
          setProjectText('');
          setIsPlanProjectDialogOpen(false);
      }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };
  
  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const pendingTasks = tasks.filter(task => !task.completed);

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-50 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{getGreeting()}!</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">{dateString}</p>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => setIsPlanProjectDialogOpen(true)}>
                    <SparklesIcon className="mr-2 h-4 w-4 text-yellow-500" /> ✨ Plan Project
                </Button>
                <Button onClick={() => setIsAddTaskDialogOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Task
                </Button>
            </div>
        </header>

        <main>
          <Card className="min-h-[500px]">
            <CardHeader>
              <CardTitle>Today's Plan</CardTitle>
              <CardDescription>
                You have <span className="font-bold text-primary">{pendingTasks.length}</span> pending task{pendingTasks.length !== 1 ? 's' : ''}.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {tasks.length > 0 ? (
                  tasks.map(task => (
                    <div key={task.id} className="flex items-center p-3 rounded-lg border border-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-all group">
                      <Checkbox
                        id={`task-${task.id}`}
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(task.id)}
                      />
                      <label 
                        htmlFor={`task-${task.id}`} 
                        className={`ml-3 flex-1 text-sm cursor-pointer select-none transition-all ${task.completed ? 'line-through text-gray-400 decoration-gray-400' : 'text-gray-700 dark:text-gray-200'}`}
                      >
                        {task.text}
                      </label>
                      <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => deleteTask(task.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
                      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
                        <CalendarIcon className="h-8 w-8 text-gray-400"/>
                      </div>
                      <h3 className="text-lg font-semibold">No tasks yet</h3>
                      <p className="text-sm text-gray-500 max-w-sm mt-2">
                        Your schedule is empty. Add a task manually or let AI plan your day.
                      </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Add Task Dialog */}
      <Dialog open={isAddTaskDialogOpen} onOpenChange={setIsAddTaskDialogOpen}>
          <DialogContent>
              <DialogHeader>
                  <DialogTitle>Add a new task</DialogTitle>
              </DialogHeader>
              <div className="p-6 pt-0">
                  <Input
                      placeholder="e.g., Finish project proposal"
                      value={newTaskText}
                      onChange={(e) => setNewTaskText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                      autoFocus
                  />
              </div>
              <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddTaskDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddTask}>Add Task</Button>
              </DialogFooter>
          </DialogContent>
      </Dialog>

      {/* Plan Project Dialog */}
      <Dialog open={isPlanProjectDialogOpen} onOpenChange={setIsPlanProjectDialogOpen}>
          <DialogContent>
              <DialogHeader>
                  <DialogTitle>✨ Plan a New Project</DialogTitle>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Describe your goal (e.g., "Plan a birthday party"), and AI will create a checklist for you.
                  </p>
              </DialogHeader>
              <div className="p-6 pt-0">
                  <Input
                      placeholder="What do you want to achieve?"
                      value={projectText}
                      onChange={(e) => setProjectText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !isGeneratingTasks && handlePlanProject()}
                      autoFocus
                  />
              </div>
              <DialogFooter>
                  <Button variant="outline" onClick={() => setIsPlanProjectDialogOpen(false)} disabled={isGeneratingTasks}>Cancel</Button>
                  <Button onClick={handlePlanProject} disabled={isGeneratingTasks} className="min-w-[140px]">
                      {isGeneratingTasks ? (
                          <>
                              <LoaderCircle className="mr-2 h-4 w-4"/>
                              Thinking...
                          </>
                      ) : (
                          <>
                            <SparklesIcon className="mr-2 h-4 w-4" /> Generate
                          </>
                      )}
                  </Button>
              </DialogFooter>
          </DialogContent>
      </Dialog>
    </div>
  );
}