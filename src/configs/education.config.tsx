import type { Config } from "@measured/puck";
import { EducationHero, type EducationHeroProps } from "../blocks/EducationHero";
import { CourseList, type CourseListProps } from "../blocks/CourseList";
import { TutorProfiles, type TutorProfilesProps } from "../blocks/TutorProfiles";
import { StudentTestimonials, type StudentTestimonialsProps } from "../blocks/StudentTestimonials";
import { EducationStats, type EducationStatsProps } from "../blocks/EducationStats";
import { WhyChooseUs, type WhyChooseUsProps } from "../blocks/WhyChooseUs";
import { FeaturedCourse, type FeaturedCourseProps } from "../blocks/FeaturedCourse";
import { LearningProcess, type LearningProcessProps } from "../blocks/LearningProcess";
import { PricingPlans, type PricingPlansProps } from "../blocks/PricingPlans";
import { ClassSchedule, type ClassScheduleProps } from "../blocks/ClassSchedule";
import { EducationFAQ, type EducationFAQProps } from "../blocks/EducationFAQ";
import { StudentResults, type StudentResultsProps } from "../blocks/StudentResults";
import { UniversityPartners, type UniversityPartnersProps } from "../blocks/UniversityPartners";
import { EnrollmentCTA, type EnrollmentCTAProps } from "../blocks/EnrollmentCTA";
import { ImageUploadField } from "../components/ImageUploadField";

type Props = {
  EducationHero: EducationHeroProps;
  CourseList: CourseListProps;
  TutorProfiles: TutorProfilesProps;
  StudentTestimonials: StudentTestimonialsProps;
  EducationStats: EducationStatsProps;
  WhyChooseUs: WhyChooseUsProps;
  FeaturedCourse: FeaturedCourseProps;
  LearningProcess: LearningProcessProps;
  PricingPlans: PricingPlansProps;
  ClassSchedule: ClassScheduleProps;
  EducationFAQ: EducationFAQProps;
  StudentResults: StudentResultsProps;
  UniversityPartners: UniversityPartnersProps;
  EnrollmentCTA: EnrollmentCTAProps;
};

export const educationConfig: Config<Props> = {
  components: {
    EducationHero: {
      fields: {
        headline: { type: "text" },
        subheadline: { type: "textarea" },
        ctaText: { type: "text" },
        backgroundImageUrl: {
          type: "custom",
          render: ImageUploadField,
        },
      },
      defaultProps: {
        headline: "Master Your Future With Elite Coaching",
        subheadline:
          "Join thousands of successful students who have achieved their dreams with our expert tutors, interactive learning, and proven curriculum.",
        ctaText: "Start Learning Today",
        backgroundImageUrl:
          "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
      },
      render: ({ puck, ...props }) => <EducationHero {...props} />,
    },
    EducationStats: {
      fields: {
        stats: {
          type: "array",
          arrayFields: {
            label: { type: "text" },
            value: { type: "number" },
            suffix: { type: "text" },
            icon: {
              type: "select",
              options: [
                { label: "Users", value: "Users" },
                { label: "Book", value: "BookOpen" },
                { label: "Trophy", value: "Trophy" },
                { label: "Globe", value: "Globe" }
              ]
            }
          },
          getItemSummary: (item) => item.label || "Stat",
        },
      },
      defaultProps: {
        stats: [
          { label: "Active Learners", value: 25000, suffix: "+", icon: "Users" },
          { label: "Premium Courses", value: 150, suffix: "+", icon: "BookOpen" },
          { label: "Success Rate", value: 98, suffix: "%", icon: "Trophy" },
          { label: "Countries Reached", value: 45, suffix: "", icon: "Globe" },
        ],
      },
      render: ({ puck, ...props }) => <EducationStats {...props} />,
    },
    UniversityPartners: {
      fields: {
        title: { type: "text" },
        partners: {
          type: "array",
          arrayFields: {
            name: { type: "text" },
            logo: { type: "custom", render: ImageUploadField },
          },
          getItemSummary: (item) => item.name || "Partner",
        },
      },
      defaultProps: {
        title: "Recognized by top institutions worldwide",
        partners: [
          { name: "University A", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
          { name: "University B", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
          { name: "University C", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
          { name: "University D", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
        ]
      },
      render: ({ puck, ...props }) => <UniversityPartners {...props} />,
    },
    WhyChooseUs: {
      fields: {
        title: { type: "text" },
        subtitle: { type: "textarea" },
        features: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
            description: { type: "textarea" },
            icon: {
              type: "select",
              options: [
                { label: "Shield", value: "ShieldCheck" },
                { label: "Zap", value: "Zap" },
                { label: "Users", value: "Users" },
                { label: "Target", value: "Target" }
              ]
            }
          },
          getItemSummary: (item) => item.title || "Feature",
        },
      },
      defaultProps: {
        title: "Why Learn With Us",
        subtitle: "We combine world-class instruction with modern technology to deliver the best learning experience.",
        features: [
          { title: "Expert Instructors", description: "Learn directly from industry professionals with years of real-world experience.", icon: "Users" },
          { title: "Interactive Learning", description: "Engage with practical projects and hands-on exercises, not just videos.", icon: "Zap" },
          { title: "Career Focused", description: "Curriculum designed to help you land your dream job or get promoted.", icon: "Target" },
          { title: "Money-Back Guarantee", description: "Not satisfied within the first 30 days? Get a full refund, no questions asked.", icon: "ShieldCheck" },
        ]
      },
      render: ({ puck, ...props }) => <WhyChooseUs {...props} />,
    },
    FeaturedCourse: {
      fields: {
        badge: { type: "text" },
        title: { type: "text" },
        description: { type: "textarea" },
        image: { type: "custom", render: ImageUploadField },
        ctaText: { type: "text" },
        stats: {
          type: "array",
          arrayFields: { text: { type: "text" } },
        }
      },
      defaultProps: {
        badge: "Bestseller",
        title: "Full-Stack Web Development Bootcamp",
        description: "Go from beginner to hired in 16 weeks. Learn React, Node.js, and modern cloud architecture by building real-world applications.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
        ctaText: "Enroll Now - $499",
        stats: ["4.9/5 Rating", "12,000+ Students", "16 Weeks"]
      },
      render: ({ puck, ...props }) => <FeaturedCourse {...props} stats={props.stats as unknown as string[]} />,
    },
    CourseList: {
      fields: {
        title: { type: "text" },
        subtitle: { type: "text" },
        courses: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
            description: { type: "textarea" },
            duration: { type: "text" },
            level: { type: "text" },
            image: { type: "custom", render: ImageUploadField },
          },
          getItemSummary: (item) => item.title || "Course",
        },
      },
      defaultProps: {
        title: "Explore Our Top Programs",
        subtitle: "From high school prep to advanced technical skills, we have a course tailored for your success.",
        courses: [
          {
            title: "Advanced Mathematics",
            description: "Master calculus, algebra, and geometry with in-depth lectures and practical problem-solving.",
            duration: "12 Weeks",
            level: "Intermediate",
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop",
          },
          {
            title: "Data Science Foundation",
            description: "Learn Python, statistics, and machine learning basics to kickstart your data career.",
            duration: "16 Weeks",
            level: "Beginner",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
          },
          {
            title: "SAT Prep Masterclass",
            description: "Comprehensive preparation covering all sections with timed practice tests and strategies.",
            duration: "8 Weeks",
            level: "All Levels",
            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
          },
        ],
      },
      render: ({ puck, ...props }) => <CourseList {...props} />,
    },
    LearningProcess: {
      fields: {
        title: { type: "text" },
        steps: {
          type: "array",
          arrayFields: {
            title: { type: "text" },
            description: { type: "textarea" },
          },
          getItemSummary: (item) => item.title || "Step",
        }
      },
      defaultProps: {
        title: "How It Works",
        steps: [
          { title: "Discover", description: "Find the perfect course tailored to your skill level and career goals." },
          { title: "Learn", description: "Engage with expert-led video lectures and interactive reading materials." },
          { title: "Practice", description: "Apply what you've learned through hands-on projects and quizzes." },
          { title: "Achieve", description: "Earn your certificate and get ready to advance your career." },
        ]
      },
      render: ({ puck, ...props }) => <LearningProcess {...props} />,
    },
    TutorProfiles: {
      fields: {
        title: { type: "text" },
        tutors: {
          type: "array",
          arrayFields: {
            name: { type: "text" },
            subject: { type: "text" },
            bio: { type: "textarea" },
            image: { type: "custom", render: ImageUploadField },
          },
          getItemSummary: (item) => item.name || "Tutor",
        },
      },
      defaultProps: {
        title: "Meet Your Mentors",
        tutors: [
          {
            name: "Dr. Sarah Jenkins",
            subject: "Mathematics",
            bio: "Former university professor with 15 years of teaching experience. Passionate about numbers.",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
          },
          {
            name: "David Chen",
            subject: "Computer Science",
            bio: "Ex-Google engineer bringing industry insights into the classroom for practical learning.",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
          },
          {
            name: "Maria Rodriguez",
            subject: "Languages & Lit",
            bio: "Award-winning author and polyglot dedicated to expanding students' cultural horizons.",
            image: "https://images.unsplash.com/photo-1580820267682-426da823ed65?q=80&w=2070&auto=format&fit=crop",
          },
          {
            name: "James Wilson",
            subject: "Physics",
            bio: "Makes complex concepts easy to understand. Researcher in applied physics.",
            image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=1974&auto=format&fit=crop",
          },
        ],
      },
      render: ({ puck, ...props }) => <TutorProfiles {...props} />,
    },
    ClassSchedule: {
      fields: {
        title: { type: "text" },
        subtitle: { type: "textarea" },
        classes: {
          type: "array",
          arrayFields: {
            time: { type: "text" },
            name: { type: "text" },
            instructor: { type: "text" },
            location: { type: "text" },
            spotsLeft: { type: "number" },
          },
          getItemSummary: (item) => item.name || "Class",
        }
      },
      defaultProps: {
        title: "Upcoming Live Sessions",
        subtitle: "Join our expert instructors for live, interactive learning sessions.",
        classes: [
          { time: "09:00 AM", name: "Introduction to React Hooks", instructor: "David Chen", location: "Virtual Room A", spotsLeft: 12 },
          { time: "11:30 AM", name: "Advanced Calculus Workshop", instructor: "Dr. Sarah Jenkins", location: "Virtual Room B", spotsLeft: 5 },
          { time: "02:00 PM", name: "Creative Writing Masterclass", instructor: "Maria Rodriguez", location: "Virtual Room C", spotsLeft: 8 },
        ]
      },
      render: ({ puck, ...props }) => <ClassSchedule {...props} />,
    },
    StudentResults: {
      fields: {
        title: { type: "text" },
        subtitle: { type: "textarea" },
        results: {
          type: "array",
          arrayFields: {
            metric: { type: "text" },
            value: { type: "number" },
            description: { type: "textarea" },
            icon: {
              type: "select",
              options: [
                { label: "Trophy", value: "Trophy" },
                { label: "TrendingUp", value: "TrendingUp" },
                { label: "Target", value: "Target" }
              ]
            },
            progress: { type: "number" }
          },
          getItemSummary: (item) => item.metric || "Result",
        }
      },
      defaultProps: {
        title: "Proven Outcomes",
        subtitle: "We measure our success by the success of our students.",
        results: [
          { metric: "Average Score Increase", value: 250, description: "Students see massive improvements in their standardized test scores.", icon: "TrendingUp" },
          { metric: "Placement Rate", value: 94, description: "Percentage of bootcamp graduates hired within 6 months.", icon: "Target", progress: 94 },
          { metric: "Awards Won", value: 15, description: "National and international accolades won by our students.", icon: "Trophy" }
        ]
      },
      render: ({ puck, ...props }) => <StudentResults {...props} />,
    },
    StudentTestimonials: {
      fields: {
        title: { type: "text" },
        testimonials: {
          type: "array",
          arrayFields: {
            name: { type: "text" },
            role: { type: "text" },
            quote: { type: "textarea" },
            image: { type: "custom", render: ImageUploadField },
          },
          getItemSummary: (item) => item.name || "Testimonial",
        },
      },
      defaultProps: {
        title: "Success Stories",
        testimonials: [
          {
            name: "Emily Parker",
            role: "University Student",
            quote: "The SAT prep course was a game-changer. My score increased by 200 points, getting me into my dream college!",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
          },
          {
            name: "Michael Chang",
            role: "Software Developer",
            quote: "I pivoted my career after taking the Data Science bootcamp. The instructors are incredibly supportive.",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
          },
          {
            name: "Sophia Carter",
            role: "High School Senior",
            quote: "Finally, math makes sense! Dr. Jenkins has a unique way of breaking down complex problems.",
            image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1974&auto=format&fit=crop",
          },
        ],
      },
      render: ({ puck, ...props }) => <StudentTestimonials {...props} />,
    },
    PricingPlans: {
      fields: {
        title: { type: "text" },
        subtitle: { type: "textarea" },
        plans: {
          type: "array",
          arrayFields: {
            name: { type: "text" },
            price: { type: "text" },
            period: { type: "text" },
            description: { type: "textarea" },
            features: { type: "array", arrayFields: { text: { type: "text" } } },
            isPopular: { type: "radio", options: [{label: "Yes", value: true}, {label: "No", value: false}] },
            ctaText: { type: "text" },
          },
          getItemSummary: (item) => item.name || "Plan",
        }
      },
      defaultProps: {
        title: "Simple, Transparent Pricing",
        subtitle: "Choose the plan that best fits your learning goals and schedule.",
        plans: [
          {
            name: "Basic",
            price: "$29",
            period: "/month",
            description: "Access to all foundational courses and community forums.",
            features: ["Over 100+ courses", "Community forum access", "Basic support"],
            isPopular: false,
            ctaText: "Get Started"
          },
          {
            name: "Pro",
            price: "$79",
            period: "/month",
            description: "Full access to all courses, live sessions, and 1-on-1 mentoring.",
            features: ["Everything in Basic", "Weekly live sessions", "1-on-1 mentoring", "Certificate of completion"],
            isPopular: true,
            ctaText: "Start Free Trial"
          },
          {
            name: "Enterprise",
            price: "$199",
            period: "/month",
            description: "Tailored for teams and organizations with advanced reporting.",
            features: ["Everything in Pro", "Advanced analytics", "Dedicated success manager", "Custom learning paths"],
            isPopular: false,
            ctaText: "Contact Sales"
          }
        ]
      },
      render: ({ puck, ...props }) => <PricingPlans {...props} plans={props.plans as any} />,
    },
    EducationFAQ: {
      fields: {
        title: { type: "text" },
        subtitle: { type: "textarea" },
        faqs: {
          type: "array",
          arrayFields: {
            question: { type: "text" },
            answer: { type: "textarea" },
          },
          getItemSummary: (item) => item.question || "FAQ",
        }
      },
      defaultProps: {
        title: "Frequently Asked Questions",
        subtitle: "Got questions? We've got answers.",
        faqs: [
          { question: "How long do I have access to the courses?", answer: "Once you enroll, you have lifetime access to the course content, including all future updates." },
          { question: "Is there a refund policy?", answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied, you can get a full refund." },
          { question: "Do I get a certificate upon completion?", answer: "Yes! All our premium courses include a verifiable certificate of completion." },
          { question: "Are the live sessions recorded?", answer: "Yes, all live sessions are recorded and made available to students within 24 hours." },
        ]
      },
      render: ({ puck, ...props }) => <EducationFAQ {...props} />,
    },
    EnrollmentCTA: {
      fields: {
        title: { type: "text" },
        description: { type: "textarea" },
        ctaText: { type: "text" },
        benefits: { type: "array", arrayFields: { text: { type: "text" } } }
      },
      defaultProps: {
        title: "Ready to Start Learning?",
        description: "Join thousands of students who are already advancing their careers and achieving their goals.",
        ctaText: "Create Your Free Account",
        benefits: ["No credit card required", "Instant access to free courses", "Cancel anytime"]
      },
      render: ({ puck, ...props }) => <EnrollmentCTA {...props} benefits={props.benefits as unknown as string[]} />,
    },
  },
};

export const defaultData = {
  content: [
    { type: "EducationHero", props: { id: "EducationHero-1" } },
    { type: "UniversityPartners", props: { id: "UniversityPartners-1" } },
    { type: "EducationStats", props: { id: "EducationStats-1" } },
    { type: "WhyChooseUs", props: { id: "WhyChooseUs-1" } },
    { type: "LearningProcess", props: { id: "LearningProcess-1" } },
    { type: "FeaturedCourse", props: { id: "FeaturedCourse-1" } },
    { type: "CourseList", props: { id: "CourseList-1" } },
    { type: "ClassSchedule", props: { id: "ClassSchedule-1" } },
    { type: "TutorProfiles", props: { id: "TutorProfiles-1" } },
    { type: "StudentResults", props: { id: "StudentResults-1" } },
    { type: "StudentTestimonials", props: { id: "StudentTestimonials-1" } },
    { type: "PricingPlans", props: { id: "PricingPlans-1" } },
    { type: "EducationFAQ", props: { id: "EducationFAQ-1" } },
    { type: "EnrollmentCTA", props: { id: "EnrollmentCTA-1" } },
  ],
  root: {},
};