package com.pfe.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.pfe.entity.Rdv;

public interface RdvRepository extends JpaRepository<Rdv, Long>{
	
	Rdv findByGroupEtudiant(String group);
	
}
