package com.zpi.backend.user_opinion;

import com.zpi.backend.user.User;
import lombok.Data;

@Data
public class UserOpinionDTO {
    private String uuid;
    private String firstName;
    private String lastName;
    private String avatarLink;

    public UserOpinionDTO(User user) {
        this.uuid = user.getUuid();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.avatarLink = user.getAvatarLink();
    }
}

