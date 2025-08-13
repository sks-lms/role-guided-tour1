import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
    Search,
    ArrowLeft,
    Play,
    Clock,
    BookOpen,
    Star,
    Users,
    Trophy
} from "lucide-react";

// Mock data for enrolled courses
const enrolledCourses = [
    {
        id: 1,
        title: "Web Development Fundamentals",
        instructor: "Michael Johnson",
        description: "Learn the basics of web development including HTML, CSS, and JavaScript.",
        category: "Programming",
        progress: 75,
        rating: 4.8,
        students: 1250,
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600",
        lessons: 24,
        duration: "8 weeks",
        level: "Beginner",
        enrolled: true,
        completed: false,
        modules: [
            { id: 1, title: "HTML Basics", lessons: 8, completed: 8 },
            { id: 2, title: "CSS Styling", lessons: 6, completed: 6 },
            { id: 3, title: "JavaScript Fundamentals", lessons: 8, completed: 2 },
            { id: 4, title: "Project Building", lessons: 2, completed: 0 }
        ]
    },
    {
        id: 2,
        title: "Data Science with Python",
        instructor: "Dr. Sarah Wilson",
        description: "Comprehensive course covering data analysis, visualization, and machine learning.",
        category: "Data Science",
        progress: 45,
        rating: 4.9,
        students: 890,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
        lessons: 30,
        duration: "12 weeks",
        level: "Intermediate",
        enrolled: true,
        completed: false,
        modules: [
            { id: 1, title: "Python Basics", lessons: 8, completed: 8 },
            { id: 2, title: "Data Analysis", lessons: 10, completed: 5 },
            { id: 3, title: "Visualization", lessons: 8, completed: 0 },
            { id: 4, title: "Machine Learning", lessons: 4, completed: 0 }
        ]
    },
    {
        id: 3,
        title: "Mobile App Development",
        instructor: "David Chen",
        description: "Build mobile applications using React Native and Flutter.",
        category: "Mobile Development",
        progress: 20,
        rating: 4.7,
        students: 650,
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600",
        lessons: 18,
        duration: "6 weeks",
        level: "Intermediate",
        enrolled: true,
        completed: false,
        modules: [
            { id: 1, title: "React Native Basics", lessons: 6, completed: 2 },
            { id: 2, title: "Flutter Introduction", lessons: 6, completed: 0 },
            { id: 3, title: "Advanced Features", lessons: 6, completed: 0 }
        ]
    },
    {
        id: 4,
        title: "Digital Marketing Mastery",
        instructor: "Emma Roberts",
        description: "Complete guide to digital marketing strategies and tools.",
        category: "Marketing",
        progress: 100,
        rating: 4.6,
        students: 980,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
        lessons: 16,
        duration: "4 weeks",
        level: "Beginner",
        enrolled: true,
        completed: true,
        modules: [
            { id: 1, title: "Marketing Fundamentals", lessons: 4, completed: 4 },
            { id: 2, title: "Social Media Marketing", lessons: 6, completed: 6 },
            { id: 3, title: "SEO & Content", lessons: 4, completed: 4 },
            { id: 4, title: "Analytics", lessons: 2, completed: 2 }
        ]
    }
];

type ViewMode = "grid" | "detail";

export function StudentCoursesView() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCourse, setSelectedCourse] = useState<typeof enrolledCourses[0] | null>(null);
    const [view, setView] = useState<ViewMode>("grid");

    const filteredCourses = enrolledCourses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCourseClick = (course: typeof enrolledCourses[0]) => {
        setSelectedCourse(course);
        setView("detail");
    };

    const getLevelColor = (level: string) => {
        switch (level) {
            case "Beginner": return "bg-green-100 text-green-800";
            case "Intermediate": return "bg-yellow-100 text-yellow-800";
            case "Advanced": return "bg-red-100 text-red-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    if (view === "detail" && selectedCourse) {
        return (
            <div className="space-y-6 animate-fade-in">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        onClick={() => setView("grid")}
                        className="hover:bg-muted rounded-lg"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Courses
                    </Button>
                </div>

                {/* Course Detail */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <div className="relative">
                                <img
                                    src={selectedCourse.image}
                                    alt={selectedCourse.title}
                                    className="w-full h-64 object-cover rounded-t-lg"
                                />
                                <div className="absolute inset-0 bg-black/20 rounded-t-lg"></div>
                                <div className="absolute bottom-4 left-4">
                                    <Badge className={getLevelColor(selectedCourse.level)}>
                                        {selectedCourse.level}
                                    </Badge>
                                </div>
                            </div>
                            <CardHeader>
                                <CardTitle className="text-2xl">{selectedCourse.title}</CardTitle>
                                <p className="text-muted-foreground">{selectedCourse.description}</p>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span>By {selectedCourse.instructor}</span>
                                    <span className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        {selectedCourse.rating}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Users className="h-4 w-4" />
                                        {selectedCourse.students} students
                                    </span>
                                </div>
                            </CardHeader>
                        </Card>

                        {/* Course Modules */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Course Content</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {selectedCourse.modules.map((module) => (
                                    <div key={module.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-semibold">{module.title}</h3>
                                            <Badge variant="outline">
                                                {module.completed}/{module.lessons} lessons
                                            </Badge>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span>Progress</span>
                                                <span>{Math.round((module.completed / module.lessons) * 100)}%</span>
                                            </div>
                                            <Progress value={(module.completed / module.lessons) * 100} className="h-2" />
                                        </div>
                                        <Button
                                            size="sm"
                                            className="mt-3"
                                            disabled={module.completed === module.lessons}
                                        >
                                            <Play className="h-4 w-4 mr-2" />
                                            {module.completed === module.lessons ? "Completed" : "Continue"}
                                        </Button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Course Progress</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-primary mb-2">
                                        {selectedCourse.progress}%
                                    </div>
                                    <Progress value={selectedCourse.progress} className="h-3" />
                                    <p className="text-sm text-muted-foreground mt-2">
                                        {selectedCourse.completed ? "Course Completed!" : "Keep going!"}
                                    </p>
                                </div>

                                {selectedCourse.completed && (
                                    <div className="text-center p-4 bg-green-50 rounded-lg">
                                        <Trophy className="h-8 w-8 text-green-600 mx-auto mb-2" />
                                        <p className="text-green-800 font-semibold">Congratulations!</p>
                                        <p className="text-green-600 text-sm">You've completed this course</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Course Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{selectedCourse.lessons} lessons</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{selectedCourse.duration}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{selectedCourse.students} students enrolled</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="space-y-4">
                <h1 className="text-3xl font-bold text-foreground">My Courses</h1>

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search courses..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                    <Card
                        key={course.id}
                        className="hover:shadow-card transition-all duration-300 hover-scale cursor-pointer group"
                        onClick={() => handleCourseClick(course)}
                    >
                        <div className="relative">
                            <img
                                src={course.image}
                                alt={course.title}
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                            <div className="absolute inset-0 bg-black/20 rounded-t-lg group-hover:bg-black/30 transition-colors duration-300"></div>
                            <div className="absolute top-4 left-4">
                                <Badge className={getLevelColor(course.level)}>
                                    {course.level}
                                </Badge>
                            </div>
                            <div className="absolute top-4 right-4">
                                {course.completed ? (
                                    <Badge className="bg-green-100 text-green-800">
                                        <Trophy className="h-3 w-3 mr-1" />
                                        Completed
                                    </Badge>
                                ) : (
                                    <Badge variant="secondary" className="bg-white/90 text-foreground">
                                        {course.progress}% complete
                                    </Badge>
                                )}
                            </div>
                        </div>

                        <CardContent className="p-4">
                            <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                                {course.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3">
                                By {course.instructor}
                            </p>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        {course.rating}
                                    </span>
                                    <span className="text-muted-foreground">{course.students} students</span>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Progress</span>
                                        <span>{course.progress}%</span>
                                    </div>
                                    <Progress value={course.progress} className="h-2" />
                                </div>

                                <div className="flex justify-between text-sm text-muted-foreground">
                                    <span>{course.lessons} lessons</span>
                                    <span>{course.duration}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}