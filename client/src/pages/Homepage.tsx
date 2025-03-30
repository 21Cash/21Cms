import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Homepage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-850 to-gray-800 text-white">
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <div className="text-3xl font-bold tracking-tight">21CMS</div>
        <nav>
          <a
            href="https://github.com/21Cash/21Cms"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-gray-500 rounded hover:bg-gray-600 transition-colors"
          >
            Star on GitHub
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center items-center px-4 space-y-10">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-6xl font-semibold mb-4">Welcome to 21CMS</h1>
          <p className="text-xl mb-4 max-w-2xl mx-auto">
            Unlock a superior user experience and deeper insights—register now
            for an enhanced UI and comprehensive analytics.
          </p>
        </div>

        {/* Forms Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* Registration Form */}
          <Card className="bg-gray-800 border border-gray-700 shadow-xl rounded-lg hover:shadow-2xl transition-shadow">
            <CardHeader className="border-b border-gray-700">
              <CardTitle className="text-center text-2xl font-bold">
                Register Now
              </CardTitle>
              <CardDescription className="text-center text-gray-300">
                Join 21CMS to unlock exclusive insights.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <form className="space-y-5">
                <div>
                  <label
                    htmlFor="rollno"
                    className="block text-sm font-medium text-gray-400"
                  >
                    Roll Number
                  </label>
                  <Input
                    id="rollno"
                    placeholder="Enter your roll number"
                    className="mt-1 block w-full p-3 border border-gray-600 rounded-md bg-gray-900 text-white focus:outline-none focus:border-gray-400 transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="preferredName"
                    className="block text-sm font-medium text-gray-400"
                  >
                    Preferred Name
                  </label>
                  <Input
                    id="preferredName"
                    placeholder="What would you like us to call you?"
                    className="mt-1 block w-full p-3 border border-gray-600 rounded-md bg-gray-900 text-white focus:outline-none focus:border-gray-400 transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-400"
                  >
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="mt-1 block w-full p-3 border border-gray-600 rounded-md bg-gray-900 text-white focus:outline-none focus:border-gray-400 transition-colors"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gray-600 hover:bg-gray-500 transition-colors py-3"
                >
                  Register
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Attendance Stats Form */}
          <Card className="bg-gray-800 border border-gray-700 shadow-xl rounded-lg hover:shadow-2xl transition-shadow">
            <CardHeader className="border-b border-gray-700">
              <CardTitle className="text-center text-2xl font-bold">
                View Attendance Stats
              </CardTitle>
              <CardDescription className="text-center text-gray-300">
                Enter your user handle to check your attendance stats.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <form className="space-y-5">
                <div>
                  <label
                    htmlFor="handle"
                    className="block text-sm font-medium text-gray-400"
                  >
                    User Handle
                  </label>
                  <Input
                    id="handle"
                    placeholder="Enter your user handle"
                    className="mt-1 block w-full p-3 border border-gray-600 rounded-md bg-gray-900 text-white focus:outline-none focus:border-gray-400 transition-colors"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gray-600 hover:bg-gray-500 transition-colors py-3"
                >
                  View Stats
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="p-3 text-center border-t border-gray-700">
        <p className="text-sm text-gray-400">21CMS By Sushil L</p>
      </footer>
    </div>
  );
}
