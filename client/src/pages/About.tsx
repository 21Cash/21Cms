import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github, Linkedin, Code2, BookOpen, Instagram } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Link } from "react-router-dom";
import { SiteFooter } from "@/components/site-footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col text-foreground bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 dark:from-black dark:via-gray-900 dark:to-black">
      <header className="p-6 flex justify-between items-center">
        <div className="text-3xl font-bold tracking-tight">
          <Link to="/">21CMS</Link>
        </div>
        <ModeToggle />
      </header>
      <div className="container mx-auto px-4 py-12 flex-1">
        <div className="flex flex-col items-center mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r text-primary bg-clip-text ">
            About 21CMS
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A weekend project with a better user experience than the official
            college CMS.
          </p>
        </div>

        <Card className="shadow-md border-border hover:shadow-lg transition-all mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">21CMS</CardTitle>
            <CardDescription>
              Just a fun weekend thing by 21Cash
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-card-foreground mb-6">
              21CMS was built because I was tired of the clunky college CMS UI.
              This is my attempt at creating a better user experience and UI.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                React
              </span>
              <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                Tailwind-CSS
              </span>
              <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                TypeScript
              </span>
              <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                Node.js
              </span>
              <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                ShadCN
              </span>
              <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                puppeteer
              </span>
              <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                drizzle-orm
              </span>
              <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                Postgresql (neon-db)
              </span>
              <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                Express
              </span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild>
              <a
                href="https://github.com/21Cash/21Cms"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="h-4 w-4" />
                Check it out on GitHub
              </a>
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-md border-border hover:shadow-lg transition-all mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">
              About 21Cash
            </CardTitle>
            <CardDescription>
              {" "}
              The person behind whatever this is.{" "}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-card-foreground mb-6">
              Hey, I'm 21Cash, 3rd year CS Student ('26 Grad). I like building
              fun things with tech. I also like doing Leetcode xd.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Button variant="outline" asChild className="gap-2">
                <a
                  href="https://github.com/21Cash"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
              <Button variant="outline" asChild className="gap-2">
                <a
                  href="https://www.linkedin.com/in/sushil-l-b8b9a4251/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </Button>
              <Button variant="outline" asChild className="gap-2">
                <a
                  href="https://leetcode.com/21Cash"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Code2 className="h-4 w-4" />
                  LeetCode
                </a>
              </Button>
              <Button variant="outline" asChild className="gap-2">
                <a
                  href="https://codeforces.com/profile/21Cash"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BookOpen className="h-4 w-4" />
                  CodeForces
                </a>
              </Button>

              <Button variant="outline" asChild className="gap-2">
                <a
                  href="https://www.instagram.com/__21cash/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-4 w-4" />
                  Instagram
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <SiteFooter />
    </div>
  );
};

export default About;
