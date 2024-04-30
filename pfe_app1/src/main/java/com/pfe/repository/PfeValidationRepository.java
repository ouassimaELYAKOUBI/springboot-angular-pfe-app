package com.pfe.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.pfe.entity.PfeValidation;

public interface PfeValidationRepository extends JpaRepository<PfeValidation, Long>{
	
	PfeValidation findByGroupEtudiant(String group);
	
}
