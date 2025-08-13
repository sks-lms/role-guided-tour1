import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, Trophy, Target, Play, ChevronRight } from "lucide-react";
import { useHandler } from "./handler";

export function StudentDashboardOverview() {
    const [state, handlers] = useHandler();

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Welcome Section */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-foreground">Welcome back, {state.studentData?.name}</h1>
                <p className="text-muted-foreground">Continue your learning journey</p>
            </div>

            {/* My Courses Section */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-foreground">My Courses</h2>
                    <Button variant="ghost" className="text-primary hover:text-primary/80">
                        View all <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {state.enrolledCourses.map((course) => (
                        <Card key={course.id} className="hover:shadow-card transition-all duration-300 hover-scale cursor-pointer group">
                            <div className="relative">
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                                <div className="absolute inset-0 bg-black/20 rounded-t-lg group-hover:bg-black/30 transition-colors duration-300"></div>
                                <div className="absolute top-4 right-4">
                                    <Badge variant="secondary" className="bg-white/90 text-foreground">
                                        {course.progress}% complete
                                    </Badge>
                                </div>
                            </div>
                            <CardContent className="p-4">
                                <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                                <p className="text-sm text-muted-foreground mb-3">Instructor: {course.instructor}</p>

                                <div className="space-y-2 mb-4">
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
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Lessons */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">Recent Lessons</h2>

                    <Card>
                        <CardContent className="p-6">
                            {state.recentLessons.length === 0 ? (
                                <p className="text-center text-muted-foreground py-8">No recent lessons available.</p>
                            ) : (
                                <div className="space-y-4">
                                    {state.recentLessons.map((lesson) => (
                                        <div key={lesson.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-lg ${lesson.completed ? 'bg-green-100 text-green-600' : 'bg-primary/10 text-primary'}`}>
                                                    {lesson.completed ? (
                                                        <Trophy className="h-4 w-4" />
                                                    ) : (
                                                        <Play className="h-4 w-4" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium">{lesson.title}</p>
                                                    <p className="text-sm text-muted-foreground">{lesson.course}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Clock className="h-4 w-4" />
                                                {lesson.duration}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </section>

                {/* Progress Section */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground">Progress</h2>

                    <div className="space-y-4">
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg">Overall Progress</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Completed</span>
                                        <span>47%</span>
                                    </div>
                                    <Progress value={47} className="h-3" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg">Course Completion</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Completed</span>
                                        <span>2 of 5</span>
                                    </div>
                                    <Progress value={40} className="h-3" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg">Learning Streak</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Current Streak</span>
                                        <span>5 days</span>
                                    </div>
                                    <Progress value={71} className="h-3" />
                                    <p className="text-xs text-muted-foreground">Keep it up! 2 more days for your weekly goal.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </div>

            {/* Recommendations */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">Recommendations</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {state.recommendations.map((rec) => (
                        <Card key={rec.id} className="hover:shadow-card transition-all duration-300 cursor-pointer">
                            <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Target className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold mb-1">{rec.title}</h3>
                                        <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                                        <Badge variant="outline" className="text-xs">{rec.course}</Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
}