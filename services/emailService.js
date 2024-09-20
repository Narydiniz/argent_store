const nodemailer = require('nodemailer'); 
// Configuração do serviço de e-mail 
const transporter = nodemailer.createTransport({ 
  service: 'gmail', // Use o serviço de e-mail de sua escolha 
  auth: { 
    user: process.env.EMAIL_USER, // Seu e-mail definido nas variáveis de ambiente 
    pass: process.env.EMAIL_PASS  // Sua senha de e-mail definida nas variáveis de ambiente 
  } 
}); 
 
// Função para enviar e-mail 
const sendEmail = (to, subject, text) => { 
  const mailOptions = { 
    from: process.env.EMAIL_USER, 
    to, 
    subject, 
    text 
  }; 
 
  transporter.sendMail(mailOptions, (error, info) => { 
    if (error) { 
      return console.log('Erro ao enviar e-mail:', error); 
    } 
    console.log('E-mail enviado:', info.response); 
  }); 
}; 
 
module.exports = { sendEmail };

//Olhar o codigo