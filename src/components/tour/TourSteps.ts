export function getTutorTourSteps(): any[] {
<<<<<<< Updated upstream
  return [
    {
      title: 'Welcome to Your Tutor Dashboard! 🎓',
      text: `
=======
    return [
        {
            title: 'Welcome to Your Tutor Dashboard! 🎓',
            text: `
>>>>>>> Stashed changes
        <div class="space-y-3">
          <p>Welcome to your comprehensive LMS dashboard! Let's take a quick tour to help you get started with managing your students, courses, and lessons.</p>
          <div class="bg-primary/10 p-3 rounded-lg border border-primary/20">
            <p class="text-sm font-medium">💡 <strong>Pro Tip:</strong> You can always restart this tour using the help button in the top-right corner.</p>
          </div>
        </div>
      `,
<<<<<<< Updated upstream
      attachTo: {
        element: '[data-tour="dashboard-header"]',
        on: 'bottom',
      },
    },
    {
      title: 'Navigation Sidebar 📚',
      text: `
=======
            attachTo: {
                element: '[data-tour="dashboard-header"]',
                on: 'bottom',
            },
        },
        {
            title: 'Navigation Sidebar 📚',
            text: `
>>>>>>> Stashed changes
        <div class="space-y-3">
          <p>This is your main navigation hub. Here you can access:</p>
          <ul class="list-disc list-inside space-y-1 text-sm">
            <li><strong>Dashboard:</strong> Overview and statistics</li>
            <li><strong>Students:</strong> Manage your student roster</li>
            <li><strong>Courses:</strong> Create and organize your courses</li>
            <li><strong>Lessons:</strong> Design engaging lesson content</li>
          </ul>
          <p class="text-sm text-muted-foreground">💡 The sidebar can be collapsed for more workspace.</p>
        </div>
      `,
<<<<<<< Updated upstream
      attachTo: {
        element: '[data-tour="sidebar"]',
        on: 'right',
      },
    },
    {
      title: 'Dashboard Overview 📊',
      text: `
=======
            attachTo: {
                element: '[data-tour="sidebar"]',
                on: 'right',
            },
        },
        {
            title: 'Dashboard Overview 📊',
            text: `
>>>>>>> Stashed changes
        <div class="space-y-3">
          <p>Your dashboard provides a comprehensive overview of your teaching activities:</p>
          <ul class="list-disc list-inside space-y-1 text-sm">
            <li><strong>Statistics:</strong> Total students, courses, and lessons</li>
            <li><strong>Recent Activities:</strong> Latest student interactions</li>
            <li><strong>Upcoming Tasks:</strong> Scheduled lessons and assignments</li>
            <li><strong>Subscription Status:</strong> Your current plan details</li>
          </ul>
        </div>
      `,
<<<<<<< Updated upstream
      attachTo: {
        element: '[data-tour="dashboard-stats"]',
        on: 'bottom',
      },
    },
    {
      title: 'Students Management 👥',
      text: `
=======
            attachTo: {
                element: '[data-tour="dashboard-stats"]',
                on: 'bottom',
            },
        },
        {
            title: 'Students Management 👥',
            text: `
>>>>>>> Stashed changes
        <div class="space-y-3">
          <p>Click on "Students" in the sidebar to:</p>
          <ul class="list-disc list-inside space-y-1 text-sm">
            <li>View your complete student roster</li>
            <li>Track individual student progress</li>
            <li>Manage student enrollments</li>
            <li>Send invitations to new students</li>
            <li>Monitor student engagement</li>
          </ul>
          <div class="bg-accent/10 p-3 rounded-lg border border-accent/20">
            <p class="text-sm">🚀 <strong>Quick Action:</strong> You can invite students via email directly from this section.</p>
          </div>
        </div>
      `,
<<<<<<< Updated upstream
      attachTo: {
        element: '[data-tour="nav-students"]',
        on: 'right',
      },
    },
    {
      title: 'Courses Management 📖',
      text: `
=======
            attachTo: {
                element: '[data-tour="nav-students"]',
                on: 'right',
            },
        },
        {
            title: 'Courses Management 📖',
            text: `
>>>>>>> Stashed changes
        <div class="space-y-3">
          <p>The Courses section is where you:</p>
          <ul class="list-disc list-inside space-y-1 text-sm">
            <li>Create new courses with rich content</li>
            <li>Organize course materials and resources</li>
            <li>Set course prerequisites and difficulty levels</li>
            <li>Track course completion rates</li>
            <li>Publish or draft courses</li>
          </ul>
          <p class="text-sm text-muted-foreground">💡 Each course can contain multiple lessons and assessments.</p>
        </div>
      `,
<<<<<<< Updated upstream
      attachTo: {
        element: '[data-tour="nav-courses"]',
        on: 'right',
      },
    },
    {
      title: 'Lessons Management ✏️',
      text: `
=======
            attachTo: {
                element: '[data-tour="nav-courses"]',
                on: 'right',
            },
        },
        {
            title: 'Lessons Management ✏️',
            text: `
>>>>>>> Stashed changes
        <div class="space-y-3">
          <p>In the Lessons section, you can:</p>
          <ul class="list-disc list-inside space-y-1 text-sm">
            <li>Create interactive lesson content</li>
            <li>Add multimedia elements (videos, images, documents)</li>
            <li>Design quizzes and assignments</li>
            <li>Schedule live sessions</li>
            <li>Track lesson completion and engagement</li>
          </ul>
          <div class="bg-success/10 p-3 rounded-lg border border-success/20">
            <p class="text-sm">✨ <strong>Feature:</strong> Lessons support rich text editing and multimedia integration.</p>
          </div>
        </div>
      `,
<<<<<<< Updated upstream
      attachTo: {
        element: '[data-tour="nav-lessons"]',
        on: 'right',
      },
    },
    {
      title: 'Profile & Settings ⚙️',
      text: `
=======
            attachTo: {
                element: '[data-tour="nav-lessons"]',
                on: 'right',
            },
        },
        {
            title: 'Profile & Settings ⚙️',
            text: `
>>>>>>> Stashed changes
        <div class="space-y-3">
          <p>Your profile section includes:</p>
          <ul class="list-disc list-inside space-y-1 text-sm">
            <li>Profile picture and personal information</li>
            <li>Account settings and preferences</li>
            <li>Notification settings</li>
            <li>Security and privacy options</li>
            <li>Logout functionality</li>
          </ul>
          <p class="text-sm text-muted-foreground">🔔 Check the bell icon for important notifications and updates.</p>
        </div>
      `,
<<<<<<< Updated upstream
      attachTo: {
        element: '[data-tour="profile-section"]',
        on: 'left',
      },
    },
    {
      title: 'You\'re All Set! 🎉',
      text: `
=======
            attachTo: {
                element: '[data-tour="profile-section"]',
                on: 'left',
            },
        },
        {
            title: 'You\'re All Set! 🎉',
            text: `
>>>>>>> Stashed changes
        <div class="space-y-4">
          <p>Congratulations! You've completed the tutor dashboard tour.</p>
          <div class="bg-gradient-primary p-4 rounded-lg text-white">
            <h4 class="font-bold mb-2">Ready to start teaching?</h4>
            <p class="text-sm">Begin by creating your first course or inviting students to join your classes.</p>
          </div>
          <div class="space-y-2 text-sm">
            <p><strong>Next steps:</strong></p>
            <ul class="list-disc list-inside space-y-1">
              <li>Create your first course</li>
              <li>Add engaging lesson content</li>
              <li>Invite students to join</li>
            </ul>
          </div>
          <p class="text-xs text-muted-foreground">💡 Remember: You can restart this tour anytime using the help button.</p>
        </div>
      `,
<<<<<<< Updated upstream
    },
  ];
}

export function getStudentTourSteps(): any[] {
  return [
    {
      title: 'Welcome to Your Learning Dashboard! 📚',
      text: `
=======
        },
    ];
}

export function getStudentTourSteps(): any[] {
    return [
        {
            title: 'Welcome to Your Learning Dashboard! 📚',
            text: `
>>>>>>> Stashed changes
        <div class="space-y-3">
          <p>Welcome to your personal learning hub! Let's explore how you can access courses, track progress, and manage your learning journey.</p>
          <div class="bg-primary/10 p-3 rounded-lg border border-primary/20">
            <p class="text-sm font-medium">🎯 <strong>Your Goal:</strong> Navigate through courses and lessons to enhance your learning experience.</p>
          </div>
        </div>
      `,
<<<<<<< Updated upstream
      attachTo: {
        element: '[data-tour="dashboard-header"]',
        on: 'bottom',
      },
    },
    {
      title: 'Student Navigation 🧭',
      text: `
=======
            attachTo: {
                element: '[data-tour="dashboard-header"]',
                on: 'bottom',
            },
        },
        {
            title: 'Student Navigation 🧭',
            text: `
>>>>>>> Stashed changes
        <div class="space-y-3">
          <p>Your navigation sidebar provides quick access to:</p>
          <ul class="list-disc list-inside space-y-1 text-sm">
            <li><strong>Dashboard:</strong> Your learning overview and progress</li>
            <li><strong>Courses:</strong> Browse and enroll in available courses</li>
            <li><strong>Lessons:</strong> Access your current and completed lessons</li>
          </ul>
          <p class="text-sm text-muted-foreground">💡 The sidebar helps you stay organized and find content quickly.</p>
        </div>
      `,
<<<<<<< Updated upstream
      attachTo: {
        element: '[data-tour="sidebar"]',
        on: 'right',
      },
    },
    {
      title: 'Your Learning Progress 📈',
      text: `
=======
            attachTo: {
                element: '[data-tour="sidebar"]',
                on: 'right',
            },
        },
        {
            title: 'Your Learning Progress 📈',
            text: `
>>>>>>> Stashed changes
        <div class="space-y-3">
          <p>Your dashboard shows your learning journey:</p>
          <ul class="list-disc list-inside space-y-1 text-sm">
            <li><strong>Enrolled Courses:</strong> Courses you're currently taking</li>
            <li><strong>Recent Lessons:</strong> Your latest learning activities</li>
            <li><strong>Progress Tracking:</strong> Completion status and achievements</li>
            <li><strong>Upcoming Deadlines:</strong> Important dates and assignments</li>
          </ul>
          <div class="bg-success/10 p-3 rounded-lg border border-success/20">
            <p class="text-sm">🏆 <strong>Motivation:</strong> Track your progress and celebrate achievements!</p>
          </div>
        </div>
      `,
<<<<<<< Updated upstream
      attachTo: {
        element: '[data-tour="dashboard-stats"]',
        on: 'bottom',
      },
    },
    {
      title: 'Course Enrollment 📖',
      text: `
=======
            attachTo: {
                element: '[data-tour="dashboard-stats"]',
                on: 'bottom',
            },
        },
        {
            title: 'Course Enrollment 📖',
            text: `
>>>>>>> Stashed changes
        <div class="space-y-3">
          <p>In the Courses section, you can:</p>
          <ul class="list-disc list-inside space-y-1 text-sm">
            <li>Browse available courses by category</li>
            <li>View course descriptions and requirements</li>
            <li>Enroll in courses that interest you</li>
            <li>Track your enrollment status</li>
            <li>Access course materials and resources</li>
          </ul>
          <p class="text-sm text-muted-foreground">🔍 Use filters to find courses that match your interests and skill level.</p>
        </div>
      `,
<<<<<<< Updated upstream
      attachTo: {
        element: '[data-tour="nav-courses"]',
        on: 'right',
      },
    },
    {
      title: 'Accessing Lessons 📝',
      text: `
=======
            attachTo: {
                element: '[data-tour="nav-courses"]',
                on: 'right',
            },
        },
        {
            title: 'Accessing Lessons 📝',
            text: `
>>>>>>> Stashed changes
        <div class="space-y-3">
          <p>The Lessons section is your learning workspace:</p>
          <ul class="list-disc list-inside space-y-1 text-sm">
            <li>View all available lessons from your enrolled courses</li>
            <li>Track completion status for each lesson</li>
            <li>Access multimedia content and interactive materials</li>
            <li>Submit assignments and take quizzes</li>
            <li>Review your scores and feedback</li>
          </ul>
          <div class="bg-accent/10 p-3 rounded-lg border border-accent/20">
            <p class="text-sm">⚡ <strong>Tip:</strong> Complete lessons in order to unlock advanced content.</p>
          </div>
        </div>
      `,
<<<<<<< Updated upstream
      attachTo: {
        element: '[data-tour="nav-lessons"]',
        on: 'right',
      },
    },
    {
      title: 'Profile & Account 👤',
      text: `
=======
            attachTo: {
                element: '[data-tour="nav-lessons"]',
                on: 'right',
            },
        },
        {
            title: 'Profile & Account 👤',
            text: `
>>>>>>> Stashed changes
        <div class="space-y-3">
          <p>Manage your learning experience through:</p>
          <ul class="list-disc list-inside space-y-1 text-sm">
            <li>Personal profile and learning preferences</li>
            <li>Notification settings for course updates</li>
            <li>Achievement badges and certificates</li>
            <li>Learning statistics and progress reports</li>
            <li>Account security and privacy settings</li>
          </ul>
          <p class="text-sm text-muted-foreground">🔔 Stay updated with notifications about new content and deadlines.</p>
        </div>
      `,
<<<<<<< Updated upstream
      attachTo: {
        element: '[data-tour="profile-section"]',
        on: 'left',
      },
    },
    {
      title: 'Start Your Learning Journey! 🚀',
      text: `
=======
            attachTo: {
                element: '[data-tour="profile-section"]',
                on: 'left',
            },
        },
        {
            title: 'Start Your Learning Journey! 🚀',
            text: `
>>>>>>> Stashed changes
        <div class="space-y-4">
          <p>Perfect! You're ready to begin your learning adventure.</p>
          <div class="bg-gradient-primary p-4 rounded-lg text-white">
            <h4 class="font-bold mb-2">Ready to learn?</h4>
            <p class="text-sm">Explore available courses and start building new skills today!</p>
          </div>
          <div class="space-y-2 text-sm">
            <p><strong>Recommended next steps:</strong></p>
            <ul class="list-disc list-inside space-y-1">
              <li>Browse and enroll in your first course</li>
              <li>Complete your profile setup</li>
              <li>Start with introductory lessons</li>
            </ul>
          </div>
          <p class="text-xs text-muted-foreground">💡 You can restart this tour anytime using the help button.</p>
        </div>
      `,
<<<<<<< Updated upstream
    },
  ];
=======
        },
    ];
>>>>>>> Stashed changes
}