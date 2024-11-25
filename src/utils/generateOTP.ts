import otpGenrater  from "otp-generator";

export const generateOTP = () => {
    return otpGenrater.generate(6, { digits: true, alphabets: false, specialChars: false });
};
