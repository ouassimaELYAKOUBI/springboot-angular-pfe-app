package com.pfe.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pfe.entity.Encadrant;

public interface EncadrantRepository extends JpaRepository<Encadrant, Long> {

	boolean findByEmail(String email);
	
	Encadrant findEncadrantByEmail(String email);

}
