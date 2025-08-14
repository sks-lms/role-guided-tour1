import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Mail, Phone, Calendar, BookOpen, MoreVertical, Settings, Eye, Send, Clock, Users } from "lucide-react";
import { useHandler } from "./handler";

export function StudentsView() {
    const [state, handlers] = useHandler();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Students</h1>
                    <p className="text-muted-foreground">Manage your students and their course access</p>
                </div>
                <Dialog open={state.isInviteDialogOpen} onOpenChange={handlers.setIsInviteDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-gradient-primary text-white hover:shadow-glow transition-all">
                            <Send className="w-4 h-4 mr-2" />
                            Invite Student
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
                                placeholder="Search students by name or email..."
                                value={state.searchTerm}
                                onChange={(e) => handlers.setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                                All ({state.students.length})
                            </Badge>
                            <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                                Active ({state.students.filter(s => s.status === 'active').length})
                            </Badge>
                            <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                                Inactive ({state.students.filter(s => s.status === 'inactive').length})
                            </Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Students Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {state.filteredStudents.map((student) => (
                    <Card key={student.id} className="border-0 shadow-card hover:shadow-elegant transition-all duration-300 animate-scale-in">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <Avatar className="w-12 h-12">
                                        <AvatarFallback className="bg-gradient-primary text-white font-semibold">
                                            {handlers.getInitials(student.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-semibold text-foreground">{student.name}</h3>
                                        <div className="flex gap-1">
                                            <Badge
                                                variant={student.status === 'active' ? 'default' : 'secondary'}
                                                className="text-xs"
                                            >
                                                {student.status}
                                            </Badge>
                                            <Badge
                                                variant={student.inviteStatus === 'accepted' ? 'default' : 'outline'}
                                                className={`text-xs ${student.inviteStatus === 'accepted'
                                                    ? 'bg-green-100 text-green-800 border-green-200 hover:bg-green-100'
                                                    : 'bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-100'
                                                    }`}
                                            >
                                                {student.inviteStatus}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center text-muted-foreground">
                                    <Mail className="w-4 h-4 mr-2" />
                                    {student.email}
                                </div>
                                <div className="flex items-center text-muted-foreground">
                                    <Phone className="w-4 h-4 mr-2" />
                                    {student.phone}
                                </div>
                                <div className="flex items-center text-muted-foreground">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    Joined {new Date(student.joinDate).toLocaleDateString()}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Progress</span>
                                    <span className="font-medium">{student.progress}%</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                    <div
                                        className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${student.progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm font-medium text-foreground">Enrolled Courses</p>
                                <div className="flex flex-wrap gap-1">
                                    {student.courses.map((course, index) => (
                                        <Badge key={index} variant="outline" className="text-xs">
                                            {course}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-2 pt-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1"
                                    onClick={() => handlers.handleCourseAccess(student)}
                                >
                                    <Settings className="w-4 h-4 mr-1" />
                                    Manage Access
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Eye className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Course Access Dialog */}
            <Dialog open={state.isDialogOpen} onOpenChange={handlers.setIsDialogOpen}>
                <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-lg mx-auto p-3 sm:p-6">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-primary" />
                            Manage Course Access
                        </DialogTitle>
                    </DialogHeader>
                    {state.selectedStudent && (
                        <div className="space-y-6">
                            <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
                                <Avatar className="w-10 h-10">
                                    <AvatarFallback className="bg-gradient-primary text-white font-semibold">
                                        {handlers.getInitials(state.selectedStudent.name)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h4 className="font-medium">{state.selectedStudent.name}</h4>
                                    <p className="text-sm text-muted-foreground">{state.selectedStudent.email}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-3">
                                    <h5 className="font-medium">Access Duration</h5>
                                    <Select value={state.accessDuration} onValueChange={handlers.setAccessDuration}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select duration" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1_month">1 Month Access</SelectItem>
                                            <SelectItem value="3_months">3 Months Access</SelectItem>
                                            <SelectItem value="6_months">6 Months Access</SelectItem>
                                            <SelectItem value="1_year">1 Year Access</SelectItem>
                                            <SelectItem value="custom">Custom Duration</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    {state.accessDuration === "custom" && (
                                        <div className="space-y-2">
                                            <Input
                                                type="date"
                                                value={state.customDuration}
                                                onChange={(e) => handlers.setCustomDuration(e.target.value)}
                                                className="w-full"
                                            />
                                            <p className="text-xs text-muted-foreground">
                                                Select custom access end date
                                            </p>
                                        </div>
                                    )}

                                    <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Clock className="w-4 h-4 text-primary" />
                                            <span className="font-medium">Duration Preview:</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {state.accessDuration === "1_month" && "Access expires on " + new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                                            {state.accessDuration === "3_months" && "Access expires on " + new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                                            {state.accessDuration === "6_months" && "Access expires on " + new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                                            {state.accessDuration === "1_year" && "Access expires on " + new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                                            {state.accessDuration === "custom" && state.customDuration && "Access expires on " + new Date(state.customDuration).toLocaleDateString()}
                                            {state.accessDuration === "custom" && !state.customDuration && "Please select a custom end date"}
                                        </p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-3">
                                    <h5 className="font-medium">Available Courses</h5>
                                    <div className="max-h-48 overflow-y-auto space-y-2">
                                        {state.availableCourses.map((course) => (
                                            <div key={course} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                                                <Checkbox
                                                    id={course}
                                                    checked={state.selectedCourses.includes(course)}
                                                    onCheckedChange={() => handlers.toggleCourse(course)}
                                                />
                                                <label
                                                    htmlFor={course}
                                                    className="text-sm font-medium cursor-pointer flex-1"
                                                >
                                                    {course}
                                                </label>
                                                {state.selectedCourses.includes(course) && (
                                                    <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
                                                        Selected
                                                    </Badge>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-4">
                                <Button variant="outline" onClick={() => handlers.setIsDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button className="bg-gradient-primary text-white">
                                    Save Changes
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Invite Student Dialog */}
            <Dialog open={state.isInviteDialogOpen} onOpenChange={handlers.setIsInviteDialogOpen}>
                <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-md mx-auto p-3 sm:p-6">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Send className="w-5 h-5 text-primary" />
                            Invite Student
                        </DialogTitle>
                    </DialogHeader>

                    <Tabs defaultValue="invite" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="invite" className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                Send Invite
                            </TabsTrigger>
                            <TabsTrigger value="history" className="flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                Invitation History
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="invite" className="space-y-4 mt-4">
                            <div className="space-y-2">
                                <label htmlFor="invite-email" className="text-sm font-medium">
                                    Student Email
                                </label>
                                <Input
                                    id="invite-email"
                                    type="email"
                                    placeholder="student@example.com"
                                    value={state.inviteEmail}
                                    onChange={(e) => handlers.setInviteEmail(e.target.value)}
                                />
                            </div>

                            <div className="p-4 bg-muted rounded-lg">
                                <h5 className="font-medium mb-2">Invitation Preview</h5>
                                <div className="text-sm text-muted-foreground space-y-1">
                                    <p>Subject: You're invited to join our learning platform</p>
                                    <p>The student will receive an email with:</p>
                                    <ul className="list-disc list-inside ml-4 space-y-1">
                                        <li>Welcome message from Dr. Wilson</li>
                                        <li>Platform access instructions</li>
                                        <li>Login credentials setup</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => handlers.setIsInviteDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button
                                    className="bg-gradient-primary text-white"
                                    disabled={!state.inviteEmail}
                                    onClick={(e) => handlers.onSendInvite(e)}
                                >
                                    <Send className="w-4 h-4 mr-2" />
                                    Send Invitation
                                </Button>
                            </div>
                        </TabsContent>

                        <TabsContent value="history" className="space-y-4 mt-4">
                            <div className="space-y-3">
                                <h5 className="font-medium">Recent Invitations</h5>
                                <div className="space-y-2 max-h-48 overflow-y-auto">
                                    {state.invitationHistory
                                        .map((invite, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                                                <div>
                                                    <p className="text-sm font-medium">{invite.email}</p>
                                                    <p className="text-xs text-muted-foreground">{new Date(invite.date).toLocaleDateString('en-CA')}</p>
                                                </div>
                                                <Badge
                                                    variant={invite.status === 'ACCEPTED' ? 'default' : 'outline'}
                                                    className={invite.status === 'ACCEPTED'
                                                        ? 'bg-green-100 text-green-800 border-green-200'
                                                        : invite.status === 'REJECTED'
                                                            ? 'bg-red-100 text-red-800 border-red-200'
                                                            : 'bg-orange-100 text-orange-800 border-orange-200'
                                                    }
                                                >
                                                    {invite.status}
                                                </Badge>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </DialogContent>
            </Dialog>
        </div>
    );
}