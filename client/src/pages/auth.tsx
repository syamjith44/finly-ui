import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { HolographicInput } from "@/components/ui/holographic-input";
import { HolographicButton } from "@/components/ui/holographic-button";
import { useAuth } from "@/hooks/use-auth";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { PaperPlaneIcon, CheckIcon, ArrowLeftIcon } from "@radix-ui/react-icons";
import { Smartphone } from "lucide-react";

export default function AuthPage() {
  const [step, setStep] = useState<"login" | "otp">("login");
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [userId, setUserId] = useState<number | null>(null);
  
  const { login } = useAuth();
  const { toast } = useToast();

  const sendOTPMutation = useMutation({
    mutationFn: api.auth.sendOTP,
    onSuccess: (data) => {
      setUserId(data.userId);
      setStep("otp");
      toast({
        title: "OTP Sent",
        description: data.message,
      });
      // For development, auto-fill OTP
      if (data.otp) {
        setOtp(data.otp.split(""));
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive",
      });
    },
  });

  const verifyOTPMutation = useMutation({
    mutationFn: api.auth.verifyOTP,
    onSuccess: (data) => {
      if (data.success && userId) {
        login(userId);
        toast({
          title: "Welcome!",
          description: "Successfully logged in to FinanceAI",
        });
      }
    },
    onError: () => {
      toast({
        title: "Invalid OTP",
        description: "Please check your code and try again.",
        variant: "destructive",
      });
    },
  });

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (contact.trim()) {
      sendOTPMutation.mutate({ contact: contact.trim() });
    }
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length === 6 && userId) {
      verifyOTPMutation.mutate({ userId, otp: otpCode });
    }
  };

  const handleOTPChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.querySelector(`input[data-index="${index + 1}"]`) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.querySelector(`input[data-index="${index - 1}"]`) as HTMLInputElement;
      prevInput?.focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="holographic-border p-8 glow-effect">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg glow-effect mx-auto mb-4 flex items-center justify-center">
              <div className="text-white text-2xl font-bold">F</div>
            </div>
            <h1 className="text-3xl font-bold neon-glow mb-2">Welcome to FinanceAI</h1>
            <p className="text-gray-300">Your intelligent financial companion</p>
          </div>

          {step === "login" && (
            <form onSubmit={handleSendOTP}>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-cyan-400">
                  Email or Phone
                </label>
                <HolographicInput
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Enter email or phone number"
                  required
                />
              </div>
              
              <HolographicButton
                type="submit"
                className="w-full mb-4"
                disabled={sendOTPMutation.isPending}
              >
                <PaperPlaneIcon className="w-4 h-4 mr-2" />
                {sendOTPMutation.isPending ? "Sending..." : "Send OTP"}
              </HolographicButton>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-900 text-gray-400">or</span>
                </div>
              </div>

              <HolographicButton
                type="button"
                variant="outline"
                className="w-full"
                disabled
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
                <span className="text-xs block text-gray-500">(Coming Soon)</span>
              </HolographicButton>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={handleVerifyOTP}>
              <div className="text-center mb-6">
                <Smartphone className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Verify OTP</h3>
                <p className="text-gray-300 text-sm">Enter the 6-digit code sent to your device</p>
              </div>
              
              <div className="flex justify-center space-x-2 mb-6">
                {otp.map((digit, index) => (
                  <HolographicInput
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOTPChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    data-index={index}
                    className="w-12 h-12 text-center text-xl font-bold"
                  />
                ))}
              </div>
              
              <HolographicButton
                type="submit"
                className="w-full mb-4"
                disabled={verifyOTPMutation.isPending || otp.join("").length !== 6}
              >
                <CheckIcon className="w-4 h-4 mr-2" />
                {verifyOTPMutation.isPending ? "Verifying..." : "Verify & Continue"}
              </HolographicButton>
              
              <button
                type="button"
                onClick={() => setStep("login")}
                className="w-full text-blue-400 hover:text-cyan-400 transition-colors text-sm flex items-center justify-center"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Back to login
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
