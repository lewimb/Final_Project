package controller

import (
	"errors"
	"fmt"
	"github/lewimb/fp_backend/model"
	"github/lewimb/fp_backend/repository"
	"github/lewimb/fp_backend/utils/common"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type UserController interface {
	Login(*gin.Context)
	Register(*gin.Context)
	GetUserProfile(*gin.Context)
	UpdateUserProfile(*gin.Context)
	DeleteUser(*gin.Context)
}

type userController struct {
	repo        *repository.UserRepo
	profileRepo *repository.UserProfileRepo
	jwtService  common.JwtToken
}

func (uc *userController) setCookie(c *gin.Context, key string, val any) {
	value := fmt.Sprintf("%v", val)

	c.SetCookie(
		key,
		value,
		60*60*10000,
		"/",
		"",
		false,
		true,
	)
}

func (uc *userController) Login(c *gin.Context) {
	var login model.User

	err := c.ShouldBindJSON(&login)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	user, err := uc.repo.GetByUsername(login.Username)

	if err != nil {
		statusCode := http.StatusInternalServerError
		if errors.Is(err, gorm.ErrRecordNotFound) {
			statusCode = http.StatusBadRequest
		}
		c.JSON(statusCode, gin.H{"error": err.Error()})
		return
	}

	err = common.ComparePasswordHash(user.Password, login.Password)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userProfile := model.UserProfile{
		UserID: user.ID,
	}

	accessToken, err := uc.jwtService.GenerateToken(*user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	uc.setCookie(
		c,
		"access_token",
		accessToken,
	)

	c.JSON(http.StatusOK, gin.H{
		"message": "Successful Registered",
		"data": gin.H{
			"profile": userProfile,
		},
	})

}

func (uc *userController) Register(c *gin.Context) {
	var newUser model.User

	err := c.ShouldBindJSON(&newUser)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	if newUser.Username == "" || newUser.Password == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Username and Password are required"})
		return
	}

	exist, err := uc.repo.GetByUsername(newUser.Username)

	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if exist != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Username already exists"})
		return
	}

	hashedPassword, err := common.GeneratePasswordHash(newUser.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	newUser.Password = hashedPassword

	uc.repo.Create(&newUser)

	userProfile := model.UserProfile{
		UserID: newUser.ID,
	}

	uc.profileRepo.Create(&userProfile)

	accessToken, err := uc.jwtService.GenerateToken(newUser)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	uc.setCookie(
		c,
		"access_token",
		accessToken,
	)

	c.JSON(http.StatusCreated, gin.H{
		"message": "Successful Registered",
		"data": gin.H{
			"profile": userProfile,
		},
	})
}

func (us *userController) GetUserProfile(c *gin.Context) {

}

func (us *userController) UpdateUserProfile(c *gin.Context) {

}

func (us *userController) DeleteUser(c *gin.Context) {

}

func NewUserController(ur *repository.UserRepo, pr *repository.UserProfileRepo, jwtService common.JwtToken) *userController {
	return &userController{
		repo:        ur,
		profileRepo: pr,
		jwtService:  jwtService,
	}
}
