package com.placementhub.controller;

import com.placementhub.model.Company;
import com.placementhub.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;

    @GetMapping
    public ResponseEntity<List<Company>> getAll() {
        return ResponseEntity.ok(companyService.getAll());
    }

    @GetMapping("/{name}")
    public ResponseEntity<Company> getByName(@PathVariable String name) {
        return ResponseEntity.ok(companyService.getByName(name));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Company> create(@RequestBody Company company) {
        return ResponseEntity.ok(companyService.save(company));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Company> update(@PathVariable Long id, @RequestBody Company company) {
        company.setId(id);
        return ResponseEntity.ok(companyService.save(company));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        companyService.delete(id);
        return ResponseEntity.ok().build();
    }
}
