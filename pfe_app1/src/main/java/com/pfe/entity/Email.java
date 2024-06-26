package com.pfe.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class Email {
	
	private String recipient;
    private String msgBody;
    private String subject;
    
}
