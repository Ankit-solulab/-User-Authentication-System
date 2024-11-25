import { User } from "../models/userModel";
import speakeasy from "speakeasy";
import QRCode from "qrcode";

export const generate2FASecret = async (userId: string) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    const secret = speakeasy.generateSecret({ name: 'MYApp'});
    user.otpSecret = secret.base32;
    await user.save();

    const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url);
    return  qrCodeUrl ;

};