package com.example.employee_management.service;

import com.example.employee_management.entity.Employee;
import com.example.employee_management.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    // CREATE
    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // READ ALL
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // READ BY ID
    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    // UPDATE
    public Optional<Employee> updateEmployee(Long id, Employee employee) {

        return employeeRepository.findById(id)
                .map(existingEmployee -> {

                    existingEmployee.setName(employee.getName());
                    existingEmployee.setEmail(employee.getEmail());
                    existingEmployee.setDepartment(employee.getDepartment());
                    existingEmployee.setSalary(employee.getSalary());

                    return employeeRepository.save(existingEmployee);
                });
    }

    // DELETE
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }
}