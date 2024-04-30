package com.pfe.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pfe.entity.Etudiant;

public interface EtudiantRepository extends JpaRepository<Etudiant, Long> {

	boolean findByEmail(String email);

	Etudiant findEtudiantByEmail(String email);
	
	Etudiant findEtudiantByFirstNameAndSecondName(String firstName, String secondName);

}
