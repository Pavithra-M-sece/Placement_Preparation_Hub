package com.placementhub.service;

import com.placementhub.model.Company;
import com.placementhub.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CompanyService {

    private final CompanyRepository companyRepository;

    public List<Company> getAll() { return companyRepository.findAll(); }

    public Company getByName(String name) {
        return companyRepository.findByNameIgnoreCase(name)
                .orElseThrow(() -> new RuntimeException("Company not found: " + name));
    }

    public Company save(Company company) { return companyRepository.save(company); }

    public void delete(Long id) { companyRepository.deleteById(id); }
}
