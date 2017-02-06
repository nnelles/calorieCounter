package io.abnd.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.abnd.model.UserResponse;
import io.abnd.service.intf.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

  final String AUTH_TOKEN_HEADER = "x-auth-token";

  @Autowired
  private ObjectMapper jacksonObjectMapper;
  @Autowired
  private UserService userService;



  private RequestCache requestCache = new HttpSessionRequestCache();

  @Override
  public void onAuthenticationSuccess(
  HttpServletRequest request,
  HttpServletResponse response,
  Authentication authentication)
  throws ServletException, IOException

  {

    SavedRequest savedRequest = requestCache.getRequest(request, response);

    //Add user info to response
    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
    CustomSpringUser user = ((CustomSpringUser) authentication.getPrincipal());
    Set<String> roles = user.getAuthorities().stream().map(auth -> auth.getAuthority()).collect(Collectors.toSet());
    UserResponse ur = new UserResponse(user.getId(), user.getUsername(), user.getDesiredCalories(), roles);
    response.getWriter().write(jacksonObjectMapper.writeValueAsString(ur));

    if (savedRequest == null) {
      clearAuthenticationAttributes(request);
      return;
    }
    String targetUrlParam = getTargetUrlParameter();
    if (isAlwaysUseDefaultTargetUrl()
    || (targetUrlParam != null
    && StringUtils.hasText(request.getParameter(targetUrlParam)))) {
      requestCache.removeRequest(request, response);
      clearAuthenticationAttributes(request);
      return;
    }

    clearAuthenticationAttributes(request);
  }

  public void setRequestCache(RequestCache requestCache) {
    this.requestCache = requestCache;
  }
}