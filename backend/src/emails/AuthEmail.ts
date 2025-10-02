import { transporter } from "../config/nodemailer"

type EmailType = {
    name: string
    email: string
    token: string
}

export class AuthEmail {
    static sendConfirmationEmail = async (user:EmailType) => {
        const email = await transporter.sendMail({
            from: 'SpendWise <spendwise@demomailtrap.co>',
            to: user.email,
            subject: "Confirma tu cuenta en SpendWise",
            html: `
                <p>Hola ${user.name}, gracias por registrarte en SpendWise. Por favor, confirma tu cuenta haciendo click en el siguiente enlace:</p>
                <a href="#">Confirmar Cuenta</a>
                <p>Ingresando este código ${user.token}</p>`,
        })
        console.log (`Mensaje enviado: ${email.messageId}`)
    }
}