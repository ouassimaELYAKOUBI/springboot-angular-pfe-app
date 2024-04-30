package com.pfe.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data @AllArgsConstructor @NoArgsConstructor
public class Etudiant {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private String firstName;
	
	private String secondName;
	
	private String filiere;
	
	private String email;
	
	private String password;
	
	private String apogee;
	
	private boolean isConfirmed;
	
	private String groupEtudiant;
	
	private String listSujet;
	
	private boolean pfeConfirmed;
	
	private String googleDrive;
}
