package com.pfe.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pfe.entity.Etudiant;
import com.pfe.entity.Sujet;
import com.pfe.exception.ResourceNotFoundException;
import com.pfe.repository.EtudiantRepository;
import com.pfe.repository.SujetRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class SujetController {
	@Autowired
	SujetRepository sujetRepository;
	
	@Autowired
	EtudiantRepository etudiantRepo;
	
	@GetMapping("/liste-sujets")
	public List<Sujet> getASujets(){
		return sujetRepository.findAll();
	}		
	@GetMapping("/liste-sujetsE")
	public List<Sujet> getAllSujets(){
		return sujetRepository.findAll();
	}		
	
	@PostMapping("/liste-sujetsE")
	public Sujet createSujet(@RequestBody Sujet sujet) {
		return sujetRepository.save(sujet);
	}
	
	@GetMapping("/liste-sujetsE/{idSujet}")
	public ResponseEntity<Sujet> getSujetById(@PathVariable long idSujet) {
		Sujet sujet = sujetRepository.findById(idSujet)
				.orElseThrow(() -> new ResourceNotFoundException("Sujet not exist with id :" + idSujet));
		return ResponseEntity.ok(sujet);
	}
	
	
	@PutMapping("/liste-sujetsE/{idSujet}")
	public ResponseEntity<Sujet> updateEmployee(@PathVariable long idSujet, @RequestBody Sujet sujetDetails){
		Sujet sujet = sujetRepository.findById(idSujet)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + idSujet));
		
		sujet.setNomSujet(sujetDetails.getNomSujet());
		sujet.setDescription(sujetDetails.getDescription());
		sujet.setNombreEtudiants(sujetDetails.getNombreEtudiants());
		
		Sujet updatedSujet = sujetRepository.save(sujet);
		return ResponseEntity.ok(updatedSujet);
	}
	
	@DeleteMapping("/liste-sujetsE/{idSujet}")
	public ResponseEntity<Map<String, Boolean>> deleteSujet(@PathVariable long idSujet){
		Sujet sujet = sujetRepository.findById(idSujet)
				.orElseThrow(() -> new ResourceNotFoundException("Sujet not exist with id :" + idSujet));
		
		sujetRepository.delete(sujet);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	@PostMapping("/postuler/{idSujet}")
	public ResponseEntity<?> postulerSujet(@PathVariable long idSujet, @RequestBody Etudiant et) {
		Etudiant etudiant = etudiantRepo.findEtudiantByFirstNameAndSecondName(et.getFirstName(), et.getSecondName());
		
		if(etudiant.getGroupEtudiant() == null) {
			return (ResponseEntity<?>)ResponseEntity.internalServerError();
		}
		else
		{
			if(etudiant.getGroupEtudiant().split("<br>").length != sujetRepository.findById(idSujet).get().getNombreEtudiants()) {
				return (ResponseEntity<?>)ResponseEntity.internalServerError();
			}
		}
		
		if(etudiant.getListSujet() != null) {
			String[] listSujet = etudiant.getListSujet().split("<br>");
			for (String sujet : listSujet) {
				if(sujet.equals(String.valueOf(idSujet))) {
					return (ResponseEntity<?>)ResponseEntity.internalServerError();
				}
			}
			
			int nbr = 0;
			for (String sujet : listSujet) {
				if(sujetRepository.findById(idSujet).get().getEncadrant().
						equals(sujetRepository.findById(Long.parseLong(sujet)).get().getEncadrant())) {
					nbr = nbr + 1;
				}
			}
			
			if(nbr == 3) {
				return (ResponseEntity<?>)ResponseEntity.internalServerError();
			}
		}
		
		if (etudiant.getListSujet() != null)
			etudiant.setListSujet(etudiant.getListSujet() + "<br>" + String.valueOf(idSujet));
		else
			etudiant.setListSujet(String.valueOf(idSujet));
		
		etudiantRepo.save(etudiant);
		
		return ResponseEntity.ok("200");
	}
	
	private Etudiant getEtudiant(String fullName) {		
		for(Etudiant et : etudiantRepo.findAll()) {
			if(fullName.equals(et.getFirstName() + " " + et.getSecondName()))
				return et;
		}
		
		return null;
	}
	
	@PostMapping("/espace-encadrant/accept-group/{idSujet}")
	public ResponseEntity<?> accepterSujet(@PathVariable long idSujet, @RequestBody String groupEtudiant) {		
		for(int i = 0; i < groupEtudiant.split("<br>").length; i++) {
			Etudiant et = getEtudiant(groupEtudiant.split("<br>")[i]);
			et.setListSujet(String.valueOf(idSujet));
			et.setPfeConfirmed(true);
			
			etudiantRepo.save(et);
		}
		
		return ResponseEntity.ok("200");
	}
}
