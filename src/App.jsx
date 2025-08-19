import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";
import {
  MessageSquare,
  Phone,
  Upload,
  Mic,
  FileText,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Zap,
  Star,
  Play,
  Pause,
  X,
  CloudUpload,
  ChevronDown,
  Volume2,
  RotateCcw,
} from "lucide-react";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiBootstrap,
  SiTailwindcss,
  SiSass,
  SiTypescript,
  SiReact,
  SiNextdotjs,
} from "react-icons/si";
import { HiOutlineDocumentText } from "react-icons/hi";

const categoryOptions = [
  {
    value: "general",
    label: "General",
    icon: HiOutlineDocumentText,
    color: "#6B7280",
  },
  {
    value: "html",
    label: "HTML",
    icon: SiHtml5,
    color: "#E34F26",
  },
  {
    value: "css",
    label: "CSS",
    icon: SiCss3,
    color: "#1572B6",
  },
  {
    value: "javascript",
    label: "Javascript",
    icon: SiJavascript,
    color: "#F7DF1E",
  },
  {
    value: "bootstrap",
    label: "Bootstrap",
    icon: SiBootstrap,
    color: "#7952B3",
  },
  {
    value: "tailwindcss",
    label: "TailwindCSS",
    icon: SiTailwindcss,
    color: "#06B6D4",
  },
  {
    value: "sass",
    label: "Sass",
    icon: SiSass,
    color: "#CC6699",
  },
  {
    value: "typescript",
    label: "Typescript",
    icon: SiTypescript,
    color: "#3178C6",
  },
  {
    value: "react",
    label: "React",
    icon: SiReact,
    color: "#61DAFB",
  },
  {
    value: "nextjs",
    label: "Next.js",
    icon: SiNextdotjs,
    color: "#000000",
  },
];

// Custom Dropdown Multi-Select Component
const DropdownMultiSelect = ({
  categories,
  onChange,
  placeholder = "اختر فئة أو أكثر...",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleCategory = (category) => {
    const isSelected = categories.some((cat) => cat.value === category.value);

    if (isSelected) {
      // Remove category
      onChange(categories.filter((cat) => cat.value !== category.value));
    } else {
      // Add category
      onChange([...categories, category]);
    }
  };

  const removeCategory = (categoryToRemove) => {
    onChange(categories.filter((cat) => cat.value !== categoryToRemove.value));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`
          min-h-[48px] w-full px-4 py-2 border-2 rounded-lg cursor-pointer transition-all duration-200
          ${
            isOpen
              ? "border-blue-500 ring-4 ring-blue-100"
              : "border-gray-300 hover:border-gray-400"
          }
          bg-white focus:outline-none
        `}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {categories.length === 0 ? (
              <span className="text-gray-500 text-lg">{placeholder}</span>
            ) : (
              <div className="flex flex-wrap gap-1">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <div
                      key={category.value}
                      className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm font-medium"
                    >
                      <IconComponent
                        size={14}
                        color={category.color}
                        className="ml-1"
                      />
                      {category.label}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeCategory(category);
                        }}
                        className="mr-1 text-blue-600 hover:text-blue-800 focus:outline-none"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <ChevronDown
            size={20}
            className={`text-gray-500 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          <div className="p-4">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {categoryOptions.map((category) => {
                const isSelected = categories.some(
                  (cat) => cat.value === category.value
                );
                const IconComponent = category.icon;

                return (
                  <button
                    key={category.value}
                    type="button"
                    onClick={() => toggleCategory(category)}
                    className={`
                      relative p-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50
                      ${
                        isSelected
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                      }
                    `}
                    style={{
                      focusRingColor: category.color + "40",
                    }}
                  >
                    {/* Selection indicator */}
                    {isSelected && (
                      <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                        <CheckCircle size={12} />
                      </div>
                    )}

                    {/* Technology Icon */}
                    <div className="flex flex-col items-center space-y-2">
                      <IconComponent
                        size={24}
                        color={category.color}
                        className={`transition-transform duration-200 ${
                          isSelected ? "scale-110" : ""
                        }`}
                      />
                      <span
                        className={`text-xs font-medium transition-colors ${
                          isSelected ? "text-blue-700" : "text-gray-700"
                        }`}
                      >
                        {category.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Close Button */}
            <div className="mt-4 pt-3 border-t border-gray-200">
              <Button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                تم الاختيار ({categories.length})
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function App() {
  const [formData, setFormData] = useState({
    mobileNumber: "",
    categories: [],
    questionMethod: "text", // 'text' or 'voice' - default to text
    questionText: "",
    files: [],
  });

  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [estimatedTimeLeft, setEstimatedTimeLeft] = useState(0);
  const [showOauthAlert, setShowOauthAlert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Error states for inline error handling
  const [mobileError, setMobileError] = useState("");
  const [categoriesError, setCategoriesError] = useState("");
  const [questionError, setQuestionError] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const recordingIntervalRef = useRef(null);
  const audioRef = useRef(null);
  const progressStartTime = useRef(null);

  const handleCategoriesChange = (selectedOptions) => {
    setFormData((prev) => ({
      ...prev,
      categories: selectedOptions || [],
    }));
    setCategoriesError(""); // Clear error when user selects categories
  };

  const handleQuestionMethodChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      questionMethod: value,
      questionText: value === "voice" ? "" : prev.questionText, // Clear text only when switching to voice
      // Keep files when switching methods - files can be used with both text and voice
    }));

    // Clear audio when switching away from voice
    if (value !== "voice") {
      setAudioBlob(null);
      setAudioUrl(null);
      setIsPlaying(false);
      setRecordingDuration(0);
    }
  };

  const startRecording = async () => {
    try {
      setQuestionError(""); // Clear error when starting recording
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setAudioBlob(event.data);
          const url = URL.createObjectURL(event.data);
          setAudioUrl(url);
        }
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setRecordingDuration(0);

      // Start duration counter
      recordingIntervalRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setQuestionError("لا يمكن الوصول للميكروفون");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);

      // Stop duration counter
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
        recordingIntervalRef.current = null;
      }
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resetRecording = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioBlob(null);
    setAudioUrl(null);
    setIsPlaying(false);
    setRecordingDuration(0);
    if (audioRef.current) {
      audioRef.current.src = "";
    }
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Simulate realistic upload progress
  const simulateRealisticProgress = (totalSize) => {
    const startTime = Date.now();
    progressStartTime.current = startTime;
    let progress = 0;

    // Calculate realistic upload speed (slower for larger files)
    const baseSpeed = 800 * 1024; // 800KB per second (realistic for many connections)
    const adjustedSpeed =
      baseSpeed * Math.max(0.2, Math.min(1, (5 * 1024 * 1024) / totalSize)); // Slower for larger files

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const expectedBytes = (elapsed / 1000) * adjustedSpeed;
      const expectedProgress = Math.min((expectedBytes / totalSize) * 100, 95); // Cap at 95%

      if (expectedProgress > progress) {
        progress = expectedProgress;
        setUploadProgress(Math.round(progress));

        // Calculate estimated time remaining
        if (progress > 5) {
          // Only show estimate after 5%
          const avgSpeed = expectedBytes / (elapsed / 1000);
          const remainingBytes = totalSize - expectedBytes;
          const timeLeft = Math.round(remainingBytes / avgSpeed);
          setEstimatedTimeLeft(timeLeft);
        }
      }

      if (progress < 95) {
        setTimeout(updateProgress, 300); // Update every 300ms for smoother progress
      }
    };

    updateProgress();
  };

  const formatTimeLeft = (seconds) => {
    if (seconds < 60) return `${seconds}ث`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}د ${secs}ث`;
  };

  const deleteRecording = () => {
    if (audioElement) {
      audioElement.pause();
      setIsPlaying(false);
    }
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioBlob(null);
    setAudioUrl(null);
    setAudioElement(null);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    
    // Define allowed compressed file extensions
    const allowedExtensions = [
      '.zip', '.rar', '.7z', '.tar', '.tar.gz', '.tar.bz2', '.tar.xz', 
      '.gz', '.bz2', '.xz', '.lzma', '.z', '.cab', '.dmg', '.iso', 
      '.wim', '.swm', '.esd', '.001', '.002', '.003', '.004', '.005',
      '.006', '.007', '.008', '.009'
    ];
    
    // Filter files to only include compressed formats
    const validFiles = files.filter(file => {
      const fileName = file.name.toLowerCase();
      return allowedExtensions.some(ext => fileName.endsWith(ext));
    });
    
    // Check if any files were rejected
    if (validFiles.length !== files.length) {
      const rejectedCount = files.length - validFiles.length;
      setUploadError(`تم رفض ${rejectedCount} ملف. يُسمح فقط بالملفات المضغوطة (.zip, .rar, .7z, إلخ)`);
    } else {
      setUploadError(""); // Clear error if all files are valid
    }
    
    setFormData((prev) => ({
      ...prev,
      files: validFiles,
    }));
  };

  const handleOAuthAuthorization = () => {
    window.open("/api/oauth/authorize", "_blank", "width=500,height=600");

    const checkAuthStatus = setInterval(() => {
      fetch("/api/oauth/status")
        .then((response) => response.json())
        .then((data) => {
          if (data.authenticated) {
            setShowOauthAlert(false);
            clearInterval(checkAuthStatus);
          }
        })
        .catch(console.error);
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setMobileError("");
    setCategoriesError("");
    setQuestionError("");
    setSubmitError("");

    // Validate mobile number and categories
    if (!formData.mobileNumber || formData.categories.length === 0) {
      if (!formData.mobileNumber) {
        setMobileError("يرجى ملء رقم الموبايل");
      }
      if (formData.categories.length === 0) {
        setCategoriesError("يرجى اختيار فئة واحدة على الأقل");
      }
      return;
    }

    // Validate question content based on method
    if (formData.questionMethod === "text" && !formData.questionText.trim()) {
      setQuestionError("يرجى كتابة السؤال");
      return;
    }

    if (formData.questionMethod === "voice" && !audioBlob) {
      setQuestionError("يرجى تسجيل الرسالة الصوتية");
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);

    // Calculate total upload size
    let totalSize = 0;
    if (audioBlob) {
      totalSize += audioBlob.size;
    }
    if (formData.files.length > 0) {
      totalSize += formData.files.reduce((sum, file) => sum + file.size, 0);
    }

    console.log(
      "Total upload size:",
      (totalSize / 1024 / 1024).toFixed(2),
      "MB"
    );

    // Start realistic progress simulation
    simulateRealisticProgress(totalSize);

    try {
      const submitFormData = new FormData();
      submitFormData.append("phoneNumber", formData.mobileNumber);
      submitFormData.append(
        "category",
        formData.categories.map((cat) => cat.label).join(", ")
      );

      if (formData.questionMethod === "text") {
        submitFormData.append("questionText", formData.questionText);
      } else {
        submitFormData.append(
          "voiceRecording",
          audioBlob,
          "question_audio.webm"
        );
      }

      // Upload source code files (if any)
      if (formData.files.length > 0) {
        // For now, just upload the first file as sourceCode
        // You might want to zip multiple files or handle them differently
        submitFormData.append("sourceCode", formData.files[0]);
      }

      // Use fetch instead of XMLHttpRequest for better compatibility
      const response = await fetch("/api/submit-question", {
        method: "POST",
        body: submitFormData,
      });

      const result = await response.json();

      if (response.ok) {
        setUploadProgress(100); // Set to 100% when actually completed
        setEstimatedTimeLeft(0); // Clear time estimate
        setTimeout(() => {
          setSubmitted(true);
          setFormData({
            mobileNumber: "",
            categories: [],
            questionMethod: "text", // Reset to default text method
            questionText: "",
            files: [],
          });
          setAudioBlob(null);
          setAudioUrl(null);
          setUploadProgress(0);
          setEstimatedTimeLeft(0);
        }, 800); // Longer delay to show completion
      } else {
        if (result.error === "OAuth authorization required") {
          setShowOauthAlert(true);
        } else {
          setSubmitError(result.error || "حدث خطأ أثناء الإرسال");
        }
      }
    } catch (error) {
      console.error("Submit error:", error);
      setSubmitError("حدث خطأ في الاتصال");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setUploadProgress(0);
        setEstimatedTimeLeft(0);
      }, 2000); // Reset progress after longer delay
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen p-4 rtl flex items-center justify-center">
        <Card className="glass-card animate-slide-in-up shadow-2xl max-w-md w-full">
          <CardContent className="text-center p-8">
            <div className="flex justify-center mb-6">
              <CheckCircle className="h-20 w-20 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-green-600 mb-4">
              تم الإرسال بنجاح!
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              تم استلام سؤالك وسيتم الرد عليك قريباً
            </p>
            <Button
              onClick={() => setSubmitted(false)}
              className="mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8"
            >
              إرسال سؤال آخر
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 rtl">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-in-up">
          <div className="flex items-center justify-center mb-4">
            <Zap className="w-10 h-10 text-yellow-400 ml-3" />
            <h1 className="text-4xl font-bold text-white">منصة الأسئلة</h1>
            <Star className="w-10 h-10 text-yellow-400 mr-3" />
          </div>
          <p className="text-xl text-white/90 font-medium">
            اطرح سؤالك و شاركنا رأيك
          </p>
        </div>

        {/* OAuth Alert */}
        {showOauthAlert && (
          <Alert className="mb-6 glass-card border-amber-200 animate-slide-in-up">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="text-amber-800 font-semibold">
              تفويض مطلوب
            </AlertTitle>
            <AlertDescription className="text-amber-700 mb-4">
              يجب تفويض الوصول إلى Google Drive لحفظ الملفات والتسجيلات الصوتية.
            </AlertDescription>
            <Button
              onClick={handleOAuthAuthorization}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              <ExternalLink className="w-4 h-4 ml-2" />
              تفويض الوصول الآن
            </Button>
          </Alert>
        )}

        {/* Main Form */}
        <Card className="glass-card animate-slide-in-up shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-purple-600 ml-3" />
              نموذج الأسئلة
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Mobile Number */}
              <div className="space-y-3">
                <Label
                  htmlFor="mobile"
                  className="text-lg font-semibold flex items-center"
                >
                  <Phone className="w-5 h-5 ml-2 text-blue-600" />
                  رقم الموبايل
                </Label>
                <Input
                  id="mobile"
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      mobileNumber: e.target.value,
                    }));
                    setMobileError(""); // Clear error when user types
                  }}
                  placeholder="01xxxxxxxxx"
                  className={`text-lg p-4 border-2 focus:ring-4 focus:ring-blue-200 bg-white ${
                    mobileError ? "border-red-500" : ""
                  }`}
                  required
                />
                {mobileError && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 ml-1" />
                    {mobileError}
                  </p>
                )}
              </div>

              {/* Categories */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold">
                  سؤالك بخصوص ايه ؟
                </Label>
                <DropdownMultiSelect
                  categories={formData.categories}
                  onChange={handleCategoriesChange}
                  placeholder="اختر فئة أو أكثر..."
                />
                {categoriesError && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 ml-1" />
                    {categoriesError}
                  </p>
                )}
              </div>

              {/* Question Method Selection */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold">
                  طريقة طرح السؤال
                </Label>
                <div className="flex gap-3">
                  {/* Text Method Option */}
                  <button
                    type="button"
                    onClick={() => handleQuestionMethodChange("text")}
                    className={`
                      relative flex-1 p-3 rounded-lg border-2 transition-all duration-300 transform hover:scale-102 focus:outline-none group
                      ${
                        formData.questionMethod === "text"
                          ? "border-green-400 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg scale-102"
                          : "border-gray-200 bg-white hover:border-green-300 hover:shadow-md text-gray-700"
                      }
                    `}
                  >
                    {/* Selection indicator */}
                    {formData.questionMethod === "text" && (
                      <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                        <CheckCircle size={12} />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex items-center justify-center space-x-2 space-x-reverse">
                      <FileText
                        className={`w-5 h-5 transition-colors ${
                          formData.questionMethod === "text"
                            ? "text-green-600"
                            : "text-gray-500 group-hover:text-green-500"
                        }`}
                      />
                      <span
                        className={`font-semibold text-sm transition-colors ${
                          formData.questionMethod === "text"
                            ? "text-green-700"
                            : "text-gray-700 group-hover:text-green-600"
                        }`}
                      >
                        كتابة السؤال
                      </span>
                    </div>
                  </button>

                  {/* Voice Method Option */}
                  <button
                    type="button"
                    onClick={() => handleQuestionMethodChange("voice")}
                    className={`
                      relative flex-1 p-3 rounded-lg border-2 transition-all duration-300 transform hover:scale-102 focus:outline-none group
                      ${
                        formData.questionMethod === "voice"
                          ? "border-green-400 bg-gradient-to-r from-green-50 to-rose-50 shadow-lg scale-102"
                          : "border-gray-200 bg-white hover:border-green-300 hover:shadow-md text-gray-700"
                      }
                    `}
                  >
                    {/* Selection indicator */}
                    {formData.questionMethod === "voice" && (
                      <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                        <CheckCircle size={12} />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex items-center justify-center space-x-2 space-x-reverse">
                      <Mic
                        className={`w-5 h-5 transition-colors ${
                          formData.questionMethod === "voice"
                            ? "text-green-600"
                            : "text-gray-500 group-hover:text-green-500"
                        }`}
                      />
                      <span
                        className={`font-semibold text-sm transition-colors ${
                          formData.questionMethod === "voice"
                            ? "text-green-700"
                            : "text-gray-700 group-hover:text-green-600"
                        }`}
                      >
                        تسجيل صوتي
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Text Question */}
              {formData.questionMethod === "text" && (
                <div className="space-y-3 animate-slide-in">
                  <Textarea
                    id="question"
                    value={formData.questionText}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        questionText: e.target.value,
                      }));
                      setQuestionError(""); // Clear error when user types
                    }}
                    placeholder="اشرح سؤالك بالتفصيل..."
                    className={`text-lg p-4 min-h-[120px] border-2 focus:ring-4 focus:ring-green-200 bg-white ${
                      questionError ? "border-red-500" : ""
                    }`}
                    required
                  />
                  {questionError && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 ml-1" />
                      {questionError}
                    </p>
                  )}
                </div>
              )}

              {/* Voice Recording */}
              {formData.questionMethod === "voice" && (
                <div className="space-y-4 animate-slide-in">
                  
                  {/* Recording Controls */}
                  <div className="flex items-center gap-4 flex-wrap">
                    {!isRecording ? (
                      <Button
                        type="button"
                        onClick={startRecording}
                        className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3"
                        disabled={audioBlob}
                      >
                        <Mic className="w-5 h-5 ml-2" />
                        ابدأ التسجيل
                      </Button>
                    ) : (
                      <div className="flex items-center gap-4">
                        <Button
                          type="button"
                          onClick={stopRecording}
                          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 animate-pulse"
                        >
                          <div className="w-3 h-3 bg-violet-500 rounded-full ml-2 animate-ping"></div>
                          إيقاف التسجيل
                        </Button>
                        <div className="flex items-center gap-2 text-red-600 font-medium">
                          <div className="w-3 h-3 bg-violet-500 rounded-full animate-pulse"></div>
                          <span>{formatDuration(recordingDuration)}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Audio Player */}
                  {audioUrl && (
                    <div className="bg-white border-2 border-green-200 rounded-lg p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <Volume2 className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-green-700">
                              تسجيل صوتي جاهز
                            </h3>
                            <p className="text-sm text-gray-600">
                              المدة: {formatDuration(recordingDuration)}
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          onClick={resetRecording}
                          className="bg-violet-500 hover:bg-violet-600 text-white px-3 py-2"
                        >
                          <RotateCcw className="w-4 h-4 ml-1" />
                          إعادة تسجيل
                        </Button>
                      </div>

                      {/* Audio Controls */}
                      <div className="flex items-center gap-4 mb-4">
                        <Button
                          type="button"
                          onClick={isPlaying ? pauseAudio : playAudio}
                          className={`${
                            isPlaying
                              ? "bg-orange-600 hover:bg-orange-700"
                              : "bg-green-600 hover:bg-green-700"
                          } text-white px-6 py-2 flex items-center gap-2`}
                        >
                          {isPlaying ? (
                            <Pause className="w-5 h-5" />
                          ) : (
                            <Play className="w-5 h-5" />
                          )}
                          {isPlaying ? "إيقاف التشغيل" : "تشغيل التسجيل"}
                        </Button>
                      </div>

                      {/* Hidden Audio Element */}
                      <audio
                        ref={audioRef}
                        src={audioUrl}
                        onEnded={() => setIsPlaying(false)}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        className="hidden"
                      />
                    </div>
                  )}
                  {questionError && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 ml-1" />
                      {questionError}
                    </p>
                  )}
                </div>
              )}

              {/* File Upload */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold flex items-center">
                  <Upload className="w-5 h-5 ml-2 text-purple-600" />
                  ارفع ملف الكود المضغوط (اختياري)
                </Label>

                {/* Custom File Upload Area */}
                <div className="relative">
                  <input
                    id="files"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".zip,.rar,.7z,.tar,.tar.gz,.tar.bz2,.tar.xz,.gz,.bz2,.xz,.lzma,.Z,.cab,.dmg,.iso,.wim,.swm,.esd,.001,.002,.003,.004,.005,.006,.007,.008,.009"
                  />
                  <label
                    htmlFor="files"
                    className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed border-purple-300 rounded-lg cursor-pointer bg-white hover:bg-gray-50 transition-all duration-300 hover:border-purple-400"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <CloudUpload className="w-12 h-12 text-purple-500 mb-4" />
                      <p className="text-lg font-semibold text-purple-700 mb-2">
                        اسحب الملفات المضغوطة هنا أو انقر للاختيار
                      </p>
                      <p className="text-sm text-purple-600">
                        يُسمح فقط بالملفات المضغوطة (.zip, .rar, .7z, .tar.gz, إلخ)
                      </p>
                    </div>
                  </label>
                </div>

                {/* Selected Files Display */}
                {formData.files.length > 0 && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                      <CheckCircle className="w-5 h-5 ml-2" />
                      تم اختيار {formData.files.length} ملف
                    </h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {Array.from(formData.files).map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-white rounded-md p-2 border border-green-200"
                        >
                          <div className="flex items-center">
                            <FileText className="w-4 h-4 text-green-600 ml-2" />
                            <span className="text-sm text-gray-700 truncate max-w-48">
                              {file.name}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {uploadError && (
                  <p className="text-red-500 text-sm mt-2 flex items-center">
                    <AlertCircle className="w-4 h-4 ml-1" />
                    {uploadError}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="space-y-4">
                {/* Upload Progress */}
                {isSubmitting && uploadProgress > 0 && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 animate-spin rounded-full border-2 border-purple-600 border-t-transparent"></div>
                        <span className="font-medium text-gray-700">
                          {uploadProgress < 100 ? (
                            <>
                              جاري الرفع
                              {formData.questionMethod === "voice" &&
                              audioBlob &&
                              formData.files.length > 0
                                ? " (صوت + ملفات)"
                                : formData.questionMethod === "voice" &&
                                  audioBlob
                                ? " (تسجيل صوتي)"
                                : formData.files.length > 0
                                ? ` (${formData.files.length} ملف)`
                                : ""}
                            </>
                          ) : (
                            "تم الرفع بنجاح!"
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        {estimatedTimeLeft > 0 && uploadProgress < 95 && (
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            متبقي: {formatTimeLeft(estimatedTimeLeft)}
                          </span>
                        )}
                        <span className="font-bold text-purple-600">
                          {uploadProgress}%
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>

                    {/* Upload Details */}
                    <div className="text-xs text-gray-500 space-y-1">
                      <div className="flex items-center gap-2 font-medium text-gray-600">
                        <span>يتم رفع:</span>
                        {uploadProgress > 10 &&
                          uploadProgress < 95 &&
                          progressStartTime.current && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded ml-2">
                              {(() => {
                                const elapsed =
                                  (Date.now() - progressStartTime.current) /
                                  1000;
                                const totalSize =
                                  (audioBlob?.size || 0) +
                                  (formData.files?.reduce(
                                    (sum, file) => sum + file.size,
                                    0
                                  ) || 0);
                                const uploadedBytes =
                                  (uploadProgress / 100) * totalSize;
                                const speed = uploadedBytes / elapsed;
                                return speed > 1024 * 1024
                                  ? `${(speed / (1024 * 1024)).toFixed(1)} MB/s`
                                  : `${(speed / 1024).toFixed(0)} KB/s`;
                              })()}
                            </span>
                          )}
                      </div>
                      {formData.questionMethod === "voice" && audioBlob && (
                        <div className="flex items-center gap-2">
                          <Volume2 className="w-4 h-4" />
                          <span>
                            التسجيل الصوتي ({formatDuration(recordingDuration)})
                          </span>
                        </div>
                      )}
                      {formData.files.length > 0 && (
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          <span>
                            {formData.files.length} ملف مرفوع (
                            {(
                              formData.files.reduce(
                                (total, file) => total + file.size,
                                0
                              ) /
                              1024 /
                              1024
                            ).toFixed(1)}{" "}
                            MB)
                          </span>
                        </div>
                      )}
                      {formData.questionMethod === "text" &&
                        formData.questionText && (
                          <div className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" />
                            <span>النص والبيانات الأساسية</span>
                          </div>
                        )}
                      {/* Show total items being uploaded */}
                      <div className="mt-2 pt-1 border-t border-gray-200">
                        <span className="text-xs font-medium text-purple-600">
                          المجموع:{" "}
                          {[
                            formData.questionMethod === "voice" && audioBlob
                              ? "تسجيل صوتي"
                              : null,
                            formData.files.length > 0
                              ? `${formData.files.length} ملف`
                              : null,
                            "البيانات الأساسية",
                          ]
                            .filter(Boolean)
                            .join(" + ")}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white ml-3"></div>
                      {uploadProgress > 0 && uploadProgress < 100 ? (
                        <>
                          جاري الرفع... {uploadProgress}%
                          {formData.questionMethod === "voice" &&
                          audioBlob &&
                          formData.files.length > 0
                            ? " (صوت + ملفات)"
                            : formData.questionMethod === "voice" && audioBlob
                            ? " (تسجيل صوتي)"
                            : formData.files.length > 0
                            ? ` (${formData.files.length} ملف)`
                            : ""}
                        </>
                      ) : uploadProgress === 100 ? (
                        "تم الرفع بنجاح!"
                      ) : (
                        "جاري التحضير..."
                      )}
                    </div>
                  ) : (
                    <>
                      <CheckCircle className="w-6 h-6 ml-3" />
                      إرسال السؤال
                    </>
                  )}
                </Button>
                {submitError && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-500 text-sm flex items-center">
                      <AlertCircle className="w-4 h-4 ml-1" />
                      {submitError}
                    </p>
                  </div>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
