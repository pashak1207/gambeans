export function generateVerificationCode() : string {
    const randomNumber = Math.floor(Math.random() * 10000);
    const paddedNumber = randomNumber.toString().padStart(4, '0');

    return paddedNumber;
}