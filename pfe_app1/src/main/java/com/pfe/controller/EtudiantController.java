package com.pfe.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.pfe.entity.Email;
import com.pfe.entity.Etudiant;
import com.pfe.entity.PfeValidation;
import com.pfe.entity.Rdv;
import com.pfe.repository.EtudiantRepository;
import com.pfe.repository.PfeValidationRepository;
import com.pfe.repository.RdvRepository;
import com.pfe.repository.SujetRepository;
import com.pfe.service.EmailService;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
public class EtudiantController {
	@Autowired
	private EtudiantRepository etudiantRepo;
	
	@Autowired
	SujetRepository sujetRepository;
	
	@Autowired
	RdvRepository rdvRepository;
	
	@Autowired
	PfeValidationRepository pfeValidationRepository;
	
	@Autowired
	private EmailService emailService;
	
	@PostMapping("/register-etudiant")
	public ResponseEntity<?> register(@RequestBody Etudiant etudiant) {
		boolean formValidation = true;

		if(etudiant.getFiliere().isBlank() || etudiant.getFirstName().isBlank() || etudiant.getSecondName().isBlank())
			formValidation = false;
		if (etudiant.getPassword().length() < 6)
			formValidation = false;
		if (!etudiant.getEmail().endsWith("@etu.uae.ac.ma"))
			formValidation = false;
		
		if(formValidation)
		{
			etudiantRepo.save(etudiant);
			
			String mailSubject = "Bonjour " + etudiant.getSecondName() + " " + etudiant.getFirstName() + "\n\n";
			mailSubject += "Cliquer sur le lien ci-dessous pour confirmer votre compte : \n \n";
			mailSubject += "http://localhost:8092/email-etudiant-confirmation?id=" + etudiant.getId();
			
			Email mail = new Email(etudiant.getEmail(), mailSubject, "Email confirmation - don't reply");
			emailService.sendSimpleMail(mail);
			
			return ResponseEntity.ok(etudiant);
		}
		
		return (ResponseEntity<?>)ResponseEntity.internalServerError();
	}
	
	@PostMapping("/login-etudiant")
	public ResponseEntity<?> login(@RequestBody Etudiant etudiant) {
		Etudiant et = etudiantRepo.findEtudiantByEmail(etudiant.getEmail());
		
		if (et != null && et.getPassword().equals(etudiant.getPassword()))
				return ResponseEntity.ok(et);
		
		return ResponseEntity.ok(et);
	}
	
	@GetMapping("/email-etudiant-confirmation")
	public String EmailConfirmation(@RequestParam Long id) {
		Etudiant et = etudiantRepo.getReferenceById(id);
		
		et.setConfirmed(true);
		etudiantRepo.save(et);
		
		return "redirect:http://localhost:4200/login-etudiant";
	}
	
	@PostMapping("/getAll-etudiant")
	public ResponseEntity<?> getEtudiants(@RequestBody String name){
		List<Etudiant> list = etudiantRepo.findAll();

		for (Iterator<Etudiant> iterator = list.iterator(); iterator.hasNext(); ) {
		    Etudiant et = iterator.next();
		    if ((et.getFirstName() + et.getSecondName()).equals(name.replace("\"", ""))) {
		        iterator.remove();
		    }
		}
		
		return ResponseEntity.ok(list);
	}
	
	@PostMapping("/save-group")
	public ResponseEntity<?> saveGroup(@RequestBody String groupName){		
		String[] etudiantsName = groupName.split("<br>");
		List<Etudiant> list = etudiantRepo.findAll();
		
		for(int i = 0; i < etudiantsName.length; i++) {
			for (int j = 0; j <list.size(); j++) {
				if((list.get(j).getGroupEtudiant() != null) && list.get(j).getGroupEtudiant().contains(etudiantsName[i])) {
					return (ResponseEntity<?>)ResponseEntity.internalServerError();
				}
			}
		}
		
		  for(int i = 0; i < etudiantsName.length; i++) { 
			  for (int j = 0; j <list.size(); j++) { String fullName = list.get(j).getFirstName() + " " +
		  list.get(j).getSecondName(); if(etudiantsName[i].equals(fullName)) {
		  list.get(j).setGroupEtudiant(groupName); etudiantRepo.save(list.get(j)); } }
		  }
		 

		return ResponseEntity.ok("200");
	}
	
	@PostMapping("/espace-etudiant/pfe-confirmed")
	public ResponseEntity<?> getPfeConfirmed(@RequestBody Etudiant et) {
		Etudiant etudiant = etudiantRepo.findEtudiantByFirstNameAndSecondName(et.getFirstName(), et.getSecondName());
		return ResponseEntity.ok(String.valueOf(etudiant.isPfeConfirmed()));
	}
	
	@PostMapping("/espace-etudiant/pfe-confirmed2")
	public ResponseEntity<?> getPfeConfirmed(@RequestBody String fullName) {
		Etudiant etudiant = getEtudiant(fullName);
		return ResponseEntity.ok(String.valueOf(etudiant.isPfeConfirmed()));
	}
	
	@PostMapping("/espace-etudiant/pfe-sujet")
	public ResponseEntity<?> getPfeSujet(@RequestBody Etudiant et) {
		Etudiant etudiant = etudiantRepo.findEtudiantByFirstNameAndSecondName(et.getFirstName(), et.getSecondName());
		return ResponseEntity.ok(String.valueOf(etudiant.getListSujet()));
	}
	
	private Etudiant getEtudiant(String fullName) {		
		for(Etudiant et : etudiantRepo.findAll()) {
			if(fullName.equals(et.getFirstName() + " " + et.getSecondName()))
				return et;
		}
		
		return null;
	}
	
	@GetMapping("/espace-etudiant/view-group/{idSujet}")
	public ResponseEntity<?> viewGroup(@PathVariable long idSujet) {
		ArrayList<String> group = new ArrayList<String>();
		List<Etudiant> list = etudiantRepo.findAll();
		
		for(Etudiant et : list) {
			boolean isGroupFormed = true;
			
			if (et.getGroupEtudiant() != null) {
				if(et.getGroupEtudiant().split("<br>").length == sujetRepository.findById(idSujet).get().getNombreEtudiants()) {
					for(int i = 0; i < et.getGroupEtudiant().split("<br>").length; i++) {
						if(getEtudiant(et.getGroupEtudiant().split("<br>")[i]).getListSujet() != null) {
							ArrayList<String> sujet = new ArrayList<String>(Arrays.asList(getEtudiant(et.getGroupEtudiant().split("<br>")[i]).getListSujet().split("<br>")));
							
							if(sujet.indexOf(String.valueOf(idSujet)) == -1) {
								isGroupFormed = false;
							}
						}
						else
							isGroupFormed = false;
						
					}
					
					if(isGroupFormed && (group.indexOf(et.getGroupEtudiant()) == -1)) {
						group.add(et.getGroupEtudiant());
					}
				}
			}
		}
		
		return ResponseEntity.ok(group);
	}
	
	@PostMapping("/espace-etudiant/list-sujet/google-drive/{fullName}")
	public ResponseEntity<?> setGoogleDrive(@PathVariable String fullName, @RequestBody String googleDriveLien) {
		Etudiant et = getEtudiant(fullName);
		
		for(int i = 0; i < et.getGroupEtudiant().split("<br>").length; i++) {
			Etudiant etudiant = getEtudiant(et.getGroupEtudiant().split("<br>")[i]);
			etudiant.setGoogleDrive(googleDriveLien);
			etudiantRepo.save(etudiant);
		}
		
		return ResponseEntity.ok(et.getGoogleDrive());
	}
	
	@PostMapping("/espace-etudiant/google-drive")
	public ResponseEntity<?> getGoogleDrive(@RequestBody Etudiant et) {
		Etudiant etudiant = etudiantRepo.findEtudiantByFirstNameAndSecondName(et.getFirstName(), et.getSecondName());

		return ResponseEntity.ok(etudiant.getGoogleDrive());
	}
	
	@PostMapping("/espace-etudiant/google-drive2")
	public ResponseEntity<?> getGoogleDrive(@RequestBody String[] fullName) {
		ArrayList<String> googleDrive = new ArrayList<String>();
		
		for (int i = 0 ; i < fullName.length ; i++) {
			String g = fullName[i];
			
			Etudiant et = getEtudiant(g.split("<br>")[0]);
			googleDrive.add(et.getGoogleDrive());
		}

		return ResponseEntity.ok(googleDrive);
	}
	
	@PostMapping("/espace-etudiant/ask-rdv")
	public ResponseEntity<?> askRDV(@RequestBody Etudiant et) {
		Etudiant etudiant = etudiantRepo.findEtudiantByFirstNameAndSecondName(et.getFirstName(), et.getSecondName());
		
		Rdv meet = rdvRepository.findByGroupEtudiant(etudiant.getGroupEtudiant());
		
		if(meet != null) {
			meet.setDateRDV(null);
			meet.setRdvConfirmed(false);
			meet.setDemandRDV(true);
			
			rdvRepository.save(meet);
			return ResponseEntity.ok(meet);
		}
		else {
			Rdv newMeet = new Rdv();
			
			newMeet.setDateRDV(null);
			newMeet.setRdvConfirmed(false);
			newMeet.setGroupEtudiant(etudiant.getGroupEtudiant());
			newMeet.setDemandRDV(true);
			
			rdvRepository.save(newMeet);
			return ResponseEntity.ok(newMeet);
		}
	}
	
	@PostMapping("/espace-encadrant/rdv")
	public ResponseEntity<?> getGroupRDV(@RequestBody String[] fullName) {
		ArrayList<Boolean> rdv = new ArrayList<Boolean>();
		
		for (int i = 0 ; i < fullName.length ; i++) {
			String g = fullName[i];
			
			Rdv meet = rdvRepository.findByGroupEtudiant(g);
			
			if(meet == null) {
				rdv.add(false);
			}
			else {
				if (!meet.isDemandRDV())
					rdv.add(false);
				else
					rdv.add(true);
			}
		}

		return ResponseEntity.ok(rdv);
	}
	
	@PostMapping("/espace-encadrant/validate-rdv/{group}")
	public ResponseEntity<?> validateRDV(@PathVariable String group,@RequestBody String dateRDV) throws ParseException {
		Rdv meet = rdvRepository.findByGroupEtudiant(group);
		meet.setDateRDV(new SimpleDateFormat("yyyy-MM-dd").parse(dateRDV));
		meet.setRdvConfirmed(true);

		rdvRepository.save(meet);
		
		return ResponseEntity.ok("200");
	}
	
	@PostMapping("/espace-encadrant/rdv-confirmed")
	public ResponseEntity<?> confirmedRDV(@RequestBody String[] group) {
		ArrayList<Boolean> confirmedRDV = new ArrayList<Boolean>();

		for(int i = 0 ; i < group.length; i++) {
			Rdv meet = rdvRepository.findByGroupEtudiant(group[i]);
			
			
			if (meet != null) {
				confirmedRDV.add(meet.isRdvConfirmed());
			}
			else {
				confirmedRDV.add(false);
			}
		}
		
		return ResponseEntity.ok(confirmedRDV);
	}
	
	@PostMapping("/espace-encadrant/date-rdv")
	public ResponseEntity<?> getDateRDV(@RequestBody String[] fullName) throws ParseException {
		ArrayList<String> rdv = new ArrayList<String>();
		
		for (int i = 0 ; i < fullName.length ; i++) {
			String g = fullName[i];
			
			Rdv meet = rdvRepository.findByGroupEtudiant(g);
			
			if(meet != null) {
				if (meet.getDateRDV() == null)
					rdv.add(java.time.LocalDate.now().toString());
				else
					rdv.add(java.time.LocalDate.parse(meet.getDateRDV().toString().split(" ")[0]).toString());
			}
		}
		
		return ResponseEntity.ok(rdv);
	}
	
	@PostMapping("/espace-etudiant/rdv-confirmed")
	public ResponseEntity<?> RdvConfirmed(@RequestBody Etudiant et) {
		Etudiant etudiant = etudiantRepo.findEtudiantByFirstNameAndSecondName(et.getFirstName(), et.getSecondName());
		
		Rdv meet = rdvRepository.findByGroupEtudiant(etudiant.getGroupEtudiant());
		
		if(meet != null) {
			return ResponseEntity.ok(meet.isRdvConfirmed());
		}
		else {
			return ResponseEntity.ok(false);
		}
	}
	
	@PostMapping("/espace-etudiant/date-rdv-group")
	public ResponseEntity<?> getDateRdvforGroup(@RequestBody Etudiant et) {
		Etudiant etudiant = etudiantRepo.findEtudiantByFirstNameAndSecondName(et.getFirstName(), et.getSecondName());
		
		Rdv meet = rdvRepository.findByGroupEtudiant(etudiant.getGroupEtudiant());
		
		if(meet != null && meet.getDateRDV() != null) {
			SimpleDateFormat formater = new SimpleDateFormat("EEEE, d MMM yyyy");
			return ResponseEntity.ok(formater.format(meet.getDateRDV()).toString());
		}
		else {
			return ResponseEntity.ok("200");
		}
	}
	
	@PostMapping("/espace-etudiant/end-pfe")
	public ResponseEntity<?> TerminerPfe(@RequestBody String fullName) {
		PfeValidation pfe = new PfeValidation();
		
		pfe.setGroupEtudiant(getEtudiant(fullName).getGroupEtudiant());
		pfe.setFinished(true);
		pfeValidationRepository.save(pfe);
		
		return ResponseEntity.ok(pfe);
	}
	
	@PostMapping("/espace-etudiant/ispfe-end")
	public ResponseEntity<?> GetTerminerPfe(@RequestBody String fullName) {
		PfeValidation pfe = pfeValidationRepository.findByGroupEtudiant(getEtudiant(fullName).getGroupEtudiant());
		
		if(pfe != null)
			return ResponseEntity.ok(pfe.isFinished()); 
		
		return ResponseEntity.ok(false);
	}
	
	@PostMapping("/espace-encadrant/ispfe-end")
	public ResponseEntity<?> GetTerminerPfeforAll(@RequestBody String[] fullName) {
		ArrayList<Boolean> end = new ArrayList<Boolean>();
		
		for (int i = 0 ; i < fullName.length ; i++) {
			String g = fullName[i];
			
			PfeValidation pfe = pfeValidationRepository.findByGroupEtudiant(g);
			
			if(pfe != null) {
				end.add(true);
			}
			else
				end.add(false);
		}
		
		return ResponseEntity.ok(end);
	}
	
	@PostMapping("/espace-encadrant/validate-pfe")
	public ResponseEntity<?> ValidatePFE(@RequestParam("fullName") String fullName, @RequestParam("remarque") String remarque, @RequestParam("note") String note, @RequestParam("date") String date) throws ParseException {
		PfeValidation pfe = pfeValidationRepository.findByGroupEtudiant(fullName);
		
		pfe.setRemarques(remarque);
		pfe.setNote(note);
		pfe.setDateSoutenance(new SimpleDateFormat("yyyy-MM-dd").parse(date));
		pfe.setValidate(true);
		
		pfeValidationRepository.save(pfe);
		
		return ResponseEntity.ok("200");
	}
	
	@PostMapping("/espace-encadrant/get-validate-pfe")
	public ResponseEntity<?> GetValidatePfe(@RequestBody String[] fullName) {
		ArrayList<PfeValidation> pfe = new ArrayList<PfeValidation>();
		
		for (int i = 0 ; i < fullName.length ; i++) {
			String g = fullName[i];
			
			PfeValidation temp = pfeValidationRepository.findByGroupEtudiant(g);
			
			if(temp != null) {
				pfe.add(temp);
			}
			else
			{
				PfeValidation p = new PfeValidation();
				pfe.add(p);
			}
				
		}

		return ResponseEntity.ok(pfe);
	}
	
	@PostMapping("/espace-etudiant/get-validate-pfe-group")
	public ResponseEntity<?> GetValidatePfeforGroup(@RequestBody String fullName) {
		PfeValidation pfe = pfeValidationRepository.findByGroupEtudiant(getEtudiant(fullName).getGroupEtudiant());
		
		return ResponseEntity.ok(pfe);
	}
}
