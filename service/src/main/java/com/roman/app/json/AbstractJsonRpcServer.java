package com.roman.app.json;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.googlecode.jsonrpc4j.JsonRpcServer;
import com.roman.app.security.token.AuthToken;

public abstract class AbstractJsonRpcServer extends HttpServlet {
    
    private static final long serialVersionUID = 1L;
    public final static String AUTHORIZATION_HEADER = "Authorization";
    public final static String BEARER_AUTH_SCHEME = "Bearer";
    
    protected final Logger logger = LoggerFactory.getLogger(getClass());
    private static final ThreadLocal<Integer> userId = new ThreadLocal<Integer>();
    private final JsonRpcServer jsonRpcServer;
    private final boolean secured;
    
    protected AbstractJsonRpcServer(Class<?> jsonInterface, boolean secured) {
        jsonRpcServer = new JsonRpcServer(new ObjectMapper(), this, jsonInterface);
        this.secured = secured;
    }
    
    private void performHeaderTokenAuth(HttpServletRequest req) {
        if (secured) {
            String token = getAuthTokenFromHeader(req);
            AuthToken.verifyToken(token);
            userId.set(AuthToken.getUserId(token));
        }
    }
    
    public static Integer getUserId() {
        return userId.get();
    }
    
    private String getAuthTokenFromHeader(HttpServletRequest httpRequest) {
        final String authorizationHeader = httpRequest.getHeader(AUTHORIZATION_HEADER);
        if (authorizationHeader != null) {
            if (authorizationHeader.startsWith(BEARER_AUTH_SCHEME) && authorizationHeader.length() > BEARER_AUTH_SCHEME.length() + 1) {
                final String token = authorizationHeader.substring(BEARER_AUTH_SCHEME.length() + 1);
                logger.info("getAuthTokenFromHeader: got token: '" + token + "'");
                return token;
            }
        }
        logger.debug("getAuthTokenFromHeader: " + AUTHORIZATION_HEADER + " header invalid: '" + authorizationHeader + "'");
        return null;
    }
    
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            userId.remove();
            performHeaderTokenAuth(req);
            jsonRpcServer.handle(req, resp);
        } catch (Exception e) {
            logger.error("doPost: Request failed", e);
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "invalid JSON-RPC request");
        } finally {
            userId.remove();
        }
    }
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            userId.remove();
            performHeaderTokenAuth(req);
            jsonRpcServer.handle(req, resp);
        } catch (Exception e) {
            logger.error("doGet: Request failed", e);
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "invalid JSON-RPC request");
        } finally {
            userId.remove();
        }
    }
    
}
