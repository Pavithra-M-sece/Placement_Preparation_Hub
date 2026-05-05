package com.placementhub.repository;

import com.placementhub.model.MockTest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MockTestRepository extends JpaRepository<MockTest, Long> {
    List<MockTest> findByCompany(String company);
}
