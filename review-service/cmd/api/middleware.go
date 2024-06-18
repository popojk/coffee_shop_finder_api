package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"
)

type authResponse struct {
	Message bool `json:"message"`
}

var authServiceDomain = "localhost"

func (app *Config) AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// extract jwt token from header
		token := r.Header.Get("Authorization")
		if token == "" {
			app.errorJSON(w, errors.New("there is no token in header"), http.StatusUnauthorized)
			return
		}

		// call auth service to validate token
		valid, err := validateTokenWithAuthService(token)
		if err != nil || !valid {
			app.errorJSON(w, err, http.StatusUnauthorized)
			return
		}

		// Proceed to the next handler
		next.ServeHTTP(w, r)
	})
}

func validateTokenWithAuthService(token string) (bool, error) {
	// make a request to auth service to validate token
	authDomain := os.Getenv("AUTH_DOMAIN")
	if authDomain != "" {
		authServiceDomain = authDomain
	}
	authServiceURL := fmt.Sprintf("http://%s:8200/api/users/verify", authServiceDomain)

	req, err := http.NewRequest("GET", authServiceURL, nil)
	if err != nil {
		return false, err
	}

	req.Header.Set("Authorization", token)

	fmt.Println(token)
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return false, err
	}
	defer resp.Body.Close()

	fmt.Println(resp.StatusCode)
	if resp.StatusCode != http.StatusOK {
		return false, errors.New("invalid token")
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return false, err
	}

	var authResponse authResponse
	err = json.Unmarshal(body, &authResponse)
	if err != nil {
		return false, err
	}

	return authResponse.Message, nil
}
