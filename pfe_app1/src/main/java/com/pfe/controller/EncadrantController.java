package com.pfe.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.pfe.entity.Email;
import com.pfe.entity.Encadrant;
import com.pfe.repository.EncadrantRepository;
import com.pfe.service.EmailService;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
public class EncadrantController {

	@Autowired
	private EncadrantRepository encadrantRepo;
	
	@Autowired
	private EmailService emailService;
	
	@PostMapping("/register-encadrant")
	public ResponseEntity<?> register(@RequestBody Encadrant encadrant) {
		boolean formValidation = true;
		
		if(encadrant.getDepartement().isBlank() || encadrant.getFirstName().isBlank() || encadrant.getSecondName().isBlank())
			formValidation = false;
		if (encadrant.getPassword().length() < 6)
			formValidation = false;
		if (!encadrant.getEmail().endsWith("@uae.ac.ma"))
			formValidation = false;
		
		if(formValidation)
		{
			encadrantRepo.save(encadrant);
			
			String mailSubject = "Bonjour " + encadrant.getSecondName() + " " + encadrant.getFirstName() + "\n\n";
			mailSubject += "Cliquer sur le lien ci-dessous pour confirmer votre compte : \n \n";
			mailSubject += "http://localhost:8092/email-encadrant-confirmation?id=" + encadrant.getId();
			
			Email mail = new Email("wassima.sweetlife@gmail.com", mailSubject, "Email confirmation - don't reply");
			emailService.sendSimpleMail(mail);
			
			return ResponseEntity.ok(encadrant);
		}
		
		return (ResponseEntity<?>)ResponseEntity.internalServerError();
	}
	
	@PostMapping("/login-encadrant")
	public ResponseEntity<?> login(@RequestBody Encadrant encadrant) {
		Encadrant ec = encadrantRepo.findEncadrantByEmail(encadrant.getEmail());
		
		if (ec != null && ec.getPassword().equals(encadrant.getPassword()))
				return ResponseEntity.ok(ec);
		
		return (ResponseEntity<?>)ResponseEntity.internalServerError();
	}
	
	@GetMapping("/email-encadrant-confirmation")
	public String EmailConfirmation(@RequestParam Long id) {
		Encadrant ec = encadrantRepo.getReferenceById(id);
		
		ec.setConfirmed(true);
		encadrantRepo.save(ec);
		
		return "redirect:http://localhost:4200/encadrant-deconnect";
	}
}
