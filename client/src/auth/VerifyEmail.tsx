import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/useUserStore";
import { Loader2 } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  //   const navigate = useNavigate();
  const {loading, verifyEmail} = useUserStore();
  const handleChange = (idx: number, value: string) => {
    if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[idx] = value;
      setOtp(newOtp);
    }
    // Move to the next input field id a digit is entered
    if (value !== "" && idx < 5) {
      inputRef.current[idx + 1]?.focus();
    }
  };
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      inputRef.current[index - 1]?.focus();
    }
  };
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // API call to verify OTP with the entered code
    // If successful, navigate to the next page
    // if not, display an error message
    const verificationCode: any = otp.join("");
    try {
      await verifyEmail(verificationCode);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="p-8 rounded-md w-full flex flex-col max-w-md gap-10 border border-gray-200">
        <div className="text-center">
          <h1 className="font-extrabold text-2xl">Verify your email</h1>
          <p className="text-sm text-gray-600">
            Enter the 6 digit code send to your email address{" "}
          </p>
        </div>
        <form onSubmit={submitHandler}>
          <div className="flex justify-between">
            {otp.map((letter: string, idx: number) => (
              <Input
                type="text"
                ref={(element) => (inputRef.current[idx] = element)}
                key={idx}
                maxLength={1}
                value={letter}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(idx, e.target.value)
                }
                className="md:w-12 md:h-12 w-8 h-8 text-center text-sm md:text-2xl font-normal md:font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onKeyDown={(e) => handleKeyDown(idx, e)}
              />
            ))}
          </div>
          {loading ? (
            <Button
              disabled
              className="bg-orangre hover:bg-hoverOrange mt-6 w-full "
            >
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              Please wait ...
            </Button>
          ) : (
            <Button className="bg-orangre hover:bg-hoverOrange mt-6 w-full ">
              Verify
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
