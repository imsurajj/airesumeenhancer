"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Loader,
  Copy,
  Download,
  FileText,
  Users,
  Zap,
  ArrowRight,
  Bell,
  BarChart,
} from "lucide-react";
// import { useToast } from "@/components/ui/use-toast"
import { useToast } from "@/hooks/use-toast";
import { useCompletion } from "ai/react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
// import DashboardContent from '@/components/DashboardContent'
import DashboardContent from "@/components/DashboardPage";

import { useUser } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Removed duplicate DashboardPage function
export default function DashboardPage() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("profile");
  const { toast } = useToast();

  const { completion, input, isLoading, handleInputChange, handleSubmit } =
    useCompletion({
      api: "/api/enhance-resume",
    });

  const enhanceResume = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter your resume content before enhancing.",
        variant: "destructive",
      });
      return;
    }
    handleSubmit(e);
  };

  const downloadResume = (content: string, filename: string) => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content).then(
      () => {
        toast({
          title: "Copied",
          description: "Resume content copied to clipboard.",
        });
      },
      (err) => {
        console.error("Could not copy text: ", err);
      },
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome, {user?.firstName}!
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Recent Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Your resume was enhanced successfully!
              </DropdownMenuItem>
              <DropdownMenuItem>
                New feature: Dark mode now available.
              </DropdownMenuItem>
              <DropdownMenuItem>
                Don't forget to complete your profile
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Navigation</CardTitle>
            </CardHeader>
            <CardContent>
              <nav className="space-y-2">
                <Button
                  variant={activeTab === "profile" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("profile")}
                >
                  Profile
                </Button>
                <Button
                  variant={activeTab === "resume" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("resume")}
                >
                  Resume Enhancement
                </Button>
                <Button
                  variant={activeTab === "analytics" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("analytics")}
                >
                  Analytics
                </Button>
              </nav>
            </CardContent>
          </Card>

          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>
                {activeTab === "profile"
                  ? "User Profile"
                  : activeTab === "resume"
                    ? "Resume Enhancement"
                    : "Analytics"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {activeTab === "profile" && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={user?.profileImageUrl}
                      alt="Profile"
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <h2 className="text-2xl font-bold">{user?.fullName}</h2>
                      <p className="text-gray-600">
                        {user?.primaryEmailAddress?.emailAddress}
                      </p>
                    </div>
                  </div>
                  <Input
                    placeholder="Job Title"
                    defaultValue="Software Engineer"
                  />
                  <Textarea
                    placeholder="Bio"
                    defaultValue="Passionate about creating innovative solutions and learning new technologies."
                  />
                  <Button>Update Profile</Button>
                </div>
              )}
              {activeTab === "resume" && (
                <form onSubmit={enhanceResume} className="space-y-4">
                  <Textarea
                    placeholder="Paste your resume here..."
                    value={input}
                    onChange={handleInputChange}
                    className="h-40 bg-gray-50 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
                  />
                  <div className="flex items-center justify-between">
                    <Input
                      type="file"
                      accept=".txt,.pdf,.doc,.docx"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            const content = e.target?.result as string;
                            handleInputChange({
                              target: { value: content },
                            } as React.ChangeEvent<HTMLTextAreaElement>);
                          };
                          reader.readAsText(file);
                        }
                      }}
                      className="w-1/2"
                    />
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    >
                      {isLoading ? (
                        <>
                          <Loader className="mr-2 h-4 w-4 animate-spin" />
                          Enhancing...
                        </>
                      ) : (
                        "Enhance My Resume"
                      )}
                    </Button>
                  </div>
                  {completion && (
                    <div className="mt-4">
                      <h3 className="font-bold mb-2 text-gray-800">
                        Enhanced Resume
                      </h3>
                      <Textarea
                        value={completion}
                        readOnly
                        className="h-40 mb-2 bg-gray-50"
                      />
                      <div className="flex justify-between">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(completion)}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copy
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            downloadResume(completion, "enhanced_resume.txt")
                          }
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              )}
              {activeTab === "analytics" && (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Resume Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <BarChart className="w-full h-48" />
                      <p className="text-center mt-4">
                        Your resume performance has improved by 35% this month!
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Usage Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li>Resumes Enhanced: 5</li>
                        <li>AI Credits Used: 50/100</li>
                        <li>Last Enhancement: 2 days ago</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
