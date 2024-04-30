package com.pfe.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.pfe.entity.Email;

@Service
public class EmailService {

	@Autowired private JavaMailSender javaMailSender;
	 
    @Value("${spring.mail.username}") private String sender;

    public String sendSimpleMail(Email mail)
    {
 
        // Try block to check for exceptions
        try {
 
            // Creating a simple mail message
            SimpleMailMessage mailMessage = new SimpleMailMessage();
 
            // Setting up necessary details
            mailMessage.setFrom("Faculté des Sciences-Tetouan <wassima.sweetlife@gmail.com>");
            mailMessage.setTo(mail.getRecipient());
            mailMessage.setText(mail.getMsgBody());
            mailMessage.setSubject(mail.getSubject());
 
            // Sending the mail
            javaMailSender.send(mailMessage);
            
            return "Mail Sent Successfully...";
        }
 
        // Catch block to handle the exceptions
        catch (Exception e) {
            return e.getMessage();
        }
    }
    
}
