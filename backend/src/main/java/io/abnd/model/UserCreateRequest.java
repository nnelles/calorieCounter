package io.abnd.model;

import java.util.Optional;

public class UserCreateRequest {

  private String username;
  private String password;
  private Optional<Integer> desiredCalories;
  private String email;

  public String getUsername() {
    return username;
  }

  public void setUsername(final String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(final String password) {
    this.password = password;
  }

  public Optional<Integer> getDesiredCalories() {
    return desiredCalories;
  }

  public void setDesiredCalories(final Optional<Integer> desiredCalories) {
    this.desiredCalories = desiredCalories;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(final String email) {
    this.email = email;
  }
}
