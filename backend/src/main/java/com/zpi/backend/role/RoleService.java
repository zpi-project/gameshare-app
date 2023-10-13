package com.zpi.backend.role;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
//TODO make it only for admin user
@RequiredArgsConstructor
public class RoleService {
    private final RoleRepository roleRepository;

    public Role getRoleByName(String name) {
        return roleRepository.getRoleByName(name);
    }

    public Role addRole(Role role) {
        roleRepository.save(role);
        return role;
    }

}
