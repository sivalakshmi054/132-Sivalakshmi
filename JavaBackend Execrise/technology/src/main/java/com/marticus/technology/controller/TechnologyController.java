package com.marticus.technology.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marticus.technology.entity.TechnologyEntity;
import com.marticus.technology.service.TechnologyService;

import java.util.List;


@RestController
@RequestMapping("/tech")
public class TechnologyController {

	@Autowired
	TechnologyService technologyService;
	
	@GetMapping("/")
	public ResponseEntity<List<TechnologyEntity>> getAll()
	{
		 List<TechnologyEntity> techList = technologyService.getTechList();
		 return ResponseEntity.ok(techList);
		
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<TechnologyEntity> getById(@PathVariable("id") int id)
	{
		TechnologyEntity tech= technologyService.getById(id);
		return ResponseEntity.ok(tech);
	}
	
	@GetMapping("/name/{name}")
	public ResponseEntity<TechnologyEntity> getById(@PathVariable("name") String name)
	{
		TechnologyEntity tech= technologyService.getByName(name);
		return ResponseEntity.ok(tech);
	}
	
	@PostMapping("/create")
	public ResponseEntity<TechnologyEntity> createTech(@RequestBody TechnologyEntity technologyEntity)
	{
		TechnologyEntity tech = technologyService.save(technologyEntity);
		return ResponseEntity.ok(tech);
	}
	
	
}
