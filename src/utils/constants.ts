import {
  LifeBuoy,
  Send,
  BookOpenIcon,
  Inbox,
  UserRoundPlus,
  Cog
} from "lucide-react"

export const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Pages Content",
      url: "/content",
      icon: BookOpenIcon,
      isActive: true,
    },
    {
      title: "Configuration",
      url: "/configuration",
      icon: Cog,
    },
    {
      title: "Users",
      url: "/users",
      icon: UserRoundPlus,
    }
  ],
  navPrimary: [
    {
      title: "Messages",
      icon: Inbox,
      url: "/messages",
    },
    {
      title: "Joining Requests",
      icon: UserRoundPlus,
      url: "/join-us",
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    // {
    //   name: "Design Engineering",
    //   url: "#",
    //   icon: Frame,
    // },
    // {
    //   name: "Sales & Marketing",
    //   url: "#",
    //   icon: PieChart,
    // },
    // {
    //   name: "Travel",
    //   url: "#",
    //   icon: Map,
    // },
  ],
}
