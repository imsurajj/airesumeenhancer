"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="container mx-auto p-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <h1 className="text-4xl font-bold text-center my-8">
          About AI Resume Enhancer
        </h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              At AI Resume Enhancer, we're on a mission to revolutionize the job
              application process. We believe that everyone deserves a chance to
              showcase their best self to potential employers, and we're here to
              make that happen with the power of AI.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Our advanced AI analyzes your resume, identifying areas for
              improvement and suggesting enhancements. It considers industry
              standards, job market trends, and recruiter preferences to
              optimize your resume for maximum impact.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Our Team</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We're a diverse team of AI experts, career coaches, and software
              engineers passionate about bridging the gap between job seekers
              and their dream careers. With years of experience in recruitment
              and AI technology, we're uniquely positioned to help you succeed.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Privacy and Security</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We understand the sensitive nature of the information you share
              with us. That's why we've implemented state-of-the-art security
              measures to ensure your data is always protected. We never share
              your information without your explicit consent.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
