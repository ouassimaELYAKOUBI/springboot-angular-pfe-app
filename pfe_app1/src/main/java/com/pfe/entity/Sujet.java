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
public class Sujet {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long idSujet;
	
	private String nomSujet;
	
	private String description;
	
	private long nombreEtudiants;
	
    private String encadrant;	

}
