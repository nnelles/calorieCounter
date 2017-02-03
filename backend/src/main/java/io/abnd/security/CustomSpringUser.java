package io.abnd.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

/**
 * Custom User to hold the id, since all rest endpoins use id instead of username, we don't want to have to
 * look up id by username for every endpoint
 */
public class CustomSpringUser extends User {

  private long id;

  public CustomSpringUser(final String username, final String password, final Collection<? extends GrantedAuthority> authorities, long id) {
    super(username, password, authorities);
    this.id = id;
  }

  public CustomSpringUser(final String username, final String password, final boolean enabled, final boolean accountNonExpired,
                          final boolean credentialsNonExpired, final boolean accountNonLocked,
                          final Collection<? extends GrantedAuthority> authorities, long id) {
    super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
    this.id = id;
  }

  public long getId() {
    return id;
  }
}