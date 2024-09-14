package controller

import (
	"github/lewimb/fp_backend/model"
	"github/lewimb/fp_backend/repository"
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserProfileController interface {
	GetUserProfileByID(*gin.Context)
}

type userProfileController struct {
	repo *repository.UserProfileRepo
}

func (up *userProfileController) Create(c *gin.Context) {
	var userProfiles model.UserProfile

	err := c.ShouldBindJSON(&userProfiles)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

}
