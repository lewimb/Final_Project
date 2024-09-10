package main

import (
	"github/lewimb/fp_backend/controller"

	"github.com/gin-gonic/gin"
)

func registerRoutes(r *gin.Engine, uc controller.UserController) {
	r.POST("/users/login", uc.Login)
	r.POST("/users/register", uc.Register)
	r.GET("/users/:id/profile", uc.GetUserProfile)
	r.PUT("/users/:id/profile", uc.UpdateUserProfile)
	r.DELETE("/users/:id", uc.DeleteUser)
}
