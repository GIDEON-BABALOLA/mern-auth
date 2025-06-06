import { mailtrapClient, sender } from "./mailtrapConfig.js"
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"
import { MailtrapClient } from "mailtrap"
export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{email}]
    try{
const response = await mailtrapClient.send({
    from: sender,
    to: recipient,
    subject:"Verify your email",
    html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
    category: "Email Verification"
})
console.log("Email sent successfully", response)
    }catch(error){
console.log(`Error sending verification`, error);
throw new Error(`Error sending verification email: ${error}`)
    }
}
export const sendWelcomeEmail =async (email, name) => {
        const recipient = [{email}]
    try{
const response = await mailtrapClient.send({
    from: sender,
    to: recipient,
    template_uuid: "d8b99774-36f3-47a4-b4ec-22513d5676fa",
    template_variables: {
      "name": name
    }

})
console.log("Welcome Email sent successfully", response)
    }catch(error){
console.log(`Error sending welcome email`, error);
throw new Error(`Error sending welcome email: ${error}`)
    }
}
export const sendPasswordResetEmail = async (email, resetURL) => {
        console.log(email)
    const recipient = [{email}]
    try{
const response = await mailtrapClient.send({
    from: sender,
    to: recipient,
    subject: "Reset your password",
    html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
    category: "Password Reset"
}
)
console.log("Password reset email sent successfully", response)
    }catch(error){
        console.error(`Error sending password reset email`, error)
        throw new Error(`Error sending password reset email: ${error}`)

    }
}
export const sendResetSuccessEmail = async (email) => {
    console.log(email)
    const recipient = [{email}];
    try{
const response = await mailtrapClient.send({
    from : sender,
    to: recipient,
    subject: "Password Reset Successful",
    html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    category: "Password Reset"
});
console.log("Password reset  success email sent successfully", response)
    }catch(error){
console.error(`Error sending password reset success email`, error)
throw new Error(`Error sending password reset success email: ${error}`)
    }
}