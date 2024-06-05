package main

import (
	"errors"
	"net/http"
	"review-service/data"
	"strconv"
)

type jsonResponse struct {
	Error   bool   `json:"error"`
	Message string `json:"message"`
	Data    any    `json:"data,omitempty"`
}

func (app *Config) GetByShopID(w http.ResponseWriter, r *http.Request) {
	// get query params
	queryParams := r.URL.Query()
	shopID := queryParams.Get("shopId")
	pageStr := queryParams.Get("page")
	pageSizeStr := queryParams.Get("pageSize")

	page, err := strconv.Atoi(pageStr)
	if err != nil {
		http.Error(w, "Invalid page parameter", http.StatusBadRequest)
		return
	}

	pageSize, err := strconv.Atoi(pageSizeStr)
	if err != nil {
		http.Error(w, "Invalid page parameter", http.StatusBadRequest)
		return
	}

	// get reviews from db
	reviews, err := app.Models.Review.GetByShopID(shopID, page, pageSize)
	if err != nil {
		app.errorJSON(w, errors.New("failed to get reviews"), http.StatusBadRequest)
		return
	}

	payload := jsonResponse{
		Error:   false,
		Message: "reviews get successfully",
		Data:    reviews,
	}

	app.writeJSON(w, http.StatusAccepted, payload)
}

func (app *Config) Insert(w http.ResponseWriter, r *http.Request) {

	var review data.Review

	err := app.readJSON(w, r, &review)
	if err != nil {
		app.errorJSON(w, errors.New("invalid review data"), http.StatusBadRequest)
		return
	}

	// execute db insert
	ID, err := review.Insert()
	if err != nil {
		app.errorJSON(w, errors.New("db operation failed"), http.StatusInternalServerError)
		return
	}

	// Todo: re-calculate rating in shop-service

	// write response
	review.ID = ID
	payload := jsonResponse{
		Error:   false,
		Message: "review created",
		Data:    review,
	}

	app.writeJSON(w, http.StatusAccepted, payload)
}

func (app *Config) DeleteByID(w http.ResponseWriter, r *http.Request) {
	// get review by id first
	queryParams := r.URL.Query()
	IDStr := queryParams.Get("id")
	ID, err := strconv.Atoi(IDStr)
	if err != nil {
		http.Error(w, "Invalid page parameter", http.StatusBadRequest)
		return
	}
	review, err := app.Models.Review.GetByID(ID)
	if err != nil {
		app.errorJSON(w, errors.New("review not found"), http.StatusBadRequest)
		return
	}

	// execute delete
	err = review.Delete()
	if err != nil {
		app.errorJSON(w, errors.New("review delete failed"), http.StatusBadRequest)
		return
	}

	// make response
	payload := jsonResponse{
		Error:   false,
		Message: "review deleted",
		Data:    nil,
	}

	app.writeJSON(w, http.StatusAccepted, payload)
}
