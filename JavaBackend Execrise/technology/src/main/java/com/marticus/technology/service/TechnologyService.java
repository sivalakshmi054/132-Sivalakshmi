package com.marticus.technology.service;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.marticus.technology.entity.TechnologyEntity;
import com.marticus.technology.repo.TechnologyRepo;


@Service
public class TechnologyService {
	
	@Autowired 
	TechnologyRepo technologyRepo;

	public List<TechnologyEntity> getTechList() {
		return technologyRepo.findAll();
	}

	public TechnologyEntity getById(int id) {
		return technologyRepo.findTechnologyById(id);
	}

	public TechnologyEntity getByName(String name) {
		return technologyRepo.findTechnologyByName(name);
	}

	public TechnologyEntity save(TechnologyEntity technologyEntity) {
		return technologyRepo.save(technologyEntity);
	}

}
