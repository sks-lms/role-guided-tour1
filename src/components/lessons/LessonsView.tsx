import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Search,
  Plus,
  Clock,
  PlayCircle,
  Edit,
  Trash2,
  Eye,
  BookOpen,
  Video,
  FileText,
  Image,
  Calendar,
  Filter,
  Save,
  X
} from "lucide-react";
import { RichTextEditor } from "../richTextEditor";

const lessons = [
  {
    id: 1,
    title: "Introduction to React Components",
    description: "Learn the basics of React components and how to create your first component",
    course: "React Fundamentals",
    type: "video",
    duration: "15 minutes",
    status: "published",
    createdAt: "2024-11-01",
    updatedAt: "2024-11-15",
    views: 245,
    completion: 89
  },
  {
    id: 2,
    title: "Understanding Props and State",
    description: "Deep dive into props and state management in React applications",
    course: "React Fundamentals",
    type: "video",
    duration: "22 minutes",
    status: "published",
    createdAt: "2024-11-05",
    updatedAt: "2024-11-18",
    views: 198,
    completion: 76
  },
  {
    id: 3,
    title: "React Hooks Overview",
    description: "Comprehensive guide to React hooks including useState, useEffect, and custom hooks",
    course: "React Fundamentals",
    type: "text",
    duration: "30 minutes",
    status: "draft",
    createdAt: "2024-11-10",
    updatedAt: "2024-11-20",
    views: 0,
    completion: 0
  },
  {
    id: 4,
    title: "TypeScript Generics",
    description: "Master the power of generics in TypeScript for type-safe code",
    course: "Advanced TypeScript",
    type: "video",
    duration: "35 minutes",
    status: "published",
    createdAt: "2024-11-08",
    updatedAt: "2024-11-19",
    views: 156,
    completion: 82
  },
  {
    id: 5,
    title: "Design System Principles",
    description: "Creating consistent and scalable design systems for modern applications",
    course: "UI/UX Design",
    type: "interactive",
    duration: "45 minutes",
    status: "published",
    createdAt: "2024-11-12",
    updatedAt: "2024-11-21",
    views: 134,
    completion: 91
  }
];

const courses = ["React Fundamentals", "Advanced TypeScript", "UI/UX Design", "Node.js Backend"];

export function LessonsView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [view, setView] = useState("list"); // list, detail, create, edit
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    course: "",
    type: "video",
    duration: "",
    content: ""
  });

  const filteredLessons = lessons.filter(lesson =>
    lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
    setView("detail");
  };

  const handleCreateLesson = () => {
    setFormData({
      title: "",
      description: "",
      course: "",
      type: "video",
      duration: "",
      content: ""
    });
    setView("create");
  };

  const handleEditLesson = (lesson) => {
    setFormData({
      title: lesson.title,
      description: lesson.description,
      course: lesson.course,
      type: lesson.type,
      duration: lesson.duration,
      content: lesson.content || ""
    });
    setSelectedLesson(lesson);
    setView("edit");
  };

  const handleSaveLesson = () => {
    // In a real app, this would save to backend
    console.log("Saving lesson:", formData);
    setView("list");
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "video": return Video;
      case "text": return FileText;
      case "interactive": return PlayCircle;
      default: return BookOpen;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "video": return "bg-blue-100 text-blue-800";
      case "text": return "bg-green-100 text-green-800";
      case "interactive": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    return status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800";
  };

  // Create/Edit Form Component
  if (view === "create" || view === "edit") {
    return (
      <div className="space-y-6 max-w-full overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 max-w-full overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 min-w-0 overflow-hidden">
            <Button variant="ghost" onClick={() => setView("list")} className="self-start">
              ← Back to Lessons
            </Button>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground break-words">
              {view === "create" ? "Create New Lesson" : "Edit Lesson"}
            </h1>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button variant="outline" onClick={() => setView("list")} className="text-sm">
              <X className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Cancel</span>
              <span className="sm:hidden">Cancel</span>
            </Button>
            <Button onClick={handleSaveLesson} className="bg-gradient-primary text-white text-sm">
              <Save className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Save Lesson</span>
              <span className="sm:hidden">Save</span>
            </Button>
          </div>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 w-full max-w-full overflow-hidden">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 min-w-0 w-full overflow-hidden">
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle>Lesson Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-4 sm:p-6">
                <div>
                  <Label htmlFor="title">Lesson Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter lesson title..."
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter lesson description..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="course">Course</Label>
                    <Select value={formData.course} onValueChange={(value) => setFormData({ ...formData, course: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course} value={course}>{course}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="type">Lesson Type</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="interactive">Interactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g., 15 minutes"
                  />
                </div>

                <div>
                  <Label>Lesson Content</Label>
                  <RichTextEditor
                    value={formData.content}
                    onChange={(value) => setFormData({ ...formData, content: value })}
                    placeholder="Write your lesson content here. Use **bold**, *italic*, `code`, quotes, - lists, and [links](url) for rich formatting."
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4 sm:space-y-6 min-w-0 w-full overflow-hidden">
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle>Publishing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-4 sm:p-6">
                <Button className="w-full bg-gradient-primary text-white">
                  Publish Lesson
                </Button>
                <Button variant="outline" className="w-full">
                  Save as Draft
                </Button>
                <Button variant="outline" className="w-full">
                  Preview Lesson
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle>Media</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-4 sm:p-6">
                <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                  <Image className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">Upload lesson thumbnail</p>
                  <Button variant="outline" size="sm">
                    Choose File
                  </Button>
                </div>

                {formData.type === "video" && (
                  <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                    <Video className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">Upload video file</p>
                    <Button variant="outline" size="sm">
                      Choose File
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Detail View Component
  if (view === "detail" && selectedLesson) {
    return (
      <div className="space-y-6 max-w-full overflow-hidden">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => setView("list")}>
          ← Back to Lessons
        </Button>

        {/* Lesson Header */}
        <div className="bg-gradient-primary rounded-xl p-6 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3">
                <Badge className={`${getTypeColor(selectedLesson.type)} border-0`}>
                  {selectedLesson.type}
                </Badge>
                <Badge className={`${getStatusColor(selectedLesson.status)} border-0`}>
                  {selectedLesson.status}
                </Badge>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold mb-2 break-words">{selectedLesson.title}</h1>
              <p className="text-white/80 text-lg mb-4 break-words">{selectedLesson.description}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {selectedLesson.course}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {selectedLesson.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {selectedLesson.views} views
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-0"
                onClick={() => handleEditLesson(selectedLesson)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Lesson
              </Button>
              <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0">
                <PlayCircle className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </div>
          </div>
        </div>

        {/* Lesson Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { label: "Total Views", value: selectedLesson.views, icon: Eye, color: "text-primary" },
            { label: "Completion Rate", value: `${selectedLesson.completion}%`, icon: PlayCircle, color: "text-secondary" },
            { label: "Duration", value: selectedLesson.duration, icon: Clock, color: "text-accent" },
            { label: "Course", value: selectedLesson.course, icon: BookOpen, color: "text-primary" }
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

        {/* Lesson Content Preview */}
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle>Lesson Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <PlayCircle className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">Lesson content preview</p>
              </div>
            </div>
            <p className="text-muted-foreground">
              This is where the lesson content would be displayed. For video lessons,
              you would see the video player. For text lessons, the formatted content would appear here.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // List View (Default)
  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Lessons</h1>
          <p className="text-muted-foreground">Create and manage your lesson content</p>
        </div>
        <Button
          onClick={handleCreateLesson}
          className="bg-gradient-primary text-white hover:shadow-glow transition-all flex-shrink-0"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Lesson
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-card">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search lessons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                All ({lessons.length})
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                Published ({lessons.filter(l => l.status === 'published').length})
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lessons List */}
      <div className="space-y-4">
        {filteredLessons.map((lesson) => {
          const TypeIcon = getTypeIcon(lesson.type);
          return (
            <Card
              key={lesson.id}
              className="border-0 shadow-card hover:shadow-elegant transition-all duration-300 cursor-pointer animate-scale-in group"
              onClick={() => handleLessonClick(lesson)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1 min-w-0 overflow-hidden">
                    <div className="p-3 rounded-lg bg-muted flex-shrink-0">
                      <TypeIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors break-words">
                          {lesson.title}
                        </h3>
                        <Badge className={`${getTypeColor(lesson.type)} border-0 flex-shrink-0`}>
                          {lesson.type}
                        </Badge>
                        <Badge className={`${getStatusColor(lesson.status)} border-0 flex-shrink-0`}>
                          {lesson.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2 break-words">
                        {lesson.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          {lesson.course}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {lesson.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {lesson.views} views
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(lesson.updatedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditLesson(lesson);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}