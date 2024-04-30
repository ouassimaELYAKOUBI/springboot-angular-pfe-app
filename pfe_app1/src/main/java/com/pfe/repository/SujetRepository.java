package com.pfe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pfe.entity.Sujet;

public interface SujetRepository extends JpaRepository<Sujet, Long>{
	  List<Sujet> findByNomSujetContaining(String nomSujet);

}
