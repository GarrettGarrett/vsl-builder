"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateVslScript } from "@/app/actions/generateVslScript";
import { readStreamableValue } from "ai/rsc";
import { INPUT_CHAR_LIMITS } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Copy, Check, MessageSquare, ExternalLink } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { sendFeedback } from "@/app/actions/sendFeedback";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const sections = {
  hook: {
    nickname: "Hook",
    questions: [
      {
        question:
          "What's the main problem or frustration your target audience faces?",
        placeholder:
          "Feeling stuck, overwhelmed, and behind when trying to make money online or start a first business",
      },
      {
        question:
          "What's the primary goal or outcome your audience wants to achieve?",
        placeholder:
          "To do something they love, make money, and feel successful in their online business ventures",
      },
    ],
  },
  credibility: {
    nickname: "Credibility",
    questions: [
      {
        question:
          "What are your main qualifications or experiences that make you an expert?",
        placeholder:
          "Scaled a local gym chain and sold Gym Launch for $46.2 million",
      },
      {
        question: "What notable results or achievements have you accomplished?",
        placeholder:
          "Built the largest community-owned school and helped numerous people succeed in online businesses",
      },
    ],
  },
  solution: {
    nickname: "Solution",
    questions: [
      {
        question:
          "What is the main solution or opportunity you're offering to the audience?",
        placeholder:
          "School games: A fun, easy way to build your online community business",
      },
      {
        question: "What unique advantage or method does your solution provide?",
        placeholder:
          "No experience or followers needed, just choose a topic you're passionate about or have overcome",
      },
    ],
  },
  explanation: {
    nickname: "Explanation",
    questions: [
      {
        question: "What are the key features or steps of your product/service?",
        placeholder:
          "Choose a topic, invite people to a community, build and monetize with our guidance",
      },
      {
        question:
          "What makes your product/service easy or accessible for beginners?",
        placeholder:
          "Simple process, no prior experience needed, guidance on building and monetizing",
      },
    ],
  },
  socialProof: {
    nickname: "Social Proof",
    questions: [
      {
        question:
          "What are some impressive success stories from your customers or students?",
        placeholder:
          "Hakim makes $16,000/month, Levi earns $30,000/month, Kai earns $57,000/month, Nate did $91,000 in first month",
      },
      {
        question:
          "What is the key message you want to convey through these success stories?",
        placeholder:
          "People from various backgrounds can succeed and earn significant income with our system",
      },
    ],
  },
  objections: {
    nickname: "Objections",
    questions: [
      {
        question:
          "What is the most impressive statistic about your product/service's success rate?",
        placeholder:
          "54.1% of people who start a paid community in school make money",
      },
      {
        question:
          "How does this statistic address common objections or build confidence?",
        placeholder:
          "It shows that more than one out of two people succeed, making it a realistic opportunity for anyone",
      },
    ],
  },
  analogy: {
    nickname: "Analogy",
    questions: [
      {
        question:
          "What analogy or metaphor can you use to explain your product/service in simple terms?",
        placeholder: "A paid community is like an online party",
      },
      {
        question:
          "How does this analogy help explain the key aspects of your product/service?",
        placeholder:
          "You're the host, inviting guests and setting rules, while others make it fun, and you collect the entry fee",
      },
    ],
  },
  urgency: {
    nickname: "Urgency",
    questions: [
      {
        question:
          "What current trend or market condition makes your offer timely and urgent?",
        placeholder:
          "People are paying hundreds or thousands to join digital communities, similar to nightclubs or cafes",
      },
      {
        question:
          "What potential consequence of not taking action now can you highlight?",
        placeholder:
          "Missing out on a profitable business opportunity that others are selling courses on for thousands of dollars",
      },
    ],
  },
  uniqueSelling: {
    nickname: "Unique Selling",
    questions: [
      {
        question: "What is your main unique selling proposition (USP)?",
        placeholder:
          "Learn how to start, scale, and monetize an online group the right way, on your first try, for free",
      },
      {
        question: "How does your USP differentiate you from competitors?",
        placeholder:
          "Offers a faster, easier, zero-risk way to learn compared to expensive courses and coaching programs",
      },
    ],
  },
  obstacles: {
    nickname: "Obstacles",
    questions: [
      {
        question:
          "What are the main obstacles that prevent people from succeeding in online businesses?",
        placeholder:
          "Lack of audience, expertise, and knowledge on how to start and monetize",
      },
      {
        question:
          "How does your product/service help overcome these obstacles?",
        placeholder:
          "School games is designed to smash through every obstacle, allowing success without an audience or expertise",
      },
    ],
  },
  process: {
    nickname: "Process",
    questions: [
      {
        question: "What are the key steps or milestones in your program?",
        placeholder:
          "Sign up, follow the process, build a paid community, compete on the leaderboard",
      },
      {
        question:
          "What ongoing benefits or opportunities does your program offer?",
        placeholder:
          "Chance to join successful community owners in Vegas, ongoing competition, access to alumni network",
      },
    ],
  },
  guarantee: {
    nickname: "Guarantee",
    questions: [
      {
        question:
          "What guarantee or risk reversal do you offer to potential customers?",
        placeholder:
          "Unconditional money-back guarantee if you forget to cancel after the free trial",
      },
      {
        question:
          "How does this guarantee address potential concerns or hesitations?",
        placeholder:
          "It removes financial risk and shows confidence in the program's value",
      },
    ],
  },
  callToAction: {
    nickname: "Call to Action",
    questions: [
      {
        question:
          "What specific action do you want the viewer to take after watching the VSL?",
        placeholder: "Click the button below to join the school games now",
      },
      {
        question:
          "What unique or time-sensitive offer can you provide to encourage immediate action?",
        placeholder:
          "Personal live onboarding with the presenter for those who join this month",
      },
    ],
  },
};

type Answers = {
  [section: string]: {
    [question: string]: string;
  };
};

type GeneratedContent = {
  [section: string]: string;
};

// Move FeedbackDialog outside of the main component
function FeedbackDialog({
  open,
  onOpenChange,
  feedback,
  onFeedbackChange,
  onSubmit,
  status,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feedback: string;
  onFeedbackChange: (value: string) => void;
  onSubmit: () => void;
  status: "idle" | "sending" | "success" | "error";
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leave Feedback</DialogTitle>
          <DialogDescription>
            We'd love to hear what went well or how we can improve the product
            experience.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          placeholder="Enter your feedback here..."
          value={feedback}
          onChange={(e) => onFeedbackChange(e.target.value)}
          className="min-h-[100px]"
        />
        {feedback.length > 0 && feedback.length < 5 && (
          <p className="text-red-500 text-sm mt-1">
            Feedback must be at least 5 characters long.
          </p>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            disabled={status === "sending" || feedback.length < 5}
          >
            {status === "sending" ? "Sending..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function VslGenerator() {
  const [currentSection, setCurrentSection] = useState("hook");
  const [generatedContent, setGeneratedContent] = useState("");
  const [allGeneratedContent, setAllGeneratedContent] =
    useState<GeneratedContent>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [answers, setAnswers] = useState<Answers>({});
  const [businessDescription, setBusinessDescription] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [inputErrors, setInputErrors] = useState<Record<string, string>>({});
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [showCombinedVSL, setShowCombinedVSL] = useState(false);
  const combinedVSLRef = useRef<HTMLDivElement>(null);
  const [showClearConfirmation, setShowClearConfirmation] = useState(false);
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackStatus, setFeedbackStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const { toast } = useToast();

  useEffect(() => {
    const storedAnswers = localStorage.getItem("vslAnswers");
    const storedGeneratedContent = localStorage.getItem("vslGeneratedContent");
    const storedBusinessDescription = localStorage.getItem(
      "vslBusinessDescription"
    );
    const storedBusinessName = localStorage.getItem("vslBusinessName");
    if (storedAnswers) {
      setAnswers(JSON.parse(storedAnswers));
    }
    if (storedGeneratedContent) {
      const parsedContent = JSON.parse(storedGeneratedContent);
      setAllGeneratedContent(parsedContent);
      setGeneratedContent(parsedContent[currentSection] || "");
    }
    if (storedBusinessDescription) {
      setBusinessDescription(storedBusinessDescription);
    }
    if (storedBusinessName) {
      setBusinessName(storedBusinessName);
    }
  }, [currentSection]);

  const handleInputChange = (
    section: string,
    question: string,
    value: string
  ) => {
    const limit = INPUT_CHAR_LIMITS.defaultInputLimit;
    if (value.length <= limit) {
      setAnswers((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [question]: value,
        },
      }));
      setInputErrors((prev) => ({ ...prev, [question]: "" }));
      localStorage.setItem(
        "vslAnswers",
        JSON.stringify({
          ...answers,
          [section]: {
            ...answers[section],
            [question]: value,
          },
        })
      );
    } else {
      setInputErrors((prev) => ({
        ...prev,
        [question]: `Input must be ${limit} characters or less.`,
      }));
    }
  };

  const handleBusinessDescriptionChange = (value: string) => {
    const limit = INPUT_CHAR_LIMITS.businessDescription;
    if (value.length <= limit) {
      setBusinessDescription(value);
      setInputErrors((prev) => ({ ...prev, businessDescription: "" }));
      localStorage.setItem("vslBusinessDescription", value);
    } else {
      setInputErrors((prev) => ({
        ...prev,
        businessDescription: `Description must be ${limit} characters or less.`,
      }));
    }
  };

  const handleBusinessNameChange = (value: string) => {
    const limit = INPUT_CHAR_LIMITS.businessName || 100;
    if (value.length <= limit) {
      setBusinessName(value);
      setInputErrors((prev) => ({ ...prev, businessName: "" }));
      localStorage.setItem("vslBusinessName", value);
    } else {
      setInputErrors((prev) => ({
        ...prev,
        businessName: `Business name must be ${limit} characters or less.`,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate business name and description
    if (!businessName.trim()) {
      setInputErrors((prev) => ({
        ...prev,
        businessName: "Business name is required.",
      }));
      return;
    }
    if (!businessDescription.trim()) {
      setInputErrors((prev) => ({
        ...prev,
        businessDescription: "Business description is required.",
      }));
      return;
    }

    // Validate at least one question is answered
    const currentSectionAnswers = answers[currentSection] || {};
    const answeredQuestions = Object.values(currentSectionAnswers).filter(
      (answer) => answer.trim() !== ""
    );
    if (answeredQuestions.length === 0) {
      setInputErrors((prev) => ({
        ...prev,
        [currentSection]: "Please answer at least one question.",
      }));
      return;
    }

    // Clear any existing errors
    setInputErrors({});

    setIsGenerating(true);

    const data = {
      ...answers[currentSection],
      businessDescription,
      businessName,
    };

    const stream = await generateVslScript(data, currentSection);

    let content = "";
    for await (const chunk of readStreamableValue(stream)) {
      content += chunk;
      setGeneratedContent(content);
    }

    const newAllGeneratedContent = {
      ...allGeneratedContent,
      [currentSection]: content,
    };
    setAllGeneratedContent(newAllGeneratedContent);
    localStorage.setItem(
      "vslGeneratedContent",
      JSON.stringify(newAllGeneratedContent)
    );

    setIsGenerating(false);
  };

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
    setGeneratedContent(allGeneratedContent[section] || "");
  };

  const copyToClipboard = async (text: string, section: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(section);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const combinedVSL = useMemo(() => {
    const orderedSections = [
      "hook",
      "credibility",
      "solution",
      "explanation",
      "socialProof",
      "objections",
      "analogy",
      "urgency",
      "uniqueSelling",
      "obstacles",
      "process",
      "guarantee",
      "callToAction",
    ];

    return orderedSections
      .map((section) => allGeneratedContent[section])
      .filter(Boolean)
      .join("\n\n");
  }, [allGeneratedContent]);

  const toggleCombinedVSL = () => {
    setShowCombinedVSL((prev) => !prev);
    if (!showCombinedVSL) {
      setTimeout(() => {
        combinedVSLRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const clearAllInputs = () => {
    setAnswers({});
    setAllGeneratedContent({});
    setGeneratedContent("");
    setBusinessDescription("");
    setBusinessName("");
    setInputErrors({});
    localStorage.removeItem("vslAnswers");
    localStorage.removeItem("vslGeneratedContent");
    localStorage.removeItem("vslBusinessDescription");
    localStorage.removeItem("vslBusinessName");
  };

  const hasUserInput = useMemo(() => {
    return (
      Object.keys(answers).length > 0 ||
      Object.keys(allGeneratedContent).length > 0 ||
      businessDescription.trim() !== "" ||
      businessName.trim() !== ""
    );
  }, [answers, allGeneratedContent, businessDescription, businessName]);

  const hasGeneratedContent = useMemo(() => {
    return Object.keys(allGeneratedContent).length > 0;
  }, [allGeneratedContent]);

  const handleFeedbackChange = useCallback((value: string) => {
    setFeedback(value);
  }, []);

  const handleFeedbackSubmit = useCallback(async () => {
    if (feedback.length < 5) {
      toast({
        title: "Error",
        description: "Feedback must be at least 5 characters long.",
        variant: "destructive",
      });
      return;
    }

    setFeedbackStatus("sending");
    try {
      const result = await sendFeedback(feedback);
      if (result.success) {
        setFeedbackStatus("success");
        toast({
          title: "Thank you!",
          description: "Your feedback has been submitted successfully.",
        });
        setFeedback("");
        setFeedbackDialogOpen(false);
      } else {
        throw new Error(result.error || "Failed to send feedback");
      }
    } catch (error) {
      console.error("Error sending feedback:", error);
      setFeedbackStatus("error");
      toast({
        title: "Error",
        description: "Failed to send feedback. Please try again later.",
        variant: "destructive",
      });
    }
  }, [feedback, toast]);

  const memoizedFeedbackDialog = useMemo(
    () => (
      <FeedbackDialog
        open={feedbackDialogOpen}
        onOpenChange={setFeedbackDialogOpen}
        feedback={feedback}
        onFeedbackChange={handleFeedbackChange}
        onSubmit={handleFeedbackSubmit}
        status={feedbackStatus}
      />
    ),
    [
      feedbackDialogOpen,
      feedback,
      handleFeedbackChange,
      handleFeedbackSubmit,
      feedbackStatus,
    ]
  );

  return (
    <div className="container mx-auto px-4 py-8 bg-custom-background min-h-screen relative">
      <Button
        onClick={() => window.open("https://www.skool.com/games/about?ref=9dcf2482660141d58dbd9b11226dfa68", "_blank")}
        variant="outline"
        className="absolute top-4 left-4 z-10"
      >
        <ExternalLink className="mr-2 h-4 w-4" />
        View Example
      </Button>

      <Button
        onClick={() => setFeedbackDialogOpen(true)}
        variant="outline"
        className="absolute top-4 right-4 z-10"
      >
        <MessageSquare className="mr-2 h-4 w-4" />
        Feedback
      </Button>

      <h1 className="text-3xl font-bold text-center mb-8 text-custom-text">
        🎥 Video Sales Letter Builder
      </h1>
      <Card className="bg-custom-card mb-8">
        <CardHeader>
          <CardTitle className="text-custom-primary">
            Business Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="businessName" className="text-custom-text">
              Business Name:
            </Label>
            <Input
              id="businessName"
              className={cn("border-custom-secondary", {
                "placeholder:text-gray-400 placeholder:opacity-50": true,
              })}
              placeholder="School Games"
              value={businessName}
              onChange={(e) => handleBusinessNameChange(e.target.value)}
              maxLength={INPUT_CHAR_LIMITS.businessName || 100}
            />
            <p className="text-sm text-gray-500 mt-1">
              {businessName.length}/{INPUT_CHAR_LIMITS.businessName || 100}{" "}
              characters
            </p>
            {inputErrors.businessName && (
              <p className="text-red-500 text-sm mt-1">
                {inputErrors.businessName}
              </p>
            )}
          </div>
          <Label htmlFor="businessDescription" className="text-custom-text">
            Briefly describe your business:
          </Label>
          <Textarea
            id="businessDescription"
            className={cn("border-custom-secondary", {
              "placeholder:text-gray-400 placeholder:opacity-50": true,
            })}
            placeholder="School Games is a platform that helps people start, scale, and monetize their own online community businesses. It provides a simple, step-by-step process for creating paid communities around topics you're passionate about or experiences you've overcome, with no prior experience or large following required."
            value={businessDescription}
            onChange={(e) => handleBusinessDescriptionChange(e.target.value)}
            maxLength={INPUT_CHAR_LIMITS.businessDescription}
          />
          <p className="text-sm text-gray-500 mt-1">
            {businessDescription.length}/{INPUT_CHAR_LIMITS.businessDescription}{" "}
            characters
          </p>
          {inputErrors.businessDescription && (
            <p className="text-red-500 text-sm mt-1">
              {inputErrors.businessDescription}
            </p>
          )}
        </CardContent>
      </Card>
      <Card className="bg-custom-card">
        <CardHeader>
          <CardTitle className="text-custom-primary">
            {sections[currentSection as keyof typeof sections].nickname}{" "}
            Generation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-6">
            {Object.entries(sections).map(([key, { nickname }]) => (
              <Button
                key={key}
                onClick={() => handleSectionChange(key)}
                variant={currentSection === key ? "default" : "outline"}
                className="w-full text-sm relative"
              >
                {nickname}
                {allGeneratedContent[key] && (
                  <span className="absolute top-0.5 right-0.5 m-0.5">
                    <svg
                      viewBox="0 0 40 40"
                      fill="#009e5d"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M20 0C9 0 0 9 0 20C0 31 9 40 20 40C31 40 40 31 40 20C40 9 31 0 20 0V0ZM16 30L6 20L8.8 17.2L16 24.4L31.2 9.20001L34 12L16 30V30Z"
                      />
                    </svg>
                  </span>
                )}
              </Button>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {sections[currentSection as keyof typeof sections].questions.map(
              (item, index) => (
                <div key={index} className="mb-4">
                  <Label
                    htmlFor={`question${index}`}
                    className="text-custom-text"
                  >
                    {item.question}
                  </Label>
                  <Textarea
                    name={`question${index}`}
                    id={`question${index}`}
                    className={cn("border-custom-secondary", {
                      "placeholder:text-gray-400 placeholder:opacity-50": true,
                    })}
                    placeholder={item.placeholder}
                    value={answers[currentSection]?.[`question${index}`] || ""}
                    onChange={(e) =>
                      handleInputChange(
                        currentSection,
                        `question${index}`,
                        e.target.value
                      )
                    }
                    maxLength={INPUT_CHAR_LIMITS.defaultInputLimit}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {
                      (answers[currentSection]?.[`question${index}`] || "")
                        .length
                    }
                    /{INPUT_CHAR_LIMITS.defaultInputLimit} characters
                  </p>
                  {inputErrors[`question${index}`] && (
                    <p className="text-red-500 text-sm mt-1">
                      {inputErrors[`question${index}`]}
                    </p>
                  )}
                </div>
              )
            )}
            {inputErrors[currentSection] && (
              <p className="text-red-500 text-sm mt-1">
                {inputErrors[currentSection]}
              </p>
            )}
            <Button type="submit" variant="default" disabled={isGenerating}>
              {isGenerating
                ? "Generating..."
                : `Generate ${
                    sections[currentSection as keyof typeof sections].nickname
                  }`}
            </Button>
          </form>
        </CardContent>
      </Card>
      {generatedContent && (
        <Card className="mt-8 bg-custom-card">
          <CardHeader>
            <CardTitle className="text-custom-primary flex justify-between items-center">
              <span>
                Generated{" "}
                {sections[currentSection as keyof typeof sections].nickname}
              </span>
              <button
                onClick={() =>
                  copyToClipboard(generatedContent, currentSection)
                }
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                title="Copy to clipboard"
              >
                {copiedSection === currentSection ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap text-custom-text">
              {generatedContent}
            </p>
          </CardContent>
        </Card>
      )}
      <div className="mt-8 text-center space-x-4">
        {hasGeneratedContent && (
          <Button onClick={toggleCombinedVSL} variant="outline">
            {showCombinedVSL ? "Hide" : "Show"} Combined VSL
          </Button>
        )}

        {hasUserInput && (
          <AlertDialog
            open={showClearConfirmation}
            onOpenChange={setShowClearConfirmation}
          >
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Clear All Inputs</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will clear all your inputs and generated content.
                  This cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={clearAllInputs}>
                  Yes, clear all
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
      {showCombinedVSL && (
        <Card className="mt-8 bg-custom-card" ref={combinedVSLRef}>
          <CardHeader>
            <CardTitle className="text-custom-primary flex justify-between items-center">
              <span>Combined VSL</span>
              <button
                onClick={() => copyToClipboard(combinedVSL, "combined")}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                title="Copy to clipboard"
              >
                {copiedSection === "combined" ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap text-custom-text">
              {combinedVSL}
            </p>
          </CardContent>
        </Card>
      )}

      {memoizedFeedbackDialog}
    </div>
  );
}
