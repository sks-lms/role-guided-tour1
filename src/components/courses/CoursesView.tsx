import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Users, Clock, BookOpen, Star, ArrowRight, Filter, Play, Edit } from "lucide-react";
import { RichTextEditor } from "../richTextEditor";

const courses = [
  {
    id: 1,
    title: "React Fundamentals",
    description: "Learn the basics of React including components, props, state, and hooks",
    category: "Frontend",
    level: "Beginner",
    duration: "8 weeks",
    students: 45,
    lessons: 24,
    progress: 78,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop",
    status: "active",
    createdAt: "2024-01-15",
    lastUpdated: "2024-11-20"
  },
  {
    id: 2,
    title: "Advanced TypeScript",
    description: "Master advanced TypeScript concepts including generics, decorators, and advanced types",
    category: "Programming",
    level: "Advanced",
    duration: "12 weeks",
    students: 32,
    lessons: 36,
    progress: 65,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop",
    status: "active",
    createdAt: "2024-02-01",
    lastUpdated: "2024-11-18"
  },
  {
    id: 3,
    title: "UI/UX Design Principles",
    description: "Design beautiful and functional user interfaces with modern design principles",
    category: "Design",
    level: "Intermediate",
    duration: "10 weeks",
    students: 28,
    lessons: 30,
    progress: 89,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop",
    status: "active",
    createdAt: "2024-01-10",
    lastUpdated: "2024-11-15"
  },
  {
    id: 4,
    title: "Node.js Backend Development",
    description: "Build scalable backend applications with Node.js, Express, and databases",
    category: "Backend",
    level: "Intermediate",
    duration: "14 weeks",
    students: 38,
    lessons: 42,
    progress: 45,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=200&fit=crop",
    status: "draft",
    createdAt: "2024-03-01",
    lastUpdated: "2024-11-10"
  }
];

export function CoursesView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [view, setView] = useState("grid"); // grid or detail
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "",
    duration: ""
  });

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setView("detail");
  };

  const getLevelColor = (level) => {
    switch (level) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-blue-100 text-blue-800";
      case "Advanced": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    return status === "active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800";
  };

  if (view === "detail" && selectedCourse) {
    return (
      <div className="space-y-6">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => setView("grid")}
          className="mb-4"
        >
          ← Back to Courses
        </Button>

        {/* Course Header */}
        <div className="bg-gradient-primary rounded-xl p-6 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Badge className={`${getLevelColor(selectedCourse.level)} border-0`}>
                  {selectedCourse.level}
                </Badge>
                <Badge className={`${getStatusColor(selectedCourse.status)} border-0`}>
                  {selectedCourse.status}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold mb-2">{selectedCourse.title}</h1>
              <p className="text-white/80 text-lg mb-4">{selectedCourse.description}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {selectedCourse.students} students
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {selectedCourse.lessons} lessons
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {selectedCourse.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current" />
                  {selectedCourse.rating}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0">
                <Edit className="w-4 h-4 mr-2" />
                Edit Course
              </Button>
              <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0">
                <Play className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </div>
          </div>
        </div>

        {/* Course Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "Enrolled Students", value: selectedCourse.students, icon: Users, color: "text-primary" },
            { label: "Completion Rate", value: `${selectedCourse.progress}%`, icon: Star, color: "text-secondary" },
            { label: "Total Lessons", value: selectedCourse.lessons, icon: BookOpen, color: "text-accent" },
            { label: "Rating", value: selectedCourse.rating, icon: Star, color: "text-primary" }
          ].map((stat, index) => (
            <Card key={index} className="border-0 shadow-card">
              <CardContent className="p-6 text-center">
                <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Course Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Student Activity */}
          <Card className="border-0 shadow-card lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Student Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { student: "Emma Johnson", action: "Completed Lesson 5", time: "2 hours ago" },
                { student: "Michael Chen", action: "Started Assignment 3", time: "4 hours ago" },
                { student: "Sarah Williams", action: "Posted question", time: "6 hours ago" },
                { student: "David Rodriguez", action: "Submitted assignment", time: "1 day ago" }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gradient-primary text-white text-xs">
                      {activity.student.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.student}</p>
                    <p className="text-xs text-muted-foreground">{activity.action}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Course Progress */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle>Progress Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{selectedCourse.progress}%</div>
                <p className="text-sm text-muted-foreground">Overall Completion</p>
                <Progress value={selectedCourse.progress} className="mt-3" />
              </div>
              
              <div className="space-y-3">
                {[
                  { module: "Introduction", progress: 95 },
                  { module: "Components", progress: 88 },
                  { module: "State & Props", progress: 75 },
                  { module: "Hooks", progress: 60 },
                  { module: "Advanced Topics", progress: 30 }
                ].map((module, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{module.module}</span>
                      <span className="text-muted-foreground">{module.progress}%</span>
                    </div>
                    <Progress value={module.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Courses</h1>
          <p className="text-muted-foreground">Manage your courses and track student progress</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary text-white hover:shadow-glow transition-all">
              <Plus className="w-4 h-4 mr-2" />
              Create Course
            </Button>
          </DialogTrigger>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-card">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                All ({courses.length})
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                Active ({courses.filter(c => c.status === 'active').length})
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card 
            key={course.id} 
            className="border-0 shadow-card hover:shadow-elegant transition-all duration-300 cursor-pointer animate-scale-in group"
            onClick={() => handleCourseClick(course)}
          >
            <div className="aspect-video bg-gradient-primary rounded-t-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute top-4 left-4">
                <Badge className={`${getLevelColor(course.level)} border-0`}>
                  {course.level}
                </Badge>
              </div>
              <div className="absolute top-4 right-4">
                <Badge className={`${getStatusColor(course.status)} border-0`}>
                  {course.status}
                </Badge>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0">
                  <Play className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              </div>
            </div>
            
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {course.students}
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {course.lessons} lessons
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current text-yellow-400" />
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="group-hover:text-primary">
                    View Details
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Course Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
      <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto mx-auto p-3 sm:p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <BookOpen className="w-5 h-5 text-primary" />
            Create New Course
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="course-title">Course Title</Label>
              <Input
                id="course-title"
                placeholder="e.g. React Fundamentals"
                value={newCourse.title}
                onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="course-category">Category</Label>
              <Select 
                value={newCourse.category} 
                onValueChange={(value) => setNewCourse({...newCourse, category: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="programming">Programming</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="data-science">Data Science</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="course-difficulty">Difficulty Level</Label>
              <Select 
                value={newCourse.difficulty} 
                onValueChange={(value) => setNewCourse({...newCourse, difficulty: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="course-duration">Estimated Duration</Label>
              <Input
                id="course-duration"
                placeholder="e.g. 8 weeks"
                value={newCourse.duration}
                onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Course Description</Label>
            <RichTextEditor
              value={newCourse.description}
              onChange={(value) => setNewCourse({...newCourse, description: value})}
              placeholder="Describe your course objectives, what students will learn, prerequisites, etc. Use **bold**, *italic*, `code`, > quotes, - lists, and [links](url) for formatting."
            />
          </div>
          
          <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4 border-t">
            <Button 
              variant="outline" 
              onClick={() => {
                setIsCreateDialogOpen(false);
                setNewCourse({ title: "", description: "", category: "", difficulty: "", duration: "" });
              }}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button 
              className="bg-gradient-primary text-white w-full sm:w-auto"
              disabled={!newCourse.title || !newCourse.description}
            >
              Create Course
            </Button>
          </div>
        </div>
      </DialogContent>
      </Dialog>
    </div>
  );
}