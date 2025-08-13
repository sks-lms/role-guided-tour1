
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Search,
    ArrowLeft,
    Play,
    Clock,
    BookOpen,
    FileText,
    Video,
    CheckCircle,
    User
} from "lucide-react";

// Mock data for lessons
const lessons = [
    {
        id: 1,
        title: "Introduction to React Hooks",
        description: "Learn the fundamentals of React Hooks including useState and useEffect.",
        course: "Web Development Fundamentals",
        instructor: "Michael Johnson",
        type: "video",
        duration: "25 min",
        status: "completed",
        completedAt: "2024-01-15",
        content: "This lesson covers the basics of React Hooks and how they revolutionize state management in functional components.",
        videoUrl: "https://example.com/video1"
    },
    {
        id: 2,
        title: "Data Visualization with Python",
        description: "Create stunning visualizations using matplotlib and seaborn libraries.",
        course: "Data Science with Python",
        instructor: "Dr. Sarah Wilson",
        type: "video",
        duration: "35 min",
        status: "in_progress",
        completedAt: null,
        content: "Learn to create various types of charts and graphs to represent your data effectively.",
        videoUrl: "https://example.com/video2"
    },
    {
        id: 3,
        title: "Flutter Widget Basics",
        description: "Understanding the building blocks of Flutter applications.",
        course: "Mobile App Development",
        instructor: "David Chen",
        type: "text",
        duration: "20 min",
        status: "not_started",
        completedAt: null,
        content: "Widgets are the building blocks of Flutter apps. In this lesson, we'll explore the most commonly used widgets."
    },
    {
        id: 4,
        title: "Social Media Marketing Strategies",
        description: "Effective strategies for marketing on social media platforms.",
        course: "Digital Marketing Mastery",
        instructor: "Emma Roberts",
        type: "video",
        duration: "30 min",
        status: "completed",
        completedAt: "2024-01-10",
        content: "Discover proven strategies to grow your brand presence across various social media platforms.",
        videoUrl: "https://example.com/video4"
    },
    {
        id: 5,
        title: "JavaScript Array Methods",
        description: "Master the essential array methods in JavaScript for data manipulation.",
        course: "Web Development Fundamentals",
        instructor: "Michael Johnson",
        type: "text",
        duration: "15 min",
        status: "in_progress",
        completedAt: null,
        content: "Learn about map, filter, reduce, and other powerful array methods in JavaScript."
    },
    {
        id: 6,
        title: "Database Design Principles",
        description: "Learn the fundamentals of designing efficient and scalable databases.",
        course: "Data Science with Python",
        instructor: "Dr. Sarah Wilson",
        type: "video",
        duration: "40 min",
        status: "not_started",
        completedAt: null,
        content: "Understand normalization, relationships, and best practices for database design.",
        videoUrl: "https://example.com/video6"
    }
];

const courses = ["All Courses", "Web Development Fundamentals", "Data Science with Python", "Mobile App Development", "Digital Marketing Mastery"];

type ViewMode = "list" | "detail";

export function StudentLessonsView() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("All Courses");
    const [selectedLesson, setSelectedLesson] = useState<typeof lessons[0] | null>(null);
    const [view, setView] = useState<ViewMode>("list");

    const filteredLessons = lessons.filter(lesson => {
        const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lesson.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lesson.course.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCourse = selectedCourse === "All Courses" || lesson.course === selectedCourse;
        return matchesSearch && matchesCourse;
    });

    const handleLessonClick = (lesson: typeof lessons[0]) => {
        setSelectedLesson(lesson);
        setView("detail");
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "video": return <Video className="h-4 w-4" />;
            case "text": return <FileText className="h-4 w-4" />;
            default: return <BookOpen className="h-4 w-4" />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case "video": return "bg-blue-100 text-blue-800";
            case "text": return "bg-green-100 text-green-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed": return "bg-green-100 text-green-800";
            case "in_progress": return "bg-yellow-100 text-yellow-800";
            case "not_started": return "bg-gray-100 text-gray-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "completed": return <CheckCircle className="h-4 w-4" />;
            case "in_progress": return <Play className="h-4 w-4" />;
            default: return <BookOpen className="h-4 w-4" />;
        }
    };

    if (view === "detail" && selectedLesson) {
        return (
            <div className="space-y-6 animate-fade-in max-w-full overflow-hidden px-4 sm:px-0">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        onClick={() => setView("list")}
                        className="hover:bg-muted rounded-lg"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Lessons
                    </Button>
                </div>

                {/* Lesson Detail */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-full overflow-hidden">
                    {/* Main Content */}
                    <div className="lg:col-span-2 min-w-0 overflow-hidden">
                        <Card>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="space-y-2 min-w-0 flex-1">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <Badge className={getTypeColor(selectedLesson.type)}>
                                                {getTypeIcon(selectedLesson.type)}
                                                <span className="ml-1 capitalize">{selectedLesson.type}</span>
                                            </Badge>
                                            <Badge className={getStatusColor(selectedLesson.status)}>
                                                {getStatusIcon(selectedLesson.status)}
                                                <span className="ml-1 capitalize">{selectedLesson.status.replace('_', ' ')}</span>
                                            </Badge>
                                        </div>
                                        <CardTitle className="text-xl lg:text-2xl break-words">{selectedLesson.title}</CardTitle>
                                        <p className="text-muted-foreground break-words">{selectedLesson.description}</p>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-6">
                                {/* Video Player or Content Area */}
                                {selectedLesson.type === "video" ? (
                                    <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                                        <div className="text-center text-white">
                                            <Play className="h-16 w-16 mx-auto mb-4 opacity-70" />
                                            <p>Video Player Placeholder</p>
                                            <p className="text-sm opacity-70">{selectedLesson.duration}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="prose max-w-none">
                                        <div className="bg-muted p-6 rounded-lg">
                                            <h3 className="text-lg font-semibold mb-3">Lesson Content</h3>
                                            <p className="text-muted-foreground leading-relaxed break-words">
                                                {selectedLesson.content}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex gap-3 flex-wrap">
                                    {selectedLesson.status !== "completed" && (
                                        <Button className="bg-gradient-primary hover:shadow-glow">
                                            <Play className="h-4 w-4 mr-2" />
                                            {selectedLesson.status === "in_progress" ? "Continue Lesson" : "Start Lesson"}
                                        </Button>
                                    )}

                                    {selectedLesson.status === "completed" && (
                                        <Button variant="outline">
                                            <CheckCircle className="h-4 w-4 mr-2" />
                                            Review Lesson
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4 min-w-0 overflow-hidden">
                        <Card>
                            <CardHeader>
                                <CardTitle>Lesson Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">{selectedLesson.duration}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm break-words">{selectedLesson.course}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm break-words">{selectedLesson.instructor}</span>
                                    </div>

                                    {selectedLesson.completedAt && (
                                        <div className="pt-2 border-t">
                                            <p className="text-sm text-muted-foreground">
                                                Completed on {new Date(selectedLesson.completedAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in px-4 sm:px-0 max-w-full overflow-hidden">
            {/* Header */}
            <div className="space-y-4">
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">My Lessons</h1>

                <div className="flex flex-col sm:flex-row gap-4 min-w-0 overflow-hidden">
                    <div className="relative flex-1 max-w-md min-w-0">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search lessons..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 w-full"
                        />
                    </div>

                    <select
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        className="px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring flex-shrink-0"
                    >
                        {courses.map(course => (
                            <option key={course} value={course}>{course}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Lessons List */}
            <div className="space-y-4">
                {filteredLessons.map((lesson) => (
                    <Card
                        key={lesson.id}
                        className="hover:shadow-card transition-all duration-300 cursor-pointer group"
                        onClick={() => handleLessonClick(lesson)}
                    >
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-start gap-3 sm:gap-4 min-w-0 overflow-hidden">
                                <div className={`p-3 rounded-lg flex-shrink-0 ${getTypeColor(lesson.type)}`}>
                                    {getTypeIcon(lesson.type)}
                                </div>

                                <div className="flex-1 min-w-0 overflow-hidden">
                                    <div className="flex items-start justify-between mb-2 min-w-0 overflow-hidden">
                                        <h3 className="font-semibold text-base sm:text-lg group-hover:text-primary transition-colors break-words flex-1 min-w-0">
                                            {lesson.title}
                                        </h3>
                                        <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                                            <Badge className={getStatusColor(lesson.status)}>
                                                {getStatusIcon(lesson.status)}
                                                <span className="ml-1 capitalize">{lesson.status.replace('_', ' ')}</span>
                                            </Badge>
                                        </div>
                                    </div>

                                    <p className="text-muted-foreground mb-3 break-words">{lesson.description}</p>

                                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <BookOpen className="h-4 w-4 flex-shrink-0" />
                                            <span className="break-words">{lesson.course}</span>
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <User className="h-4 w-4 flex-shrink-0" />
                                            <span className="break-words">{lesson.instructor}</span>
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-4 w-4 flex-shrink-0" />
                                            {lesson.duration}
                                        </span>
                                    </div>

                                    {lesson.completedAt && (
                                        <p className="text-xs text-green-600 mt-2">
                                            Completed on {new Date(lesson.completedAt).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
